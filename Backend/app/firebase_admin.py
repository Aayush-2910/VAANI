import firebase_admin
from firebase_admin import credentials, auth
from app.config import settings
import os

# Initialize Firebase Admin SDK
def initialize_firebase():
    if not firebase_admin._apps:
        cred_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), settings.FIREBASE_CREDENTIALS_PATH)
        cred = credentials.Certificate(cred_path)
        firebase_admin.initialize_app(cred)
        print("✅ Firebase Admin SDK initialized successfully")

initialize_firebase()

def verify_token(id_token: str):
    """Verify Firebase ID token"""
    try:
        decoded_token = auth.verify_id_token(id_token)
        return decoded_token
    except Exception as e:
        raise Exception(f"Token verification failed: {str(e)}")

def set_custom_claims(uid: str, claims: dict):
    """Set custom claims for a user"""
    try:
        auth.set_custom_user_claims(uid, claims)
        return True
    except Exception as e:
        raise Exception(f"Failed to set custom claims: {str(e)}")

def get_user(uid: str):
    """Get user by UID"""
    try:
        user = auth.get_user(uid)
        return user
    except Exception as e:
        raise Exception(f"Failed to get user: {str(e)}")
