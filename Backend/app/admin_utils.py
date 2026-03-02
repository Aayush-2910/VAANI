"""
Admin utility functions - Use these to manually assign admin role
DO NOT expose these functions via API endpoints
"""

from app.firebase_admin import set_custom_claims, get_user

def assign_admin_role(uid: str):
    """
    Manually assign admin role to a user.
    This should only be called from backend scripts, never from API.
    
    Usage:
        python -c "from app.admin_utils import assign_admin_role; assign_admin_role('USER_UID_HERE')"
    """
    try:
        user = get_user(uid)
        print(f"Assigning admin role to user: {user.email}")
        
        set_custom_claims(uid, {"role": "admin"})
        
        print(f"✅ Admin role assigned successfully to {user.email}")
        print(f"UID: {uid}")
        return True
    except Exception as e:
        print(f"❌ Failed to assign admin role: {str(e)}")
        return False

def remove_role(uid: str):
    """Remove role from a user"""
    try:
        user = get_user(uid)
        print(f"Removing role from user: {user.email}")
        
        set_custom_claims(uid, {"role": None})
        
        print(f"✅ Role removed successfully from {user.email}")
        return True
    except Exception as e:
        print(f"❌ Failed to remove role: {str(e)}")
        return False

def get_user_role(uid: str):
    """Get user's current role"""
    try:
        user = get_user(uid)
        claims = user.custom_claims or {}
        role = claims.get("role", "No role assigned")
        
        print(f"User: {user.email}")
        print(f"UID: {uid}")
        print(f"Role: {role}")
        print(f"Custom Claims: {claims}")
        
        return role
    except Exception as e:
        print(f"❌ Failed to get user role: {str(e)}")
        return None

if __name__ == "__main__":
    print("Admin Utilities - Manual Role Management")
    print("=" * 50)
    print("\nAvailable functions:")
    print("1. assign_admin_role(uid)")
    print("2. remove_role(uid)")
    print("3. get_user_role(uid)")
    print("\nExample usage:")
    print('python -c "from app.admin_utils import assign_admin_role; assign_admin_role(\'USER_UID\')"')
