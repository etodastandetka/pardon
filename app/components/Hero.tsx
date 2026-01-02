'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Logo from './Logo'
import { useLanguage } from '@/app/contexts/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [useVideo, setUseVideo] = useState(true)

  // Video files in public folder
  const videoFiles = [
    '/video1.mp4',
    '/video2.mp4',
  ]

  // Try first video, fallback to second if first fails
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const videoSrc = videoFiles[currentVideoIndex]

  useEffect(() => {
    // Check if we should use video (not on mobile)
    const checkMobile = () => {
      if (window.innerWidth < 768) {
        setUseVideo(false)
      } else {
        setUseVideo(true)
      }
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (videoRef.current && useVideo) {
      const playVideo = async () => {
        try {
          await videoRef.current?.play()
          setVideoLoaded(true)
        } catch (error) {
          console.error('Video autoplay failed:', error)
          // Try to play with user interaction
          if (currentVideoIndex < videoFiles.length - 1) {
            setCurrentVideoIndex(currentVideoIndex + 1)
          } else {
            setUseVideo(false)
          }
        }
      }
      playVideo()
    }
  }, [useVideo, currentVideoIndex, videoFiles.length])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      {useVideo && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover z-0"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onLoadedData={() => {
            setVideoLoaded(true)
            videoRef.current?.play().catch(console.error)
          }}
          onCanPlay={() => {
            videoRef.current?.play().catch(console.error)
          }}
          onError={(e) => {
            console.error('Video error:', e)
            // Try next video if current one fails
            if (currentVideoIndex < videoFiles.length - 1) {
              setVideoLoaded(false)
              setCurrentVideoIndex(currentVideoIndex + 1)
            } else {
              setUseVideo(false)
            }
          }}
          key={currentVideoIndex}
          style={{ 
            opacity: videoLoaded ? 1 : 0, 
            transition: 'opacity 1s',
            zIndex: 0
          }}
        >
          <source src={videoSrc} type="video/mp4" />
          Ваш браузер не поддерживает видео.
        </video>
      )}

      {/* Fallback gradient background for mobile or if video fails */}
      {!useVideo && (
        <div className="absolute inset-0 bg-gradient-dark" />
      )}

      {/* Dark overlay for text readability - более прозрачный чтобы видео было видно */}
      <div className="absolute inset-0 bg-gradient-to-b from-pardon-dark/50 via-pardon-dark/60 to-pardon-dark/70 z-0" />

      {/* Animated background particles/glow effect - поверх overlay */}
      <div className="absolute inset-0 overflow-hidden z-[1]">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-pardon-red/15 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pardon-rose-gold/15 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-[2] text-center px-4 w-full max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Logo />
        </motion.div>

        <motion.div
          className="mt-6 sm:mt-8 md:mt-12 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gradient mb-4 sm:mb-6">
            {t('hero.subtitle')}
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('hero.description')}
          </p>
        </motion.div>
      </div>

      {/* Scroll indicator - positioned relative to section, not content div */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-pardon-red rounded-full flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-pardon-red rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

