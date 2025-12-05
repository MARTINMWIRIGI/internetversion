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
        'neon-pulse': 'neon-pulse 2s ease-in-out infinite',
        'data-stream': 'data-stream 3s ease infinite',
        'node-float': 'node-float 6s ease-in-out infinite',
        'blink': 'blink 1s infinite',
        'transfer': 'transfer 1.5s linear infinite',
        'neural-pulse': 'neural-pulse 2s ease-in-out infinite',
        'slide-right': 'slide-right 2s linear infinite',
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
        'neon-pulse': {
          '0%, 100%': {
            'text-shadow': '0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #0ff, 0 0 35px #0ff, 0 0 40px #0ff, 0 0 50px #0ff, 0 0 75px #0ff'
          },
          '50%': {
            'text-shadow': '0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #0ff, 0 0 70px #0ff, 0 0 80px #0ff, 0 0 100px #0ff, 0 0 150px #0ff'
          }
        },
        'data-stream': {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' },
        },
        'node-float': {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '25%': { transform: 'translate(10px, -10px) rotate(5deg)' },
          '50%': { transform: 'translate(0, -20px) rotate(0deg)' },
          '75%': { transform: 'translate(-10px, -10px) rotate(-5deg)' },
        },
        'blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'transfer': {
          '0%': { left: '-100%' },
          '100%': { left: '100%' },
        },
        'neural-pulse': {
          '0%, 100%': { opacity: '0' },
          '50%': { opacity: '1' },
        },
        'slide-right': {
          '0%': { left: '-100%' },
          '100%': { left: '100%' },
        },
        'spin-reverse': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        }
      },
    },
  },
  plugins: [],
};