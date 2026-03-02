from pydantic import BaseModel, EmailStr, Field
from typing import Optional, Literal

class AssignRoleRequest(BaseModel):
    role: Literal["user", "volunteer"] = Field(..., description="Role to assign (user or volunteer)")

class RoleResponse(BaseModel):
    success: bool
    message: str
    role: Optional[str] = None
    uid: Optional[str] = None

class UserResponse(BaseModel):
    uid: str
    email: Optional[str] = None
    role: Optional[str] = None
    custom_claims: Optional[dict] = None

class ErrorResponse(BaseModel):
    error: str
    detail: Optional[str] = None
