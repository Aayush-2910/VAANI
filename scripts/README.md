# VAANI Scripts Directory

All utility scripts organized by purpose.

## 📁 Directory Structure

```
scripts/
├── deployment/      # Deployment & build scripts
├── setup/          # Initial setup & configuration
├── testing/        # Testing & validation scripts
└── maintenance/    # Daily operations (start/stop/check)
```

## 🚀 Deployment Scripts (`deployment/`)

| Script | Purpose |
|--------|---------|
| `deploy.ps1` | Main deployment script for AWS |
| `deploy.sh` | Linux/Mac deployment script |
| `deploy-nova-sonic.ps1` | Deploy with Nova Sonic voice model |
| `deploy-openai.ps1` | Deploy with OpenAI integration |
| `DEPLOY-NOW.ps1` | Quick deploy with all features |

**Usage:**
```powershell
cd VAANI
.\scripts\deployment\deploy.ps1
```

## ⚙️ Setup Scripts (`setup/`)

| Script | Purpose |
|--------|---------|
| `configure-aws.ps1` | Configure AWS credentials |
| `setup-nova-sonic.ps1` | Setup Nova Sonic voice model |
| `setup-aws-credentials.bat` | Windows batch AWS setup |
| `set-real-credentials.ps1` | Set production credentials |
| `update-credentials.ps1` | Update existing credentials |
| `bootstrap-cdk.ps1` | Bootstrap AWS CDK |
| `fix-vite-error.ps1` | Fix Vite build errors |
| `fix-voice-deploy.ps1` | Fix voice deployment issues |

**Usage:**
```powershell
# First time AWS setup
.\scripts\setup\configure-aws.ps1

# Setup voice features
.\scripts\setup\setup-nova-sonic.ps1
```

## 🧪 Testing Scripts (`testing/`)

| Script | Purpose |
|--------|---------|
| `TEST-VAANI.ps1` | Run all tests |
| `TEST-ENHANCED-AI.ps1` | Test AI features |
| `RUN-AI-TESTS.ps1` | Run AI test suite |
| `test-voice-setup.ps1` | Test voice configuration |
| `test-lambda-api.ps1` | Test Lambda functions |
| `test-openai-local.py` | Test OpenAI locally |
| `test-conversation.js` | Test conversation flow |
| `test-hindi-ai.js` | Test Hindi language support |

**Usage:**
```powershell
# Run all tests
.\scripts\testing\TEST-VAANI.ps1

# Test specific feature
.\scripts\testing\TEST-ENHANCED-AI.ps1
```

## 🔧 Maintenance Scripts (`maintenance/`)

| Script | Purpose |
|--------|---------|
| `START-ALL-SERVICES.ps1` | Start all VAANI services |
| `START-ALL-VAANI.ps1` | Alternative start script |
| `START-SMOOTH-VAANI.ps1` | Start with smooth initialization |
| `START-ALL-DASHBOARDS.ps1` | Start admin & user dashboards |
| `START-FRONTEND.ps1` | Start frontend only |
| `START-VOICE-ASSISTANT.ps1` | Start voice features |
| `START-ENHANCED-AI.ps1` | Start AI backend |
| `RESTART-VAANI.ps1` | Restart all services |
| `CHECK-ALL-SERVICES.ps1` | Check service status |
| `CHECK-LOGS.ps1` | View service logs |
| `COMPLETE-FIX.ps1` | Run complete system fix |
| `START-CORRECT.bat` | Windows batch start script |
| `start-services.bat` | Alternative batch start |

**Usage:**
```powershell
# Start everything
.\scripts\maintenance\START-ALL-SERVICES.ps1

# Check if services are running
.\scripts\maintenance\CHECK-ALL-SERVICES.ps1

# View logs
.\scripts\maintenance\CHECK-LOGS.ps1

# Restart if needed
.\scripts\maintenance\RESTART-VAANI.ps1
```

## 🎯 Common Workflows

### First Time Setup
```powershell
# 1. Configure AWS
.\scripts\setup\configure-aws.ps1

# 2. Setup credentials
.\scripts\setup\set-real-credentials.ps1

# 3. Start services
.\scripts\maintenance\START-ALL-SERVICES.ps1

# 4. Run tests
.\scripts\testing\TEST-VAANI.ps1
```

### Daily Development
```powershell
# Start
.\scripts\maintenance\START-ALL-SERVICES.ps1

# Check status
.\scripts\maintenance\CHECK-ALL-SERVICES.ps1

# View logs if issues
.\scripts\maintenance\CHECK-LOGS.ps1
```

### Before Deployment
```powershell
# 1. Run tests
.\scripts\testing\TEST-VAANI.ps1

# 2. Check services
.\scripts\maintenance\CHECK-ALL-SERVICES.ps1

# 3. Deploy
.\scripts\deployment\deploy.ps1
```

### Troubleshooting
```powershell
# 1. Check logs
.\scripts\maintenance\CHECK-LOGS.ps1

# 2. Run fix script
.\scripts\maintenance\COMPLETE-FIX.ps1

# 3. Restart services
.\scripts\maintenance\RESTART-VAANI.ps1
```

## 💡 Tips

- Always run scripts from VAANI root directory
- Check script output for errors
- Use `CHECK-LOGS.ps1` for debugging
- Keep credentials secure (never commit .env files)

## 🔒 Security Notes

- Scripts in `setup/` may contain sensitive operations
- Never share credential files
- Review scripts before running in production
- Use environment variables for secrets

## 📝 Script Naming Convention

- `UPPERCASE.ps1` - Main/important scripts
- `lowercase.ps1` - Helper/utility scripts
- `.bat` - Windows batch files
- `.sh` - Linux/Mac shell scripts
- `.py` - Python scripts
- `.js` - Node.js scripts
