# VAANI Quick Start Guide

## 🎯 For First Time Setup

### Step 1: Install Dependencies
```bash
cd VAANI
npm install
cd frontend && npm install
cd ../Backend && pip install -r requirements.txt
cd ../ai-backend && npm install
```

### Step 2: Configure Firebase
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create/Select project: `vaani-43777`
3. Enable Authentication (Email/Password)
4. Enable Firestore Database
5. Update security rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### Step 3: Start Services
```powershell
# Windows PowerShell
.\scripts\maintenance\START-ALL-SERVICES.ps1
```

## 🚀 Daily Development

### Start Everything
```powershell
.\scripts\maintenance\START-ALL-SERVICES.ps1
```

### Start Individual Services
```powershell
# Frontend only
.\scripts\maintenance\START-FRONTEND.ps1

# Backend only
cd Backend
python main.py

# AI Backend only
cd ai-backend
node server-enhanced.js
```

## 🧪 Testing

### Quick Test
```powershell
.\scripts\testing\TEST-VAANI.ps1
```

### Test AI Features
```powershell
.\scripts\testing\TEST-ENHANCED-AI.ps1
```

## 🔧 Common Issues

### Issue: "Failed to get document because the client is offline"
**Solution:**
1. Check internet connection
2. Verify Firebase Firestore is enabled
3. Check Firestore security rules
4. Clear browser cache

### Issue: Import errors in code
**Solution:**
```bash
cd frontend
npm install
```

### Issue: Backend not starting
**Solution:**
```bash
cd Backend
pip install -r requirements.txt
python main.py
```

## 📍 Important URLs

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- AI Backend: http://localhost:3001
- Admin Dashboard: http://localhost:3000
- User Dashboard: http://localhost:3002

## 📂 Key Files

| File | Purpose |
|------|---------|
| `frontend/src/config/firebase.js` | Firebase configuration |
| `Backend/.env` | Backend environment variables |
| `ai-backend/.env` | AI service configuration |
| `scripts/maintenance/START-ALL-SERVICES.ps1` | Start all services |

## 🆘 Need Help?

1. Check [Troubleshooting Guide](docs/TROUBLESHOOTING.md)
2. Review [Architecture](docs/ARCHITECTURE.md)
3. See [Full Documentation](docs/)

## 🎓 Learning Path

1. ✅ Read [START-HERE-FINAL.md](docs/START-HERE-FINAL.md)
2. ✅ Understand [ARCHITECTURE.md](docs/ARCHITECTURE.md)
3. ✅ Follow [DEPLOYMENT-GUIDE.md](docs/DEPLOYMENT-GUIDE.md)
4. ✅ Practice with [TESTING-GUIDE.md](docs/TESTING-GUIDE.md)
