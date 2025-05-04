from typing import Optional, List, Any
from pydantic import BaseModel, EmailStr, Field, GetCoreSchemaHandler
from pydantic_core import core_schema
from beanie import Document, Indexed, Link
from bson import ObjectId
from app.core.security import get_password_hash

# Custom Pydantic type for ObjectId
class PyObjectId:
    @classmethod
    def __get_pydantic_core_schema__(
        cls, source_type: Any, handler: GetCoreSchemaHandler
    ) -> core_schema.CoreSchema:
        
        _ = source_type, handler

        return core_schema.no_info_after_validator_function(
            cls.validate,
            core_schema.union_schema([
                core_schema.str_schema(),
                core_schema.is_instance_schema(ObjectId)
            ]),
        )
    
    # This class method handles the validation for our custom ObjectId
    @classmethod
    def validate(cls, v: str | ObjectId) -> ObjectId:
        if isinstance(v, ObjectId):
            return v
        if isinstance(v, str):
            if ObjectId.is_valid(v):
                return ObjectId(v)
            raise ValueError("Invalid ObjectId")
        return ValueError("Invalid type for ObjectId")
    
    @classmethod
    def __get_pydantic_json_schema__(cls, schema: core_schema.CoreSchema, handler):
        return {"type": "string", "format": "objectid"}
    
    def __init__(self, value: str | ObjectId):
        self.value = self.validate(value)

    def __str__(self):
        return str(self.value)
    
    def __repr__(self):
        return f"PyObjectId({str(self.value)})"

# User schema
 
class UserBase(Document):
    username: Indexed(str, unique=True) = Field(max_length=123, min_length=2)
    email: Indexed(EmailStr, unique=True) = Field(max_length=255)
    is_active: bool = True
    is_superuser: bool = False

    class Settings:
        name = "users" # This is the MongoDB colleciton name

class UserCreate(UserBase):
    email: EmailStr = Field(max_length=255)
    password: str = Field(min_length=12, max_length=40)
    username: str = Field(unique=True, max_length=123, min_length=2)
    is_active: bool = True
    is_superuser: bool = False

    def to_user(self) -> "User":
        """Conver UserCreate to User by hashing the password."""
        return User(
            email=self.email,
            hashed_password=get_password_hash(self.password),
            is_active=self.is_active,
            is_superuser=self.is_superuser,
            username=self.username,
        )
    
class UserRegister(Document):
    email: EmailStr = Field(max_length=255)
    password: str = Field(min_length=12, max_length=40)
    username: str = Field(unique=True, max_length=123, min_length=2)

    class Settings:
        name = "user_registrations" # Separate collection for registrations
    
class UserUpdate(Document):
    email: Optional[EmailStr] = Field(default=None, max_length=255)
    password: Optional[str] = Field(default=None, min_length=12)
    is_active: Optional[bool] = None
    is_superuser: Optional[bool] = None
    username: Optional[str] = Field(default=None, max_length=123, min_length=2)

    class Settings:
        name = "user_updates" # Separate colleciton for updates.
    
class UserUpdateMe(Document):
    username: Optional[str] = Field(default=None, max_length=123, min_length=2)
    email: Optional[EmailStr] = Field(default=None, max_length=255)

    class Settings:
        name = "user_updates_me" # Separate colleciton for self updates

class UpdatePassword(Document):
    current_password: str = Field(min_length=12, max_length=40)
    new_password: str = Field(min_length=12, max_length=40)

    class Settings: name = "password_updates"
    
class User(UserBase):
    id: PyObjectId = Field(default_factory=PyObjectId, primary_key=True, alias="_id")
    email: str
    hashed_password: str
    posts: List[Link["Post"]] = [] # Link to posts (one-to-many relationship)

    class Settings:
        name = "users" # Setting the users collection

    # Here is the configuration for our custom PyObjectId
    class Config:
        arbitrary_types_allowed = True
        json_encoders = {
            ObjectId: str,
            PyObjectId: str,
        }

# Properties to return via API. id is always required.
class UserPublic(UserBase):
    id: PyObjectId # set the custom ObjectId
    username: str
    email: EmailStr
    is_active: bool
    is_superuser: bool

    class Config:
        json_encoders = {
            ObjectId: str,
            PyObjectId: str,
        }

class UsersPublic(Document):
    data: List[UserPublic]
    total_count: int

    class Config:
        json_encoders = {
            ObjectId: str,
            PyObjectId: str,
        }
        
# Posts Schema
class PostBase(Document):
    title: str = Field(default=None, min_length=1, max_length=255)
    body: str = Field(default=None, min_length=1, max_length=1000)
    owner: Link[User]
    owner_id: PyObjectId

    class Settings:
        name = "posts"

    class Config:
        json_encoders = {
            ObjectId: str,
            PyObjectId: str,
        }

class PostCreate(PostBase):
    owner_id: PyObjectId # set the custom PyObjectId

class PostUpdate(PostBase):
    title: Optional[str] = Field(default=None, min_length=1, max_length=255)
    body: Optional[str] = Field(default=None, min_length=1, max_length=750)
    owner_id: Optional[PyObjectId] = None

class Post(PostBase):
    id: PyObjectId = Field(default_factory=ObjectId, primary_key=True)
    owner: Link[User]
    owner_id: PyObjectId

    class Settings:
        name = "posts"

    class Config:
        json_encoders = {
            ObjectId: str,
            PyObjectId: str,
        }

class PostPublic(PostBase):
    data: List[Post]
    total_count: int
    owner: Optional[UserPublic] = None
    owner_id: Optional[PyObjectId] = None

    class Config:
        json_encoders = {
            ObjectId: str,
            PyObjectId: str,
        }

class PostsPublic(Document):
    data: List[PostPublic]
    total_count: int

    class Settings:
        name = "posts_public"

class Message(Document):
    message: str

    class Settings:
        name = "messages"

# JSON payload containing access token
class Token(Document):
    access_token: str
    token_type: str = "bearer"

    class Settings:
        name = "tokens" # handle the tokens in a different collection

class TokenPayload(Document):
    sub: Optional[str] = None

    class Settings:
        name = "token_payloads" # Separate collection for token payloads

class NewPassword(Document):
    token: str
    new_password: str = Field(min_length=12, max_length=40)

    class Settings:
        name = "new_passwords"