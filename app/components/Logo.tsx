'use client'

export default function Logo() {
  return (
    <div className="flex items-center justify-center relative">
      {/* Multiple glow layers */}
      <div className="absolute inset-0 bg-gradient-to-r from-pardon-red/50 via-pardon-red/70 to-pardon-red/50 blur-3xl -z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-pardon-rose-gold/30 via-pardon-red/50 to-pardon-rose-gold/30 blur-2xl -z-10" />
      
      <h1
        className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[11rem] font-black uppercase tracking-tight"
        style={{
          fontFamily: "'Comfortaa', 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          fontWeight: 700,
          letterSpacing: '0.08em',
          background: 'linear-gradient(180deg, #FFE5E5 0%, #FFB3B3 15%, #FF6B9D 30%, #FF1744 45%, #DC143C 60%, #C41E3A 75%, #DC143C 90%, #FF1744 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.9)) drop-shadow(0 4px 8px rgba(220, 20, 60, 0.8)) drop-shadow(0 8px 16px rgba(220, 20, 60, 0.7)) drop-shadow(0 0 40px rgba(255, 107, 157, 0.6)) drop-shadow(0 0 80px rgba(220, 20, 60, 0.5))',
          textShadow: '0 0 40px rgba(255, 107, 157, 0.8), 0 0 80px rgba(220, 20, 60, 0.6), 0 0 120px rgba(220, 20, 60, 0.4)',
          lineHeight: '1.1',
        }}
      >
        PARDON
      </h1>
      
      {/* Enhanced underline with glow */}
      <div className="absolute -bottom-5 sm:-bottom-6 left-1/2 transform -translate-x-1/2 w-48 sm:w-56 md:w-64 lg:w-72 h-1.5 sm:h-2">
        <div 
          className="h-full bg-gradient-to-r from-transparent via-pardon-red to-transparent rounded-full" 
          style={{
            boxShadow: '0 0 15px rgba(220, 20, 60, 0.8), 0 0 30px rgba(220, 20, 60, 0.6)',
          }} 
        />
        <div 
          className="absolute inset-0 h-full bg-gradient-to-r from-transparent via-pardon-rose-gold to-transparent rounded-full opacity-60"
          style={{
            boxShadow: '0 0 10px rgba(232, 180, 184, 0.5)',
          }}
        />
      </div>
    </div>
  )
}

