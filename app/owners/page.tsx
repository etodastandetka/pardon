'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/app/contexts/LanguageContext'
import Navigation from '@/app/components/Navigation'
import { CrownIcon, CodeIcon, SpiderIcon, WebIcon, DurkaIcon } from '@/app/components/OwnerIcons'

const owners = [
  {
    key: 'godkm',
    gradient: 'from-yellow-500/30 via-orange-500/30 to-red-500/30',
    glowColor: 'rgba(255, 215, 0, 0.3)',
    Icon: CrownIcon,
  },
  {
    key: 'dave',
    gradient: 'from-pink-500/30 via-rose-500/30 to-red-500/30',
    glowColor: 'rgba(236, 72, 153, 0.3)',
    Icon: WebIcon,
  },
  {
    key: 'durka',
    gradient: 'from-red-500/30 via-pardon-red/30 to-red-500/30',
    glowColor: 'rgba(220, 20, 60, 0.3)',
    Icon: DurkaIcon,
  },
  {
    key: 'kotik',
    gradient: 'from-blue-500/30 via-cyan-500/30 to-teal-500/30',
    glowColor: 'rgba(59, 130, 246, 0.3)',
    Icon: CodeIcon,
  },
  {
    key: 'akashi',
    gradient: 'from-purple-500/30 via-indigo-500/30 to-purple-500/30',
    glowColor: 'rgba(147, 51, 234, 0.3)',
    Icon: SpiderIcon,
  },
]

const positions = [
  { top: '0%', left: '0%', width: '32%' },      // godkm - слева вверху
  { top: '0%', left: '34%', width: '32%' },     // dave - центр вверху
  { top: '0%', left: '68%', width: '32%' },     // durka - справа вверху
  { top: '45%', left: '0%', width: '48%' },    // kotik - слева внизу (шире)
  { top: '45%', left: '50%', width: '48%' },    // akashi - справа внизу (шире)
]

export default function OwnersPage() {
  const { t } = useLanguage()

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const renderCard = (owner: typeof owners[0], ownerData: any, IconComponent: any, index: number, isMobile: boolean = false) => {
    const position = !isMobile ? positions[index] : null
    
    return (
      <motion.div
        key={owner.key}
        variants={itemVariants}
        whileHover={{ 
          scale: isMobile ? 1.03 : 1.05,
          y: isMobile ? -8 : -10,
          z: isMobile ? 0 : 50,
        }}
        className={`group ${isMobile ? 'relative' : 'absolute'}`}
        style={!isMobile ? {
          top: position?.top,
          left: position?.left,
          width: position?.width,
        } : {}}
      >
        {/* Animated glow background */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${owner.gradient} rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
                <div className="relative bg-gradient-to-br from-pardon-dark-lighter via-pardon-dark-light to-pardon-dark-lighter border-2 border-pardon-red/40 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 hover:border-pardon-red transition-all duration-500 overflow-hidden shadow-2xl">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(220, 20, 60, 0.5) 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }} />
          </div>
          
          {/* Corner accents */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-pardon-red/10 to-transparent rounded-bl-full" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-pardon-red/10 to-transparent rounded-tr-full" />
          
          {/* Top glow line */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-pardon-red to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
          />
          
          <div className="relative z-10">
                    {/* Icon and Name */}
                    <div className="flex items-start gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6">
                      <motion.div
                        className="relative flex-shrink-0"
                        whileHover={{ 
                          scale: 1.1,
                          rotate: [0, -5, 5, 0],
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="absolute inset-0 bg-pardon-red/20 rounded-full blur-xl" />
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center bg-gradient-to-br from-pardon-dark-light to-pardon-dark-lighter rounded-xl sm:rounded-2xl border-2 border-pardon-red/50 p-2 sm:p-3 md:p-4">
                          <IconComponent className="w-full h-full text-pardon-red" style={{ filter: 'drop-shadow(0 0 10px rgba(220, 20, 60, 0.5))' }} />
                        </div>
                      </motion.div>
                      <div className="flex-1 pt-1 sm:pt-2">
                        <motion.h2
                          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black mb-1 sm:mb-2"
                          style={{
                            background: 'linear-gradient(135deg, #E8B4B8 0%, #DC143C 50%, #C41E3A 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5))',
                          }}
                        >
                          {ownerData.name}
                        </motion.h2>
                        <p className="text-pardon-red font-bold text-sm sm:text-base md:text-lg lg:text-xl">
                          {ownerData.role}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 leading-relaxed text-sm sm:text-base md:text-lg mb-4 sm:mb-6">
                      {ownerData.description}
                    </p>

            {/* Skills for KOTIK */}
            {owner.key === 'kotik' && (
              <motion.div
                className="mt-6 pt-6 border-t border-pardon-red/30"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-sm text-gray-400 mb-4 font-semibold uppercase tracking-wider">Технологии:</p>
                <div className="flex flex-wrap gap-3">
                  {['C++', 'Python', 'JavaScript', 'TypeScript', 'React', 'Next.js'].map((tech, techIndex) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + techIndex * 0.1 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="px-4 py-2 bg-gradient-to-r from-pardon-red/20 to-pardon-red/10 text-pardon-red rounded-lg text-sm font-bold border border-pardon-red/40 shadow-lg hover:shadow-glow-red transition-all"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Bottom accent line */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-pardon-red to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <main className="min-h-screen bg-pardon-dark pt-16">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-pardon-dark via-pardon-dark-lighter to-pardon-dark" />
        
        {/* Animated background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-pardon-red/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pardon-rose-gold/10 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        <motion.div
          className="relative z-10 max-w-6xl mx-auto text-center px-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl font-black mb-4 sm:mb-6 relative"
            style={{
              background: 'linear-gradient(135deg, #E8B4B8 0%, #DC143C 25%, #FF1744 50%, #C41E3A 75%, #DC143C 100%)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.6)) drop-shadow(0 8px 16px rgba(220, 20, 60, 0.5)) drop-shadow(0 0 40px rgba(220, 20, 60, 0.4))',
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
            {t('owners.title')}
          </motion.h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 font-medium">
            {t('owners.subtitle')}
          </p>
        </motion.div>
      </section>

      {/* Owners Grid */}
      <section className="py-12 sm:py-16 md:py-20 px-4">
        {/* Mobile: обычная сетка */}
        <motion.div
          className="max-w-7xl mx-auto grid grid-cols-1 md:hidden gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {owners.map((owner, index) => {
            const ownerData = {
              name: t(`owners.${owner.key}.name`),
              role: t(`owners.${owner.key}.role`),
              description: t(`owners.${owner.key}.description`),
            }
            const IconComponent = owner.Icon
            return renderCard(owner, ownerData, IconComponent, index, true)
          })}
        </motion.div>

        {/* Desktop: свободное расположение */}
        <motion.div
          className="max-w-7xl mx-auto hidden md:block relative"
          style={{ minHeight: '1200px' }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {owners.map((owner, index) => {
            const ownerData = {
              name: t(`owners.${owner.key}.name`),
              role: t(`owners.${owner.key}.role`),
              description: t(`owners.${owner.key}.description`),
            }
            const IconComponent = owner.Icon
            return renderCard(owner, ownerData, IconComponent, index, false)
          })}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 px-4 border-t border-pardon-red/20 mt-20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400 text-sm">
            {t('footer.text')}
          </p>
        </div>
      </footer>
    </main>
  )
}
