'use client'

import { useEffect } from 'react'

export default function IPTracker() {
  useEffect(() => {
    // Отправляем IP при загрузке страницы
    const trackIP = async () => {
      try {
        await fetch('/api/track', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
      } catch (error) {
        // Тихая ошибка, не показываем пользователю
        console.error('Failed to track IP:', error)
      }
    }

    // Небольшая задержка для получения правильных заголовков
    setTimeout(trackIP, 1000)
  }, [])

  return null // Компонент не рендерит ничего видимого
}

