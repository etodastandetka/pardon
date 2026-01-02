'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { useLanguage } from '@/app/contexts/LanguageContext'

export default function Navigation() {
  const { t, language, setLanguage } = useLanguage()
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: t('nav.home') },
    { href: '/owners', label: t('nav.owners') },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-pardon-dark/90 backdrop-blur-md border-b border-pardon-red/20">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <Link href="/" className="flex items-center">
            <span className="text-lg sm:text-xl md:text-2xl font-bold text-gradient">PARDON</span>
          </Link>
          
          <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-colors"
                >
                  <span className={`relative z-10 ${isActive ? 'text-pardon-red' : 'text-gray-300 hover:text-white'}`}>
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 bg-pardon-red/20 rounded-lg"
                      layoutId="activeTab"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
            
            {/* Language Switcher */}
            <div className="flex gap-1.5 sm:gap-2 ml-2 sm:ml-4">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg font-medium transition-all duration-300 text-xs sm:text-sm ${
                  language === 'en'
                    ? 'bg-pardon-red text-white shadow-glow-red'
                    : 'bg-pardon-dark-lighter text-gray-400 hover:text-white hover:bg-pardon-dark-light border border-pardon-red/30'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('ru')}
                className={`px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg font-medium transition-all duration-300 text-xs sm:text-sm ${
                  language === 'ru'
                    ? 'bg-pardon-red text-white shadow-glow-red'
                    : 'bg-pardon-dark-lighter text-gray-400 hover:text-white hover:bg-pardon-dark-light border border-pardon-red/30'
                }`}
              >
                RU
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

