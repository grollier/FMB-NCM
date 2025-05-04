from datetime import timedelta
import logging
from typing import Annotated, Any

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.security import OAuth2PasswordRequestForm

from app import crud
from app.api.deps import CurrentUser
from app.core import security
from app.core.config import settings
from app.schemes import Token, UserPublic

logger = logging.getLogger(__name__)

router = APIRouter(tags=["login"])

@router.post("/login/access-token")
async def login_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()]
) -> Token:
    """
    OAuth2 compatible token login, get an access token for future requests.
    """
    logger.info(f"loging attempt for email: {form_data.username}")
    user = await crud.authenticate(email=form_data.username, password=form_data.password)
    if not user:
        logger.warning(f"logging failed for email: {form_data.username}")
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    elif not user.is_active:
        logger.warning(f"Inactive user: {form_data.username}")
        raise HTTPException(status_code=400, detail="Inactive user")
    logger.info(f"Loging successful for email: {form_data.username}")
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return Token(
        access_token=security.create_access_token(
            str(user.id), expires_delta=access_token_expires
        )
    )

@router.post("/login/test-token", response_model=UserPublic)
async def test_token(current_user: CurrentUser) -> Any:
    """
    Test access token.
    """
    return current_user