'use client'

export default function Logo() {
  return (
    <div className="flex items-center justify-center relative">
      {/* Multiple glow layers */}
      <div className="absolute inset-0 bg-gradient-to-r from-pardon-red/50 via-pardon-red/70 to-pardon-red/50 blur-3xl -z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-pardon-rose-gold/30 via-pardon-red/50 to-pardon-rose-gold/30 blur-2xl -z-10" />
      
      <h1
        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] font-black uppercase tracking-tight select-none"
        style={{
          fontFamily: "'Comfortaa', 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          fontWeight: 700,
          letterSpacing: '0.1em',
          background: 'linear-gradient(180deg, #FFFFFF 0%, #FFE5E5 10%, #FFB3B3 25%, #FF6B9D 40%, #FF1744 55%, #DC143C 70%, #C41E3A 85%, #DC143C 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.9)) drop-shadow(0 4px 8px rgba(220, 20, 60, 0.8)) drop-shadow(0 8px 16px rgba(220, 20, 60, 0.7)) drop-shadow(0 0 40px rgba(255, 107, 157, 0.6))',
          lineHeight: '1.1',
        }}
      >
        PARDON
      </h1>
      
      {/* Enhanced underline with glow */}
      <div className="absolute -bottom-4 sm:-bottom-5 md:-bottom-6 left-1/2 transform -translate-x-1/2 w-40 sm:w-48 md:w-56 lg:w-64 xl:w-72 h-1 sm:h-1.5 md:h-2">
        <div 
          className="h-full bg-gradient-to-r from-transparent via-pardon-red to-transparent rounded-full" 
          style={{
            boxShadow: '0 0 10px rgba(220, 20, 60, 0.7), 0 0 20px rgba(220, 20, 60, 0.5)',
          }} 
        />
      </div>
    </div>
  )
}

