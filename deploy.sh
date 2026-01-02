#!/bin/bash

# Скрипт для автоматического деплоя Pardon

echo "🚀 Начинаем деплой Pardon..."

# Цвета для вывода
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Проверка Node.js
echo -e "${YELLOW}Проверяем Node.js...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}Node.js не установлен. Устанавливаем...${NC}"
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt install -y nodejs
else
    echo -e "${GREEN}Node.js установлен: $(node -v)${NC}"
fi

# Проверка PM2
echo -e "${YELLOW}Проверяем PM2...${NC}"
if ! command -v pm2 &> /dev/null; then
    echo -e "${RED}PM2 не установлен. Устанавливаем...${NC}"
    sudo npm install -g pm2
else
    echo -e "${GREEN}PM2 установлен${NC}"
fi

# Установка зависимостей
echo -e "${YELLOW}Устанавливаем зависимости...${NC}"
npm install

# Сборка проекта
echo -e "${YELLOW}Собираем проект...${NC}"
npm run build

# Остановка старого процесса (если есть)
echo -e "${YELLOW}Останавливаем старый процесс...${NC}"
pm2 stop pardon 2>/dev/null || true
pm2 delete pardon 2>/dev/null || true

# Запуск через PM2
echo -e "${YELLOW}Запускаем приложение через PM2...${NC}"
pm2 start npm --name "pardon" -- start

# Сохранение конфигурации PM2
pm2 save

echo -e "${GREEN}✅ Деплой завершен!${NC}"
echo -e "${GREEN}Приложение запущено на http://localhost:3000${NC}"
echo ""
echo "Полезные команды:"
echo "  pm2 status          - статус приложения"
echo "  pm2 logs pardon     - просмотр логов"
echo "  pm2 restart pardon  - перезапуск"
echo "  pm2 monit           - мониторинг"

