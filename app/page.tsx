'use client'

import { motion } from 'framer-motion'
import Hero from './components/Hero'
import TelegramLinks from './components/TelegramLinks'
import Navigation from './components/Navigation'
import { useLanguage } from './contexts/LanguageContext'

export default function Home() {
  const { t } = useLanguage()

  return (
    <main className="min-h-screen bg-pardon-dark">
      <Navigation />
      
      <Hero />

      {/* Info Section */}
      <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 px-4 overflow-hidden">
        {/* Animated background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-pardon-red/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pardon-rose-gold/5 rounded-full blur-3xl"
            animate={{
              scale: [1.3, 1, 1.3],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
        
        <motion.div
          className="relative z-10 max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 sm:mb-8 relative inline-block px-2"
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
            {t('info.title')}
          </motion.h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto px-2">
            {t('info.description')}
          </p>
        </motion.div>
      </section>

      {/* Telegram Links Section */}
      <section className="relative py-20 md:py-32 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-pardon-dark via-pardon-dark-lighter to-pardon-dark" />
        <TelegramLinks />
      </section>

      {/* Footer */}
      <footer className="relative py-8 px-4 border-t border-pardon-red/20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400 text-sm">
            {t('footer.text')}
          </p>
        </div>
      </footer>
    </main>
  )
}

