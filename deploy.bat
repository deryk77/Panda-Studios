@echo off
cd /d "%~dp0"
echo.
echo  Pushing Panda Studios to GitHub...
echo.
git add .
git diff --cached --quiet && (
    echo  Nothing new to push — site is already up to date.
) || (
    set /p msg="  Commit message (or press Enter for default): "
    if "%msg%"=="" set msg=Update site content
    git commit -m "%msg%"
    git push origin main
    echo.
    echo  Done. Vercel is deploying now.
)
echo.
pause
