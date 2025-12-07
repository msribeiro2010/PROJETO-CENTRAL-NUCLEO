@echo off
title Central NAPJe - Servidor Local
color 0A

echo.
echo ========================================
echo    Central NAPJe - Iniciando Servidor
echo ========================================
echo.

:: Verificar se Node.js esta instalado
where node >nul 2>nul
if %errorlevel% neq 0 (
    color 0C
    echo [ERRO] Node.js nao esta instalado!
    echo.
    echo Baixe e instale em: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

:: Mostrar versao do Node
echo [OK] Node.js encontrado:
node -v
echo.

:: Entrar na pasta server
cd /d "%~dp0server"

:: Verificar se node_modules existe
if not exist "node_modules" (
    echo [INFO] Instalando dependencias pela primeira vez...
    echo Isso pode demorar alguns minutos...
    echo.
    call npm install
    echo.
)

:: Iniciar o servidor
echo [INFO] Iniciando servidor...
echo.
echo ========================================
echo   Servidor rodando em:
echo   http://localhost:3000
echo ========================================
echo.
echo Pressione Ctrl+C para parar o servidor
echo.

:: Abrir navegador automaticamente apos 3 segundos
start "" cmd /c "timeout /t 3 >nul && start http://localhost:3000"

:: Executar servidor
node server.js

pause

