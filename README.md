# VAANI - Voice Assistant Platform

A multilingual voice assistant platform with AI-powered civic services.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.9+
- AWS Account (for voice features)
- Firebase Account (for authentication)

### Installation

1. **Clone and Install**
   ```bash
   cd VAANI
   npm install
   ```

2. **Setup Firebase**
   - Configure `frontend/src/config/firebase.js` with your Firebase credentials
   - Enable Authentication and Firestore in Firebase Console

3. **Start Development**
   ```bash
   # Start all services
   ./scripts/maintenance/START-ALL-SERVICES.ps1
   ```

## 📁 Project Structure

```
VAANI/
├── frontend/              # React frontend application
├── Backend/              # FastAPI backend server
├── ai-backend/           # AI/ML services
├── amplify/              # AWS Amplify configuration
├── scripts/              # Utility scripts
│   ├── deployment/       # Deployment scripts
│   ├── setup/           # Setup & configuration
│   ├── testing/         # Test scripts
│   └── maintenance/     # Start/stop/check scripts
└── docs/                # Documentation
```

## 🛠️ Available Scripts

### Development
- `scripts/maintenance/START-ALL-SERVICES.ps1` - Start all services
- `scripts/maintenance/START-FRONTEND.ps1` - Start frontend only
- `scripts/maintenance/RESTART-VAANI.ps1` - Restart all services

### Testing
- `scripts/testing/TEST-VAANI.ps1` - Run all tests
- `scripts/testing/RUN-AI-TESTS.ps1` - Test AI features
- `scripts/testing/TEST-ENHANCED-AI.ps1` - Test enhanced AI

### Deployment
- `scripts/deployment/deploy.ps1` - Deploy to AWS
- `scripts/deployment/deploy-nova-sonic.ps1` - Deploy with Nova Sonic voice

### Setup
- `scripts/setup/configure-aws.ps1` - Configure AWS credentials
- `scripts/setup/setup-nova-sonic.ps1` - Setup Nova Sonic voice model

## 📚 Documentation

- [Architecture](docs/ARCHITECTURE.md) - System architecture overview
- [Deployment Guide](docs/DEPLOYMENT-GUIDE.md) - Deployment instructions
- [Testing Guide](docs/TESTING-GUIDE.md) - Testing procedures
- [Start Here](docs/START-HERE-FINAL.md) - Getting started guide
- [Troubleshooting](docs/TROUBLESHOOTING.md) - Common issues and solutions

## 🔧 Configuration

### Frontend
- Firebase config: `frontend/src/config/firebase.js`
- Environment: `frontend/.env`

### Backend
- FastAPI config: `Backend/app/config.py`
- Environment: `Backend/.env`

### AI Backend
- Server config: `ai-backend/server-enhanced.js`
- Environment: `ai-backend/.env`

## 🌟 Features

- ✅ Multilingual support (English, Hindi)
- ✅ Voice interaction (Speech-to-Text & Text-to-Speech)
- ✅ AI-powered responses
- ✅ User authentication (Firebase)
- ✅ Role-based access (User, Volunteer, Admin)
- ✅ Civic services integration
- ✅ Real-time dashboards

## 🔐 Security

- Firebase Authentication
- Role-based access control
- Secure API endpoints
- Environment variable protection

## 📝 License

[Your License Here]

## 🤝 Contributing

[Contributing guidelines]

## 📧 Support

For issues and questions, please check the [Troubleshooting Guide](docs/TROUBLESHOOTING.md)
