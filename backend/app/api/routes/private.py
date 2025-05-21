from typing import Any

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.core.security import get_password_hash
from app.schemes import User, UserPublic

router = APIRouter(tags=["private"], prefix="/private")


class PrivateUserCreate(BaseModel):
    email: str
    password: str
    username: str
    is_verified: bool = False


@router.post("/users/", response_model=UserPublic)
async def create_user(user_in: PrivateUserCreate) -> Any:
    """
    Create a new user.
    """
    existing_user = await User.find_one(User.email == user_in.email)
    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="The User with this email already exists in the system.",
        )

    user = User(
        email=user_in.email,
        username=user_in.username,
        hashed_password=get_password_hash(user_in.password),
        is_verified=user_in.is_verified,
    )

    await user.insert()

    return user
