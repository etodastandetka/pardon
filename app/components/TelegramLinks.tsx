'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/app/contexts/LanguageContext'
import { ChannelIcon, ChatIcon, BotIcon } from './icons'

const telegramLinks = {
  channel: 'https://t.me/+e0kIzZ7AUQY3ZDBi',
  chat: 'https://t.me/+3fVc2XuHHdwzZTAy',
  bot: 'https://t.me/pardondox_bot',
}

export default function TelegramLinks() {
  const { t } = useLanguage()

  const links = [
    { key: 'channel', url: telegramLinks.channel, Icon: ChannelIcon },
    { key: 'chat', url: telegramLinks.chat, Icon: ChatIcon },
    { key: 'bot', url: telegramLinks.bot, Icon: BotIcon },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto px-4"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      <motion.h2
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-center mb-8 sm:mb-10 md:mb-12 relative inline-block px-2"
        variants={itemVariants}
        style={{
          background: 'linear-gradient(135deg, #E8B4B8 0%, #DC143C 25%, #FF1744 50%, #C41E3A 75%, #DC143C 100%)',
          backgroundSize: '200% 200%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.6)) drop-shadow(0 8px 16px rgba(220, 20, 60, 0.5)) drop-shadow(0 0 30px rgba(220, 20, 60, 0.4))',
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {t('links.title')}
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {links.map((link, index) => {
          const IconComponent = link.Icon
          return (
            <motion.a
              key={link.key}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                y: -5,
                boxShadow: '0 10px 40px rgba(220, 20, 60, 0.4)'
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative bg-gradient-to-br from-pardon-dark-lighter via-pardon-dark-light to-pardon-dark-lighter border-2 border-pardon-red/40 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 hover:border-pardon-red transition-all duration-500 overflow-hidden shadow-xl hover:shadow-2xl"
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-br from-pardon-red/10 via-pardon-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Pattern overlay */}
              <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(220, 20, 60, 0.5) 1px, transparent 0)',
                backgroundSize: '30px 30px',
              }} />
              
              {/* Corner accents */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-pardon-red/10 to-transparent rounded-bl-full" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-pardon-red/10 to-transparent rounded-tr-full" />
              
              <div className="relative z-10 text-center">
                <motion.div
                  className="flex justify-center mb-4 sm:mb-6"
                  whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-pardon-red/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500" />
                    <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center bg-gradient-to-br from-pardon-dark-light to-pardon-dark-lighter rounded-lg sm:rounded-xl border-2 border-pardon-red/50 p-2 sm:p-3">
                      <div style={{ filter: 'drop-shadow(0 0 10px rgba(220, 20, 60, 0.6))' }}>
                        <IconComponent className="w-full h-full text-pardon-red" />
                      </div>
                    </div>
                  </div>
                </motion.div>
                <h3
                  className="text-lg sm:text-xl md:text-2xl font-black mb-2 sm:mb-3"
                  style={{
                    background: 'linear-gradient(135deg, #E8B4B8 0%, #DC143C 50%, #C41E3A 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5))',
                  }}
                >
                  {t(`links.${link.key}`)}
                </h3>
                <div className="text-xs sm:text-sm text-gray-400 group-hover:text-pardon-rose-gold transition-colors font-medium">
                  {link.url.replace('https://', '')}
                </div>
              </div>
              
              {/* Top and bottom accent lines */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-pardon-red to-transparent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              />
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-pardon-red to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
            </motion.a>
          )
        })}
      </div>
    </motion.div>
  )
}

