# Исправление конфликта конфигурации Nginx

## Проблема
В логах Nginx видны предупреждения:
```
conflicting server name "pardon.su" on 0.0.0.0:80, ignored
conflicting server name "pardon.su" on 0.0.0.0:443, ignored
```

Это означает, что домен `pardon.su` настроен в нескольких конфигурационных файлах одновременно. Nginx игнорирует дублирующиеся конфигурации, что может привести к использованию неправильной конфигурации.

## Решение

### Шаг 1: Найдите все конфигурации с `pardon.su`

```bash
# Найдите все файлы, где упоминается pardon.su
sudo grep -r "pardon.su" /etc/nginx/sites-enabled/
sudo grep -r "pardon.su" /etc/nginx/sites-available/
```

### Шаг 2: Проверьте активные конфигурации

```bash
# Посмотрите все активные конфигурации
ls -la /etc/nginx/sites-enabled/

# Должны увидеть что-то вроде:
# default -> /etc/nginx/sites-available/default
# pardon -> /etc/nginx/sites-available/pardon
```

### Шаг 3: Удалите дублирующиеся конфигурации

**Вариант A: Если Certbot настроил default, а вы хотите использовать кастомную:**

```bash
# Удалите дефолтную конфигурацию (или переименуйте)
sudo rm /etc/nginx/sites-enabled/default

# Или переименуйте для резервной копии
sudo mv /etc/nginx/sites-enabled/default /etc/nginx/sites-enabled/default.bak

# Убедитесь, что ваша конфигурация активна
sudo ln -sf /etc/nginx/sites-available/pardon /etc/nginx/sites-enabled/pardon
```

**Вариант B: Если хотите использовать default (который настроил Certbot):**

```bash
# Удалите кастомную конфигурацию
sudo rm /etc/nginx/sites-enabled/pardon

# Отредактируйте default, чтобы добавить проксирование
sudo nano /etc/nginx/sites-enabled/default
```

### Шаг 4: Проверьте содержимое конфигурации

```bash
# Посмотрите активную конфигурацию для pardon.su
sudo nginx -T | grep -A 50 "server_name pardon.su"
```

Должен быть только ОДИН блок `server` с `server_name pardon.su` для каждого порта (80 и 443).

### Шаг 5: Проверьте синтаксис и перезагрузите

```bash
# Проверьте синтаксис
sudo nginx -t

# Если есть ошибки, исправьте их
# Если все ок, перезагрузите
sudo systemctl reload nginx

# Проверьте логи - предупреждения должны исчезнуть
sudo tail -f /var/log/nginx/error.log
```

### Шаг 6: Проверьте, что конфликт устранен

```bash
# Проверьте статус
sudo systemctl status nginx

# Должны увидеть "active (running)" без предупреждений о конфликтах
```

## Полная очистка и настройка с нуля

Если ничего не помогает, выполните полную очистку:

```bash
# 1. Остановите Nginx
sudo systemctl stop nginx

# 2. Удалите все активные конфигурации
sudo rm /etc/nginx/sites-enabled/*

# 3. Скопируйте вашу конфигурацию
cd /var/www/pardon
sudo cp nginx.conf /etc/nginx/sites-available/pardon

# 4. Активируйте конфигурацию
sudo ln -s /etc/nginx/sites-available/pardon /etc/nginx/sites-enabled/pardon

# 5. Проверьте синтаксис
sudo nginx -t

# 6. Запустите Nginx
sudo systemctl start nginx

# 7. Проверьте статус
sudo systemctl status nginx
```

## Проверка правильной конфигурации

После исправления проверьте:

```bash
# 1. Нет конфликтов в логах
sudo journalctl -u nginx -n 20 | grep -i conflict
# Должно быть пусто

# 2. Конфигурация правильная
sudo nginx -T | grep -A 30 "server_name pardon.su"
# Должен быть только один блок для порта 80 и один для 443

# 3. Сайт работает
curl -I https://pardon.su
# Должен вернуть статус 200 или 301/302, не дефолтную страницу
```

## Важно

После исправления конфликта:
1. Убедитесь, что приложение запущено: `pm2 status`
2. Проверьте, что Nginx проксирует на порт 3000
3. Проверьте работу сайта в браузере

