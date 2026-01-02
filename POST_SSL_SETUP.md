# Инструкция после получения SSL сертификата

## ✅ SSL сертификат успешно получен!

Сертификат установлен и сохранен в:
- Certificate: `/etc/letsencrypt/live/pardon.su/fullchain.pem`
- Key: `/etc/letsencrypt/live/pardon.su/privkey.pem`
- Срок действия: до 2026-04-02 (автоматически обновляется)

## Проверка работы сайта

### 1. Проверьте, что сайт доступен по HTTPS:

```bash
curl -I https://pardon.su
```

Должен вернуть статус `200 OK` или `301/302` редирект.

### 2. Проверьте в браузере:

Откройте `https://pardon.su` - должен открыться сайт с зеленым замочком (HTTPS).

### 3. Проверьте конфигурацию Nginx:

```bash
# Проверьте синтаксис
sudo nginx -t

# Посмотрите активную конфигурацию
sudo nginx -T | grep -A 20 "server_name pardon.su"

# Перезагрузите Nginx (если нужно)
sudo systemctl reload nginx
```

## Если Certbot использовал default конфигурацию

Если Certbot развернул сертификат в `/etc/nginx/sites-enabled/default`, а вы хотите использовать кастомную конфигурацию:

### Вариант 1: Обновить кастомную конфигурацию

1. Убедитесь, что в вашем `nginx.conf` указаны правильные пути к сертификатам:
```nginx
ssl_certificate /etc/letsencrypt/live/pardon.su/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/pardon.su/privkey.pem;
```

2. Скопируйте конфигурацию:
```bash
sudo cp nginx.conf /etc/nginx/sites-available/pardon
sudo ln -sf /etc/nginx/sites-available/pardon /etc/nginx/sites-enabled/pardon
sudo rm /etc/nginx/sites-enabled/default  # если не нужен
```

3. Проверьте и перезагрузите:
```bash
sudo nginx -t
sudo systemctl reload nginx
```

### Вариант 2: Оставить default конфигурацию

Если Certbot уже настроил `/etc/nginx/sites-enabled/default` и все работает - можно оставить как есть.

## Проверка автоматического обновления сертификата

Certbot автоматически настроил обновление сертификата. Проверьте:

```bash
# Проверка автообновления
sudo certbot renew --dry-run

# Посмотреть задачи обновления
systemctl list-timers | grep certbot
```

## Полезные команды

```bash
# Статус Nginx
sudo systemctl status nginx

# Логи Nginx
sudo tail -f /var/log/nginx/pardon_error.log
sudo tail -f /var/log/nginx/pardon_access.log

# Проверка SSL сертификата
openssl s_client -connect pardon.su:443 -servername pardon.su < /dev/null 2>/dev/null | openssl x509 -noout -dates

# Тест скорости SSL
curl -w "@-" -o /dev/null -s https://pardon.su <<'EOF'
     time_namelookup:  %{time_namelookup}\n
        time_connect:  %{time_connect}\n
     time_appconnect:  %{time_appconnect}\n
    time_pretransfer:  %{time_pretransfer}\n
       time_redirect:  %{time_redirect}\n
  time_starttransfer:  %{time_starttransfer}\n
                     ----------\n
          time_total:  %{time_total}\n
EOF
```

## Следующие шаги

1. ✅ SSL сертификат получен
2. ✅ HTTPS включен
3. Проверьте работу сайта в браузере
4. Убедитесь, что PM2 запущен и приложение работает на порту 3000
5. Проверьте, что Nginx проксирует запросы на Next.js приложение

## Если что-то не работает

1. Проверьте, что приложение запущено:
```bash
pm2 status
pm2 logs pardon
```

2. Проверьте, что Nginx слушает правильные порты:
```bash
sudo netstat -tlnp | grep nginx
```

3. Проверьте файрвол:
```bash
sudo ufw status
sudo ufw allow 'Nginx Full'
```

4. Проверьте логи:
```bash
sudo journalctl -u nginx -n 50
```

