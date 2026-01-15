"""add_referral_system

Revision ID: 39d1f04f8def
Revises: 228447473fe3
Create Date: 2026-01-12 23:05:37.933157

"""
from typing import Sequence, Union
import secrets
import string

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '39d1f04f8def'
down_revision: Union[str, None] = '228447473fe3'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def generate_referral_code(length: int = 8) -> str:
    """Generate an alphanumeric referral code."""
    chars = string.ascii_uppercase + string.digits
    return ''.join(secrets.choice(chars) for _ in range(length))


def upgrade() -> None:
    # Add columns as nullable first
    op.add_column('user', sa.Column('referral_code', sa.String(length=8), nullable=True))
    op.add_column('user', sa.Column('referred_by_id', sa.Integer(), nullable=True))

    # Backfill existing users with unique referral codes
    connection = op.get_bind()
    users = connection.execute(sa.text("SELECT id FROM \"user\" WHERE referral_code IS NULL"))
    existing_codes = set()

    for user in users:
        # Generate unique code
        code = generate_referral_code()
        while code in existing_codes:
            code = generate_referral_code()
        existing_codes.add(code)

        connection.execute(
            sa.text("UPDATE \"user\" SET referral_code = :code WHERE id = :id"),
            {"code": code, "id": user.id}
        )

    # Now make referral_code not nullable and add constraints
    op.alter_column('user', 'referral_code', nullable=False)
    op.create_index(op.f('ix_user_referral_code'), 'user', ['referral_code'], unique=True)
    op.create_foreign_key('fk_user_referred_by', 'user', 'user', ['referred_by_id'], ['id'])
    # ### end Alembic commands ###


def downgrade() -> None:
    op.drop_constraint('fk_user_referred_by', 'user', type_='foreignkey')
    op.drop_index(op.f('ix_user_referral_code'), table_name='user')
    op.drop_column('user', 'referred_by_id')
    op.drop_column('user', 'referral_code')
