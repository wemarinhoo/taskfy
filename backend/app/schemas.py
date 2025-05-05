from pydantic import BaseModel

class TaskCreate(BaseModel):
    title: str
    description: str | None = None

class TaskResponse(BaseModel):
    id: int
    title: str
    description: str | None
    done: bool

    class Config:
        from_attributes = True