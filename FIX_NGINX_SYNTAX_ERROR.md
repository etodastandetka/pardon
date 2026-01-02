# Исправление ошибки синтаксиса Nginx

## Проблема
```
"location" directive is not allowed here in /etc/nginx/sites-enabled/default:1
nginx: configuration file /etc/nginx/nginx.conf test failed
```

## Причина
Блок `location` находится вне блока `server`, что недопустимо в Nginx. Вероятно, при редактировании был удален или неправильно размещен блок `server`.

## Решение

### Вариант 1: Восстановить правильную структуру в default

Откройте файл и исправьте структуру:

```bash
sudo nano /etc/nginx/sites-enabled/default
```

**Правильная структура должна быть:**

```nginx
server {
    listen 80;
    server_name pardon.su;
    
    # Редирект на HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name pardon.su;

    # SSL сертификаты
    ssl_certificate /etc/letsencrypt/live/pardon.su/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/pardon.su/privkey.pem;
    
    # SSL настройки
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

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
}
```

**ВАЖНО:** Блок `location /` должен быть ВНУТРИ блока `server { ... }`!

### Вариант 2: Использовать кастомную конфигурацию (рекомендуется)

```bash
# 1. Удалите поврежденный default
sudo rm /etc/nginx/sites-enabled/default

# 2. Используйте кастомную конфигурацию
cd /var/www/pardon
sudo cp nginx.conf /etc/nginx/sites-available/pardon
sudo ln -sf /etc/nginx/sites-available/pardon /etc/nginx/sites-enabled/pardon

# 3. Проверьте синтаксис
sudo nginx -t

# 4. Если все ок, перезагрузите
sudo systemctl reload nginx
```

### Вариант 3: Полное восстановление default из резервной копии

Если есть резервная копия:

```bash
# Восстановите из резервной копии
sudo cp /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default

# Или если Certbot создал резервную копию
sudo ls /etc/letsencrypt/renewal/
```

## Быстрое исправление

Если файл полностью поврежден, восстановите его:

```bash
# 1. Остановите Nginx
sudo systemctl stop nginx

# 2. Удалите поврежденный файл
sudo rm /etc/nginx/sites-enabled/default

# 3. Скопируйте правильную конфигурацию
cd /var/www/pardon
sudo cp nginx.conf /etc/nginx/sites-available/pardon
sudo ln -s /etc/nginx/sites-available/pardon /etc/nginx/sites-enabled/pardon

# 4. Проверьте синтаксис
sudo nginx -t

# 5. Запустите Nginx
sudo systemctl start nginx

# 6. Проверьте статус
sudo systemctl status nginx
```

## Проверка правильности структуры

После исправления проверьте:

```bash
# 1. Синтаксис
sudo nginx -t
# Должно быть: "syntax is ok" и "test is successful"

# 2. Структура конфигурации
sudo nginx -T | grep -A 5 "server {"
# Должны увидеть блоки server с правильной структурой

# 3. Статус сервиса
sudo systemctl status nginx
# Должен быть "active (running)"
```

## Правила синтаксиса Nginx

Помните:
- `location` должен быть внутри `server`
- `server` должен быть внутри `http` (в главном конфиге) или в отдельном файле сайта
- Каждый блок должен быть правильно закрыт фигурными скобками `{ }`

## Если ничего не помогает

Восстановите конфигурацию с нуля:

```bash
# 1. Остановите Nginx
sudo systemctl stop nginx

# 2. Удалите все активные конфигурации
sudo rm /etc/nginx/sites-enabled/*

# 3. Скопируйте правильную конфигурацию из проекта
cd /var/www/pardon
sudo cp nginx.conf /etc/nginx/sites-available/pardon

# 4. Активируйте
sudo ln -s /etc/nginx/sites-available/pardon /etc/nginx/sites-enabled/pardon

# 5. Проверьте и запустите
sudo nginx -t
sudo systemctl start nginx
```

