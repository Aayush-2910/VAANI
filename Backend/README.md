# VAANI Authentication Backend

FastAPI backend with Firebase Admin SDK for role-based authentication.

## Features

- ✅ Firebase ID token verification
- ✅ Role-based access control (user, volunteer, admin)
- ✅ Custom claims management
- ✅ Protected routes with middleware
- ✅ Secure admin role assignment (manual only)

## Setup

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Firebase Setup

1. Go to Firebase Console → Project Settings → Service Accounts
2. Click "Generate New Private Key"
3. Save the JSON file as `serviceAccountKey.json` in the Backend folder
4. **IMPORTANT**: Add `serviceAccountKey.json` to `.gitignore`

### 3. Environment Variables

Copy `.env.example` to `.env` and configure:

```env
FIREBASE_CREDENTIALS_PATH=serviceAccountKey.json
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

### 4. Run Server

```bash
uvicorn main:app --reload --port 8000
```

Server will run at: `http://localhost:8000`

## API Endpoints

### Authentication

#### POST `/api/auth/assign-role`
Assign role after signup (user or volunteer only)

**Headers:**
```
Authorization: Bearer <firebase_id_token>
```

**Body:**
```json
{
  "role": "user"  // or "volunteer"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Role 'user' assigned successfully",
  "role": "user",
  "uid": "user_uid"
}
```

#### GET `/api/auth/me`
Get current user information

**Headers:**
```
Authorization: Bearer <firebase_id_token>
```

**Response:**
```json
{
  "uid": "user_uid",
  "email": "user@example.com",
  "role": "user",
  "custom_claims": {"role": "user"}
}
```

#### POST `/api/auth/verify-token`
Verify token validity

**Headers:**
```
Authorization: Bearer <firebase_id_token>
```

### Protected Routes

#### GET `/api/user-dashboard`
**Required Role:** user

#### GET `/api/volunteer-dashboard`
**Required Role:** volunteer

#### GET `/api/admin-dashboard`
**Required Role:** admin

## Admin Role Assignment

Admin role CANNOT be assigned via API. Use backend script:

```bash
python -c "from app.admin_utils import assign_admin_role; assign_admin_role('USER_UID_HERE')"
```

### Other Admin Utilities

```bash
# Get user role
python -c "from app.admin_utils import get_user_role; get_user_role('USER_UID')"

# Remove role
python -c "from app.admin_utils import remove_role; remove_role('USER_UID')"
```

## Security Rules

1. ✅ Never trust role from frontend
2. ✅ Admin role assigned manually only
3. ✅ Token verification on every request
4. ✅ Role validation via custom claims
5. ✅ CORS configured for specific origins

## Project Structure

```
Backend/
├── main.py                 # FastAPI app entry point
├── requirements.txt        # Python dependencies
├── serviceAccountKey.json  # Firebase credentials (DO NOT COMMIT)
├── .env                    # Environment variables
├── app/
│   ├── __init__.py
│   ├── config.py          # Configuration settings
│   ├── firebase_admin.py  # Firebase Admin SDK setup
│   ├── models.py          # Pydantic models
│   ├── dependencies.py    # Auth dependencies
│   ├── admin_utils.py     # Manual admin functions
│   └── routes/
│       ├── __init__.py
│       ├── auth.py        # Auth endpoints
│       └── protected.py   # Protected routes
```

## Error Handling

- `401 Unauthorized`: Invalid or missing token
- `403 Forbidden`: Insufficient permissions or role mismatch
- `400 Bad Request`: Invalid role or user already has role
- `500 Internal Server Error`: Server-side error

## Testing

```bash
# Health check
curl http://localhost:8000/health

# Verify token (replace with actual token)
curl -X POST http://localhost:8000/api/auth/verify-token \
  -H "Authorization: Bearer YOUR_FIREBASE_TOKEN"

# Assign role
curl -X POST http://localhost:8000/api/auth/assign-role \
  -H "Authorization: Bearer YOUR_FIREBASE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"role": "user"}'
```

## Documentation

Interactive API docs available at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`
