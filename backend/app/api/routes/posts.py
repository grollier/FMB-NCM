# posts.py
from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException
from bson import ObjectId

from app.api.deps import CurrentUser
from app.schemes import Post, PostCreate, PostPublic, PostUpdate, Message, PyObjectId, User, UserPublic

router = APIRouter(prefix="/posts", tags=["posts"])

@router.get("/", response_model=PostPublic)
async def read_posts(
    current_user: CurrentUser, skip: int = 0, limit: int = 100
) -> Any:
    """
    Retrieve posts.
    """
    if current_user.is_superuser:
        posts = await Post.find().skip(skip).limit(limit).to_list()
        total_count = await Post.find().count()
    else:
        posts = await Post.find(Post.owner == current_user.id).skip(skip).limit(limit).to_list()
        total_count = await Post.find(Post.owner == current_user.id).count()

    posts_with_owner = []
    for post in posts:
        post_dict = post.model_dump()
        post_dict["owner"] = post.owner
        post_dict["owner_id"] = post.owner_id
        posts_with_owner.append(post_dict)

    return PostPublic(data=posts_with_owner, total_count=total_count)

@router.post("/", response_model=PostPublic)
async def create_post(
    *, current_user: CurrentUser, post_in: PostCreate
) -> Any:
    """
    Create new post.
    """
    user = await User.get(current_user.id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user_public = UserPublic(**user.model_dump())
    
    post = Post(
        title=post_in.title,
        body=post_in.body,
        owner=user,
        owner_id=current_user.id
    )
    await post.insert()

    post_public = PostPublic(
        data=[post],
        total_count=1,
        owner=user_public,
        owner_id=current_user.id
    )
    return post_public

@router.put("/{id}", response_model=PostPublic)
async def update_post(
    *,
    current_user: CurrentUser,
    id: PyObjectId,
    post_in: PostUpdate
) -> Any:
    """
    Update an post.
    """
    post = await Post.get(id)
    if not post:
        raise HTTPException(status_code=404, detail="Item not found")
    if not current_user.is_superuser and (post.owner != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    update_dict = post_in.model_dump(exclude_unset=True)
    await post.set(update_dict)
    return post

@router.delete("/{id}")
async def delete_post(
    current_user: CurrentUser, id: PyObjectId
) -> Message:
    """
    Delete a post.
    """
    post = await Post.get(id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    if not current_user.is_superuser and (post.owner != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    await post.delete()
    return Message(message="Post was deleted successfully")