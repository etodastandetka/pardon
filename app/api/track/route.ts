import { NextRequest, NextResponse } from 'next/server'

const TELEGRAM_BOT_TOKEN = '8525869480:AAEeO_SzEOaD6OcBhxwEvweVgug3U_ToZ2g'
const TELEGRAM_CHAT_ID = '-5005995736'

async function sendToTelegram(ip: string, userAgent: string, url: string) {
  try {
    const message = `🔴 Новый посетитель Pardon\n\n` +
      `📍 IP: ${ip}\n` +
      `🌐 URL: ${url}\n` +
      `💻 User-Agent: ${userAgent}\n` +
      `⏰ Время: ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}`

    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      }),
    })

    if (!response.ok) {
      console.error('Failed to send message to Telegram:', await response.text())
    }
  } catch (error) {
    console.error('Error sending to Telegram:', error)
  }
}

function getClientIP(request: NextRequest): string {
  // Проверяем различные заголовки для получения реального IP
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const cfConnectingIP = request.headers.get('cf-connecting-ip') // Cloudflare
  
  if (forwarded) {
    // x-forwarded-for может содержать несколько IP, берем первый
    return forwarded.split(',')[0].trim()
  }
  
  if (realIP) {
    return realIP
  }
  
  if (cfConnectingIP) {
    return cfConnectingIP
  }
  
  // Fallback на remote address
  return request.ip || 'Unknown'
}

export async function GET(request: NextRequest) {
  try {
    const ip = getClientIP(request)
    const userAgent = request.headers.get('user-agent') || 'Unknown'
    const url = request.headers.get('referer') || request.nextUrl.href

    // Отправляем в Telegram асинхронно (не ждем ответа)
    sendToTelegram(ip, userAgent, url).catch(console.error)

    // Возвращаем успешный ответ
    return NextResponse.json({ 
      success: true,
      ip: ip 
    }, { status: 200 })
  } catch (error) {
    console.error('Error tracking IP:', error)
    return NextResponse.json({ 
      success: false,
      error: 'Failed to track' 
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIP(request)
    const userAgent = request.headers.get('user-agent') || 'Unknown'
    const url = request.headers.get('referer') || request.nextUrl.href

    // Отправляем в Telegram асинхронно (не ждем ответа)
    sendToTelegram(ip, userAgent, url).catch(console.error)

    // Возвращаем успешный ответ
    return NextResponse.json({ 
      success: true,
      ip: ip 
    }, { status: 200 })
  } catch (error) {
    console.error('Error tracking IP:', error)
    return NextResponse.json({ 
      success: false,
      error: 'Failed to track' 
    }, { status: 500 })
  }
}

