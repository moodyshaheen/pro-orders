@echo off
echo 🚀 Starting ModernStore Backend Locally...

echo.
echo 📦 Installing dependencies...
cd backend
call npm install

echo.
echo 🔥 Starting backend server...
start "Backend Server" cmd /k "npm start"

echo.
echo ⏳ Waiting for server to start...
timeout /t 5 /nobreak > nul

echo.
echo 🌐 Starting ngrok tunnel...
echo 📝 Make sure you have ngrok installed: https://ngrok.com/download
echo 💡 Run this command in another terminal: ngrok http 4000

echo.
echo ✅ Backend should be running on:
echo 🔗 Local: http://localhost:4000
echo 🌍 Public (via ngrok): https://your-ngrok-url.ngrok.io

echo.
echo 📋 Don't forget to update frontend and admin .env files with the ngrok URL!

pause