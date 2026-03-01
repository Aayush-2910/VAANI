from fastapi import APIRouter, HTTPException, status, Depends
from app.models import AssignRoleRequest, RoleResponse, UserResponse, ErrorResponse
from app.dependencies import get_current_user
from app.firebase_admin import set_custom_claims, get_user

router = APIRouter()

@router.post("/assign-role", response_model=RoleResponse)
async def assign_role(
    role_request: AssignRoleRequest,
    current_user: dict = Depends(get_current_user)
):
    """
    Assign role to authenticated user after signup.
    Only 'user' and 'volunteer' roles can be assigned via this endpoint.
    Admin role must be assigned manually via backend function.
    """
    try:
        uid = current_user.get("uid")
        role = role_request.role
        
        # Security: Block admin role assignment
        if role == "admin":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Admin role cannot be assigned through this endpoint"
            )
        
        # Validate role
        if role not in ["user", "volunteer"]:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid role. Must be 'user' or 'volunteer'"
            )
        
        # Check if user already has a role
        user = get_user(uid)
        existing_claims = user.custom_claims or {}
        
        if existing_claims.get("role"):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"User already has role: {existing_claims.get('role')}"
            )
        
        # Set custom claims
        set_custom_claims(uid, {"role": role})
        
        return RoleResponse(
            success=True,
            message=f"Role '{role}' assigned successfully",
            role=role,
            uid=uid
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to assign role: {str(e)}"
        )

@router.get("/me", response_model=UserResponse)
async def get_current_user_info(current_user: dict = Depends(get_current_user)):
    """Get current authenticated user information"""
    try:
        uid = current_user.get("uid")
        user = get_user(uid)
        
        return UserResponse(
            uid=uid,
            email=current_user.get("email"),
            role=current_user.get("role"),
            custom_claims=user.custom_claims
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to get user info: {str(e)}"
        )

@router.post("/verify-token")
async def verify_user_token(current_user: dict = Depends(get_current_user)):
    """Verify if token is valid"""
    return {
        "valid": True,
        "uid": current_user.get("uid"),
        "email": current_user.get("email"),
        "role": current_user.get("role")
    }
