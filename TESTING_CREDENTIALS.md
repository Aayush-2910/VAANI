# VAANI Testing Credentials

## Admin Login
**Email:** admin@vaani.gov.in  
**Password:** admin123  
**Dashboard URL:** http://localhost:3003

**Note:** Admin accounts cannot be created through signup. Use the credentials above to login directly.

---

## Volunteer Login (Testing)
**Email:** volunteer@vaani.gov.in  
**Password:** volunteer123  
**Dashboard URL:** http://localhost:3002

**Alternative Volunteer Accounts:**
- volunteer1@vaani.gov.in / volunteer123
- volunteer2@vaani.gov.in / volunteer123

---

## User Login (Testing)
**Email:** user@vaani.gov.in  
**Password:** user123  
**Dashboard URL:** http://localhost:3001

**Note:** Any email not in the admin or volunteer list will be treated as a regular user.

---

## How to Test

### 1. Admin Dashboard
1. Go to http://localhost:5173/login
2. Enter admin credentials
3. Click "Sign in"
4. You will be redirected to Admin Dashboard (port 3003)

### 2. Volunteer Dashboard
1. Go to http://localhost:5173/login
2. Enter volunteer credentials
3. Click "Sign in"
4. You will be redirected to Volunteer Dashboard (port 3002)

### 3. User Dashboard
1. Go to http://localhost:5173/login
2. Enter user credentials OR signup as a new user
3. Click "Sign in"
4. You will be redirected to User Dashboard (port 3001)

---

## Important Notes

- **Admin accounts** can only login, not signup
- **Volunteer accounts** can signup or use testing credentials
- **User accounts** can signup freely
- All passwords for testing accounts are simple for development purposes
- In production, use strong passwords and proper authentication

---

## Authorized Users Configuration

The authorized users are configured in:
`VAANI/frontend/src/config/authorizedUsers.js`

### Admin Emails:
- admin@vaani.gov.in

### Volunteer Emails:
- volunteer@vaani.gov.in
- volunteer1@vaani.gov.in
- volunteer2@vaani.gov.in

### User Emails:
- Any email not in the above lists

---

## Firebase Setup Required

Before testing, ensure Firebase is configured:
1. Backend must be running (port 8000)
2. Firebase credentials must be set in `.env` files
3. All three dashboards must be running on their respective ports

**Start Commands:**
```bash
# Backend
cd VAANI/Backend
python main.py

# User Dashboard (port 3001)
cd VAANI/frontend/user-dashboard
npm start

# Volunteer Dashboard (port 3002)
cd VAANI/frontend/volunteer-dashboard
npm start

# Admin Dashboard (port 3003)
cd VAANI/frontend/admin-dashboard
npm start

# Main Frontend (port 5173)
cd VAANI/frontend
npm run dev
```
