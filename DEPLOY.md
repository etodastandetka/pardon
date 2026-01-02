# Инструкция по деплою Pardon на сервер

## 1. Установка Node.js

```bash
# Обновляем систему
sudo apt update && sudo apt upgrade -y

# Устанавливаем Node.js 20.x (LTS)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Проверяем версию
node -v
npm -v
```

## 2. Установка PM2

```bash
# Устанавливаем PM2 глобально
sudo npm install -g pm2

# Настраиваем автозапуск PM2 при перезагрузке
pm2 startup
# Выполните команду, которую выведет PM2
```

## 3. Сборка проекта

```bash
# Переходим в директорию проекта
cd /path/to/pardon

# Устанавливаем зависимости
npm install

# Собираем проект для продакшена
npm run build
```

## 4. Запуск через PM2

```bash
# Запускаем приложение
pm2 start npm --name "pardon" -- start

# Или используем ecosystem файл (см. ecosystem.config.js)
pm2 start ecosystem.config.js

# Проверяем статус
pm2 status

# Просмотр логов
pm2 logs pardon

# Сохраняем конфигурацию PM2
pm2 save
```

## 5. Установка Nginx

```bash
# Устанавливаем Nginx
sudo apt install -y nginx

# Запускаем Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Проверяем статус
sudo systemctl status nginx
```

## 6. Получение SSL сертификата (Let's Encrypt)

```bash
# Устанавливаем Certbot
sudo apt install -y certbot python3-certbot-nginx

# Получаем сертификат (замените yourdomain.com на ваш домен)
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Сертификат будет автоматически обновляться
# Проверяем автообновление
sudo certbot renew --dry-run
```

## 7. Настройка Nginx

Создайте файл конфигурации `/etc/nginx/sites-available/pardon`:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    
    # Редирект на HTTPS (после получения сертификата)
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    # SSL сертификаты (Certbot добавит автоматически)
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    
    # SSL настройки
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Максимальный размер загружаемых файлов
    client_max_body_size 100M;

    # Проксирование на Next.js приложение
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Кеширование статических файлов
    location /_next/static {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 200 60m;
        add_header Cache-Control "public, immutable";
    }

    # Логи
    access_log /var/log/nginx/pardon_access.log;
    error_log /var/log/nginx/pardon_error.log;
}
```

Активируйте конфигурацию:

```bash
# Создаем симлинк
sudo ln -s /etc/nginx/sites-available/pardon /etc/nginx/sites-enabled/

# Удаляем дефолтную конфигурацию (опционально)
sudo rm /etc/nginx/sites-enabled/default

# Проверяем конфигурацию
sudo nginx -t

# Перезагружаем Nginx
sudo systemctl reload nginx
```

## 8. Настройка файрвола

```bash
# Разрешаем HTTP и HTTPS
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable
sudo ufw status
```

## 9. Переменные окружения (если нужны)

Создайте файл `.env.local` в корне проекта:

```env
# Пример (если нужны переменные окружения)
# NODE_ENV=production
```

## 10. Полезные команды

```bash
# PM2
pm2 restart pardon      # Перезапуск
pm2 stop pardon        # Остановка
pm2 delete pardon      # Удаление
pm2 monit              # Мониторинг в реальном времени

# Nginx
sudo nginx -t          # Проверка конфигурации
sudo systemctl reload nginx  # Перезагрузка без простоя
sudo systemctl restart nginx # Полный перезапуск

# Логи
pm2 logs pardon        # Логи приложения
sudo tail -f /var/log/nginx/pardon_error.log  # Логи Nginx
```

## 11. Обновление приложения

```bash
# Переходим в директорию проекта
cd /path/to/pardon

# Получаем последние изменения
git pull

# Устанавливаем зависимости (если изменились)
npm install

# Пересобираем проект
npm run build

# Перезапускаем через PM2
pm2 restart pardon
```

## Требования к серверу

- Ubuntu 20.04+ / Debian 11+
- Минимум 1GB RAM
- Минимум 10GB свободного места
- Доменное имя, указывающее на IP сервера

