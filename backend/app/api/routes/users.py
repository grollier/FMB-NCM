# users.py
from typing import Any
import logging

from fastapi import APIRouter, Depends, HTTPException

from app import crud
from app.api.deps import (
    CurrentUser,
    get_current_active_superuser,
)
from app.core.config import settings
from app.core.security import get_password_hash, verify_password
from app.schemes import (
    Post,
    Message,
    UpdatePassword,
    User,
    UserCreate,
    UserPublic,
    UserRegister,
    UsersPublic,
    UserUpdate,
    UserUpdateMe,
    PyObjectId,
)
from app.utils import generate_new_account_email, send_email

router = APIRouter(prefix="/users", tags=["users"])
logger = logging.getLogger(__name__)


@router.get(
    "/",
    dependencies=[Depends(get_current_active_superuser)],
)
async def read_users(skip: int = 0, limit: int = 100) -> Any:
    """
    Retrieve users.
    """
    users = await User.find().skip(skip).limit(limit).to_list()
    total_count = await User.find().count()

    users_public = [UserPublic(**user.model_dump()) for user in users]

    return UsersPublic(data=users_public, total_count=total_count)


@router.post(
    "/", dependencies=[Depends(get_current_active_superuser)], response_model=UserPublic
)
async def create_user(*, user_in: UserCreate) -> Any:
    """
    Create a new user.
    """
    user = await crud.get_user_by_email(email=user_in.email)
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this email already exists in the system",
        )

    user = await crud.create_user(user_create=user_in)
    if settings.emails_enabled and user_in.email:
        email_data = generate_new_account_email(
            email_to=user_in.email, username=user_in.email, password=user_in.password
        )
        send_email(
            email_to=user_in.email,
            subject=email_data.subject,
            html_content=email_data.html_content,
        )
    return user


@router.patch("/me", response_model=UserPublic)
async def update_user_me(*, user_in: UserUpdateMe, current_user: CurrentUser) -> Any:
    """
    Update own user.
    """
    if user_in.email:
        existing_user = await crud.get_user_by_email(email=user_in.email)
        if existing_user and existing_user.id != current_user.id:
            raise HTTPException(
                status_code=409, detail="User with this email already exists"
            )
    user_data = user_in.model_dump(exclude_unset=True)
    await current_user.set(user_data)
    return current_user


@router.patch("/me/password", response_model=Message)
async def update_password_me(*, body: UpdatePassword, current_user: CurrentUser) -> Any:
    """
    Update own password.
    """
    if not verify_password(body.current_password, current_user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect password")
    if body.current_password == body.new_password:
        raise HTTPException(
            status_code=400, detail="New password cannot be the same as the current one"
        )
    hashed_password = get_password_hash(body.new_password)
    await current_user.set({"hashed_password": hashed_password})
    return Message(message="Password updated successfully")


@router.get("/me", response_model=UserPublic)
async def read_user_me(current_user: CurrentUser) -> Any:
    """
    Get current user.
    """
    return current_user


@router.delete("/me", response_model=Message)
async def delete_user_me(current_user: CurrentUser) -> Any:
    """
    Delete own user.
    """
    if current_user.is_superuser:
        raise HTTPException(
            status_code=403, detail="Super users are not allowed to delete themselves"
        )
    await current_user.delete()
    return Message(message="User deleted successfully")


@router.post("/signup", response_model=UserPublic)
async def register_user(user_in: UserRegister) -> Any:
    """
    Create new user without the need to be logged in.
    """
    logger.info(f"Registering user with email: {user_in.email}")
    user = await crud.get_user_by_email(email=user_in.email)
    if user:
        logger.warning(f"User with email {user_in.email} already exists")
        raise HTTPException(
            status_code=400,
            detail="THe user with this email already exists in the system",
        )
    user_create = UserCreate.model_validate(user_in.model_dump())
    logger.info(f"Creating user: {user_create}")
    user = await crud.create_user(user_create=user_create)
    return user


@router.get("/{user_id}", response_model=UserPublic)
async def read_user_by_id(user_id: PyObjectId, current_user: CurrentUser) -> Any:
    """
    Get a specific user by id.
    """
    user = await User.get(user_id)
    if user == current_user:
        return user
    if not current_user.is_superuser:
        raise HTTPException(
            status_code=403, detail="The user doesn't have enough privileges"
        )
    return user


@router.patch(
    "/{user_id}",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=UserPublic,
)
async def update_user(*, user_id: PyObjectId, user_in: UserUpdate) -> Any:
    """
    Update a user.
    """
    db_user = await User.get(user_id)
    if not db_user:
        raise HTTPException(
            status_code=404,
            detail="The user with this id does not exist in the system",
        )
    if user_in.email:
        existing_user = await crud.get_user_by_email(email=user_in.email)
        if existing_user and existing_user.id != user_id:
            raise HTTPException(
                status_code=409, detail="User with this email already exists"
            )

    db_user = await crud.update_user(db_user=db_user, user_in=user_in)
    return db_user


@router.delete("/{user_id}", dependencies=[Depends(get_current_active_superuser)])
async def delete_user(currrent_user: CurrentUser, user_id: PyObjectId) -> Message:
    """
    Delete a user.
    """
    user = await User.get(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if user == currrent_user:
        raise HTTPException(
            status_code=403, detail="Super users are not allowed to delete themselves"
        )
    await Post.find(Post.owner == user_id).delete()
    await user.delete()
    return Message(message="User deleted successfully")
