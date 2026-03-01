@echo off
echo Starting VAANI Authentication Backend
echo ========================================

REM Check if serviceAccountKey.json exists
if not exist "serviceAccountKey.json" (
    echo Error: serviceAccountKey.json not found!
    echo Please download it from Firebase Console and place it in this directory.
    pause
    exit /b 1
)

REM Check if .env exists
if not exist ".env" (
    echo Warning: .env file not found. Creating from .env.example...
    copy .env.example .env
    echo Created .env file. Please review and update if needed.
)

REM Check if virtual environment exists
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate.bat

REM Install dependencies
echo Installing dependencies...
pip install -r requirements.txt

REM Start server
echo Starting FastAPI server...
echo Server will be available at: http://localhost:8000
echo API Documentation: http://localhost:8000/docs
echo.
uvicorn main:app --reload --port 8000
