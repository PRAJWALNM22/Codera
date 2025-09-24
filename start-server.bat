@echo off
title Codera Development Server
echo.
echo =====================================================
echo            Codera Application Server
echo =====================================================
echo.
echo Starting development server...
echo This will fix Firebase authentication issues
echo.

python serve.py 8000

echo.
echo Server stopped. Press any key to exit...
pause >nul