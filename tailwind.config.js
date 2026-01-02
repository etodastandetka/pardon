/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'pardon-dark': {
          DEFAULT: '#0a0000',
          lighter: '#1a0000',
          light: '#2a0000',
        },
        'pardon-red': {
          DEFAULT: '#DC143C',
          dark: '#C41E3A',
          bright: '#FF1744',
          rose: '#E91E63',
        },
        'pardon-gold': {
          DEFAULT: '#D4AF37',
          rose: '#E8B4B8',
        },
      },
      backgroundImage: {
        'gradient-metallic': 'linear-gradient(135deg, #E8B4B8 0%, #DC143C 50%, #C41E3A 100%)',
        'gradient-dark': 'linear-gradient(180deg, #0a0000 0%, #1a0000 50%, #0a0000 100%)',
      },
      boxShadow: {
        'glow-red': '0 0 20px rgba(220, 20, 60, 0.5)',
        'glow-rose': '0 0 30px rgba(232, 180, 184, 0.6)',
        '3d': '0 10px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      },
    },
  },
  plugins: [],
}

