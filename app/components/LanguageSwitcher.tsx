'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/app/contexts/LanguageContext'

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <motion.div
      className="fixed top-20 right-6 z-50 flex gap-2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
    >
      <button
        onClick={() => setLanguage('en')}
        className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
          language === 'en'
            ? 'bg-pardon-red text-white shadow-glow-red'
            : 'bg-pardon-dark-lighter text-gray-400 hover:text-white hover:bg-pardon-dark-light border border-pardon-red/30'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('ru')}
        className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
          language === 'ru'
            ? 'bg-pardon-red text-white shadow-glow-red'
            : 'bg-pardon-dark-lighter text-gray-400 hover:text-white hover:bg-pardon-dark-light border border-pardon-red/30'
        }`}
      >
        RU
      </button>
    </motion.div>
  )
}

