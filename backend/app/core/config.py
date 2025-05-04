import logging
import secrets
import warnings
from typing import Annotated, Any, Literal

logger = logging.getLogger(__name__)

from pydantic import (
    AnyUrl,
    BeforeValidator,
    HttpUrl,
    MongoDsn,
    computed_field,
    model_validator,
    EmailStr,
)
from pydantic_core import MultiHostUrl
from pydantic_settings import BaseSettings, SettingsConfigDict
from typing_extensions import Self

def parse_cors(v: Any) -> list[AnyUrl] | str:
    if isinstance(v, str) and not v.startswith("["):
        return [i.strip() for i in v.split(",")]
    elif isinstance(v, list | str):
        return v
    raise ValueError(v)

class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file="../.env",
        env_ignore_empty=True,
        extra="ignore"
    )
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = secrets.token_urlsafe(32)
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8
    FRONTEND_HOST: str = "http://localhost:3000"
    ENVIRONMENT: Literal["local", "staging", "production"] = "local"

    BACKEND_CORS_ORIGINS: Annotated[
        list[AnyUrl] | str, BeforeValidator(parse_cors)
    ] = []

    @computed_field
    @property
    def all_cors_origins(self) -> list[str]:
        return [str(origin).rstrip("/") for origin in self.BACKEND_CORS_ORIGINS] + [
            self.FRONTEND_HOST
        ]
    
    PROJECT_NAME: str
    MONGO_HOST: str
    MONGO_PORT: int = 27017
    MONGO_DB: str
    MONGO_USER: str
    MONGO_PASSWORD: str

    @computed_field
    @property
    def MONGODB_DATABASE_URI(self) -> MongoDsn:
        if self.ENVIRONMENT == "local":
            return f"mongodb+srv://{self.MONGO_USER}:{self.MONGO_PASSWORD}@{self.MONGO_HOST}/{self.MONGO_DB}?retryWrites=true&w=majority&appName=FoxCluster"
        
    
    SMTP_TLS: bool = False
    SMTP_SSL: bool = False
    SMTP_PORT: int = 1025
    SMTP_HOST: str = "localhost"
    SMTP_USER: str | None = None
    SMTP_PASSWORD: str | None = None
    EMAILS_FROM_EMAIL: EmailStr = "noreply@example.com" # set your email sender address
    EMAILS_FROM_NAME: str | None = None

    @model_validator(mode="after")
    def _set_default_emails_from(self) -> Self:
        if not self.EMAILS_FROM_NAME:
            self.EMAILS_FROM_NAME = self.PROJECT_NAME
        return self
    
    EMAIL_RESET_TOKEN_EXPIRE_HOURS: int = 48

    @computed_field # type: ignore[prop-decorator]
    @property
    def emails_enabled(self) -> bool:
        return bool(self.SMTP_HOST and self.EMAILS_FROM_EMAIL)
    
    EMAIL_TEST_USER: EmailStr = "test@example.com"

    FIRST_SUPERUSER: str
    FIRST_SUPERUSER_PASSWORD: str

    def _check_default_secret(self, var_name: str, value: str | None) -> None:
        if value == "changethis":
            message = (
                f'The value of {var_name} is "changethis",'
                "for security, please change it, at least for deployment"
            )
            if self.ENVIRONMENT == "local":
                warnings.warn(message, stacklevel=1)
            else:
                raise ValueError(message)
            
    @model_validator(mode="after")
    def _enforce_non_default_secrets(self) -> Self:
        self._check_default_secret("SECRET_KEY", self.SECRET_KEY)
        self._check_default_secret("MONGO_PASSWORD", self.MONGO_PASSWORD)
        self._check_default_secret("FIRST_SUPERUSER_PASSWORD", self.FIRST_SUPERUSER_PASSWORD)
        return self
    
settings = Settings()

