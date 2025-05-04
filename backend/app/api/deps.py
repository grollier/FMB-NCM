import jwt

from collections.abc import AsyncGenerator
from typing import Annotated

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jwt.exceptions import InvalidTokenError
from pydantic import ValidationError
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId

from app.core.config import settings
from app.core import security
from app.core.db import get_mongo_client
from app.schemes import TokenPayload, User, UserPublic

reausable_oauth2 = OAuth2PasswordBearer(
    tokenUrl=f"{settings.API_V1_STR}/login/access-token"
)

async def get_db() -> AsyncGenerator[AsyncIOMotorClient, None]:
    client = get_mongo_client()
    try:
        yield client[settings.MONGO_DB]
    finally:
        pass

async def get_current_user(token: str = Depends(reausable_oauth2)) -> User:
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[security.ALGORITHM]
        )
        token_data = TokenPayload(**payload)
    except (InvalidTokenError, ValidationError) as e:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
        )
    
    user = await User.find_one({"_id": ObjectId(token_data.sub)})
    if not user:
        raise HTTPException(status_code=404, detail="User Not Found")
    if not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive User")
    return UserPublic(**user.model_dump())

async def get_current_active_superuser(current_user: User = Depends(get_current_user)) -> User:
    if not current_user.is_superuser:
        raise HTTPException(
            status_code=403, detail="The user doesn't have enough privileges"
        )
    return current_user

async def get_current_user_by_id(current_user: User = Depends(get_current_user)) -> User:
    try:
        user = await User.find_one({"_id": ObjectId(current_user.id)})
        if not user:
            raise HTTPException(status_code=404, detail=f"{status.HTTP_404_NOT_FOUND}")
        return user
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"{status.HTTP_500_INTERNAL_SERVER_ERROR}: {str(e)}"
        )
    
DBDep = Annotated[AsyncIOMotorClient, Depends(get_db)]
TokenDep = Annotated[str, Depends(reausable_oauth2)]
CurrentUser = Annotated[User, Depends(get_current_user)]
currenSuperUser = Annotated[User, Depends(get_current_active_superuser)]


