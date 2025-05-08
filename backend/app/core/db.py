import logging
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.server_api import ServerApi
from beanie import init_beanie
from app.core.config import settings
from app.schemes import UserBase, User, UserCreate, UserPublic, UserRegister, UsersPublic, UserUpdate, UserUpdateMe, UpdatePassword, PostBase, Post, PostCreate, PostsPublic, PostUpdate, PostPublic, Token, TokenPayload, Message

logger = logging.getLogger(__name__)

async def get_mongo_client() -> AsyncIOMotorClient:
    """
    Create and return a MongoDb client using the provided connection URI.
    """
    uri = settings.MONGODB_DATABASE_URI
    logger.debug(f"Connecting to MongoDB atlas with URI: {uri}")

    client = AsyncIOMotorClient(uri, server_api=ServerApi('1'))

    try:
        await client.admin.command('ping')
        logger.info("Pinged your deployment. You successfully connected to MongoDB")
    except Exception as e:
        logger.error(f"Failed to connect to MongoDB: {e}")
        raise

    return client

async def init_db():
    """
    Initialize the MongoDB database and Beanie document models.
    """
    client = await get_mongo_client()

    await init_beanie(database=client[settings.MONGO_DB], document_models=[UserBase, User, UserCreate, UserPublic, UserRegister, UsersPublic, UserUpdate, UserUpdateMe, UpdatePassword, PostBase, Post, PostCreate, PostsPublic, PostUpdate, Token, TokenPayload, Message])