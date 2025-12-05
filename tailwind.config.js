/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'spin-slow-reverse': 'spin-reverse 20s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glitch': 'glitch 0.3s linear infinite',
        'scanline': 'scanline 10s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'neon-pulse': 'neon-pulse 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        'neon-pulse': {
          '0%, 100%': {
            'text-shadow': '0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #0ff, 0 0 35px #0ff, 0 0 40px #0ff, 0 0 50px #0ff, 0 0 75px #0ff'
          },
          '50%': {
            'text-shadow': '0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #0ff, 0 0 70px #0ff, 0 0 80px #0ff, 0 0 100px #0ff, 0 0 150px #0ff'
          }
        },
        'spin-reverse': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        }
      },
      colors: {
        cyber: {
          cyan: '#00ffff',
          purple: '#ff00ff',
          pink: '#ff00cc',
          blue: '#0066ff',
          green: '#00ff00',
          yellow: '#ffff00',
          orange: '#ff6600',
        }
      },
      backgroundImage: {
        'cyber-grid': "linear-gradient(90deg, transparent 24px, transparent 24px), linear-gradient(transparent 24px, transparent 24px)",
        'neon-gradient': 'linear-gradient(45deg, #00ffff, #ff00ff, #ff00cc, #0066ff)',
        'cyber-gradient': 'linear-gradient(135deg, #000 20%, transparent 20%, transparent 80%, #000 80%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'neon': '0 0 5px #0ff, 0 0 10px #0ff, 0 0 15px #0ff',
        'neon-purple': '0 0 5px #f0f, 0 0 10px #f0f, 0 0 15px #f0f',
        'neon-pink': '0 0 5px #ff00cc, 0 0 10px #ff00cc, 0 0 15px #ff00cc',
        'glow': '0 0 20px rgba(0, 255, 255, 0.5), 0 0 40px rgba(0, 255, 255, 0.3), 0 0 60px rgba(0, 255, 255, 0.1)',
      },
    },
  },
  plugins: [],
};