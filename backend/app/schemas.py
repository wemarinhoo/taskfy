from pydantic import BaseModel, ConfigDict

class TaskBase(BaseModel):
    title: str
    description: str | None = None

class TaskCreate(TaskBase):
    model_config = ConfigDict(from_attributes=True)

class TaskResponse(TaskBase):
    id: int
    done: bool
    model_config = ConfigDict(from_attributes=True)