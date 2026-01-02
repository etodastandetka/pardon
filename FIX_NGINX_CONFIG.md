# Исправление: показывается дефолтная страница Nginx

## Проблема
На сайте `pardon.su` отображается "Welcome to nginx!" вместо Next.js приложения.

## Причина
Nginx использует дефолтную конфигурацию вместо кастомной, которая проксирует запросы на Next.js приложение.

## Решение

### Шаг 1: Проверьте, что приложение запущено

```bash
# Проверьте статус PM2
pm2 status

# Если приложение не запущено, запустите его
cd /var/www/pardon
pm2 start npm --name "pardon" -- start

# Или если используете ecosystem.config.js
pm2 start ecosystem.config.js
```

### Шаг 2: Проверьте, что приложение слушает на порту 3000

```bash
# Проверьте, что порт 3000 занят приложением
sudo netstat -tlnp | grep 3000
# или
sudo ss -tlnp | grep 3000

# Должно показать что-то вроде:
# tcp  0  0 127.0.0.1:3000  0.0.0.0:*  LISTEN  12345/node
```

### Шаг 3: Примените кастомную конфигурацию Nginx

```bash
# Перейдите в директорию проекта
cd /var/www/pardon

# Скопируйте конфигурацию в sites-available
sudo cp nginx.conf /etc/nginx/sites-available/pardon

# Создайте симлинк в sites-enabled
sudo ln -sf /etc/nginx/sites-available/pardon /etc/nginx/sites-enabled/pardon

# Удалите или переименуйте дефолтную конфигурацию
sudo rm /etc/nginx/sites-enabled/default
# или переименуйте:
# sudo mv /etc/nginx/sites-enabled/default /etc/nginx/sites-enabled/default.bak
```

### Шаг 4: Проверьте конфигурацию Nginx

```bash
# Проверьте синтаксис конфигурации
sudo nginx -t

# Должно показать:
# nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
# nginx: configuration file /etc/nginx/nginx.conf test is successful
```

### Шаг 5: Перезагрузите Nginx

```bash
# Перезагрузите Nginx (без простоя)
sudo systemctl reload nginx

# Или полный перезапуск
sudo systemctl restart nginx

# Проверьте статус
sudo systemctl status nginx
```

### Шаг 6: Проверьте работу сайта

```bash
# Проверьте через curl
curl -I https://pardon.su

# Должен вернуть статус 200 или 301/302, а не дефолтную страницу Nginx
```

## Альтернативный способ: редактирование дефолтной конфигурации

Если Certbot уже настроил `/etc/nginx/sites-enabled/default`, можно отредактировать её напрямую:

```bash
# Откройте конфигурацию
sudo nano /etc/nginx/sites-enabled/default

# Найдите блок server и замените location / на:
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
    proxy_read_timeout 300s;
    proxy_connect_timeout 75s;
}

# Сохраните и перезагрузите
sudo nginx -t
sudo systemctl reload nginx
```

## Проверка логов

Если что-то не работает, проверьте логи:

```bash
# Логи Nginx
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/pardon_error.log

# Логи приложения
pm2 logs pardon

# Логи системные
sudo journalctl -u nginx -n 50
```

## Быстрая проверка всех компонентов

```bash
# 1. Приложение запущено?
pm2 status

# 2. Приложение слушает порт 3000?
curl http://localhost:3000

# 3. Nginx работает?
sudo systemctl status nginx

# 4. Nginx проксирует на 3000?
curl -H "Host: pardon.su" http://localhost

# 5. SSL сертификат работает?
curl -I https://pardon.su
```

## Если ничего не помогло

1. Убедитесь, что файрвол не блокирует порты:
```bash
sudo ufw status
sudo ufw allow 'Nginx Full'
```

2. Проверьте, что домен правильно резолвится:
```bash
dig pardon.su +short
```

3. Проверьте активную конфигурацию Nginx:
```bash
sudo nginx -T | grep -A 30 "server_name pardon.su"
```

