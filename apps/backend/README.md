# LuckyVerse Backend

## Setup

1.  **Install Dependencies**:
    ```bash
    poetry install
    ```

2.  **Environment Variables**:
    Ensure `.env` is present in the root `lucky-verse` directory.

3.  **Database Migrations**:
    ```bash
    # Generate migration
    poetry run alembic revision --autogenerate -m "Initial migration"

    # Apply migration
    poetry run alembic upgrade head
    ```

4.  **Run Server**:
    ```bash
    poetry run uvicorn app.main:app --reload
    ```

## Docker

The backend runs as part of the docker-compose stack.
```bash
docker-compose up --build
```
