@echo off
echo 🚀 Building and deploying to Surge.sh...

echo.
echo 📦 Building Frontend...
cd frontend
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Frontend build failed!
    pause
    exit /b 1
)

echo.
echo 📦 Building Admin Panel...
cd ..\admin
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Admin build failed!
    pause
    exit /b 1
)

echo.
echo 🌐 Deploying Frontend to Surge...
cd ..\frontend\dist
call surge . modernstore-v1.surge.sh
if %errorlevel% neq 0 (
    echo ❌ Frontend deployment failed!
    pause
    exit /b 1
)

echo.
echo 🌐 Deploying Admin Panel to Surge...
cd ..\..\admin\dist
call surge . modernstore-admin-v1.surge.sh
if %errorlevel% neq 0 (
    echo ❌ Admin deployment failed!
    pause
    exit /b 1
)

echo.
echo ✅ Deployment completed successfully!
echo 🌐 Frontend: https://modernstore-v1.surge.sh
echo 🔧 Admin: https://modernstore-admin-v1.surge.sh
echo 🔗 Backend: https://pro-ordersm.vercel.app

pause