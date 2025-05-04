# crud.py
from typing import Any, Optional, Dict, List
from pydantic import ValidationError
from bson import ObjectId

from app.core.config import settings
from app.core.security import get_password_hash, verify_password
from app.schemes import Post, PostCreate, User, UserCreate, UserUpdate, PyObjectId

async def create_first_superuser():
    """
    This method will create the first super user if it doesn't already exist
    """
    existing_superuser = await User.find_one(User.is_superuser == True)
    if existing_superuser:
        print("It seems there is already a superuser. skipping creation.")
        return
    
    superuser_data = UserCreate(
        email=settings.FIRST_SUPERUSER,
        password=settings.FIRST_SUPERUSER_PASSWORD,
        is_superuser=True,
        is_active=True,
        username="" # set the username for the first superuser. you can also do it from the settings.
    )

    superuser = suepruser_data.to_user()

    try:
        validated_user = User.model_validate(superuser)
        await validated_user.insert()
    except ValidationError as e:
        print(f"Validation error: {e}")
        raise

async def create_user(*, user_create: UserCreate) -> User:
    """Create a new user in the database."""
    hashed_password = get_password_hash(user_create.password)
    db_user = User(
        id=ObjectId(),
        email=user_create.email,
        hashed_password=hashed_password,
        is_active=user_create.is_active,
        is_superuser=user_create.is_superuser,
        username=user_create.username,        
    )
    await db_user.insert() # insert the user into the database
    return db_user

async def update_user(*, db_user: User, user_in: UserUpdate) -> User:
    """Update an existing user in the database."""
    user_data = user_in.model_dump(exclude_unset=True)
    if "password" in user_data:
        hashed_password = get_password_hash(user_data["password"])
        user_data["hashed_password"] = hashed_password
    await db_user.set(user_data) # update the user document
    return db_user

async def get_user_by_email(*, email: str) -> Optional[User]:
    """Get a user by email from the database."""
    return await User.find_one(User.email == email)

async def get_user_by_username(*, username: str) -> Optional[User]:
    """Get a user by username from the database."""
    return await User.find_one(User.username == username)

async def get_user_by_role(*, username: str, role: bool) -> Optional[User]:
    """Get a user by role, that is if is superuser or not"""
    return await User.find_one(User.username == username, User.is_superuser == role)

async def authenticate(*, email: str, password: str) -> Optional[User]:
    """Authenticate a user by email and password."""
    db_user = await get_user_by_email(email=email)
    if not db_user:
        return None
    if not verify_password(password, db_user.hashed_password):
        return None
    return db_user

async def create_post(*, post_in: PostCreate, owner_id: PyObjectId) -> Post:
    """Create a new item in the database."""
    db_post = Post(
        title=post_in.title,
        body=post_in.body,
        owner=owner_id, # Link to the owner using ObjectId
    )
    await db_post.insert()
    return db_post