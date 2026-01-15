from fastapi import APIRouter
from app.api import auth, users, wallet

api_router = APIRouter()
api_router.include_router(auth.router)
api_router.include_router(users.router)
api_router.include_router(wallet.router)
