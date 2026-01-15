import secrets
import string
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.user import User


def generate_referral_code(length: int = 8) -> str:
    """Generate an alphanumeric referral code."""
    chars = string.ascii_uppercase + string.digits
    return ''.join(secrets.choice(chars) for _ in range(length))


async def get_unique_referral_code(db: AsyncSession) -> str:
    """Generate a unique referral code that doesn't exist in the database."""
    while True:
        code = generate_referral_code()
        result = await db.execute(
            select(User).where(User.referral_code == code)
        )
        if not result.scalars().first():
            return code


async def get_user_by_referral_code(
    db: AsyncSession,
    referral_code: str
) -> User | None:
    """Get user by referral code."""
    result = await db.execute(
        select(User).where(User.referral_code == referral_code)
    )
    return result.scalars().first()
