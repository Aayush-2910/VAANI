from fastapi import APIRouter, Depends
from app.dependencies import require_role

router = APIRouter()

@router.get("/user-dashboard")
async def user_dashboard(current_user: dict = Depends(require_role("user"))):
    """Protected route for users only"""
    return {
        "message": "Welcome to User Dashboard",
        "user": {
            "uid": current_user.get("uid"),
            "email": current_user.get("email"),
            "role": current_user.get("role")
        },
        "data": {
            "services": ["Voice AI", "Language Translation", "Support"],
            "access_level": "user"
        }
    }

@router.get("/volunteer-dashboard")
async def volunteer_dashboard(current_user: dict = Depends(require_role("volunteer"))):
    """Protected route for volunteers only"""
    return {
        "message": "Welcome to Volunteer Dashboard",
        "volunteer": {
            "uid": current_user.get("uid"),
            "email": current_user.get("email"),
            "role": current_user.get("role")
        },
        "data": {
            "tasks": ["Community Support", "Content Moderation", "User Assistance"],
            "access_level": "volunteer"
        }
    }

@router.get("/admin-dashboard")
async def admin_dashboard(current_user: dict = Depends(require_role("admin"))):
    """Protected route for admins only"""
    return {
        "message": "Welcome to Admin Dashboard",
        "admin": {
            "uid": current_user.get("uid"),
            "email": current_user.get("email"),
            "role": current_user.get("role")
        },
        "data": {
            "permissions": ["full_access", "user_management", "system_config"],
            "access_level": "admin"
        }
    }
