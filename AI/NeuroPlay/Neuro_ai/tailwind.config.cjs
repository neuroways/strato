/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        // NeuroQuest Farbwelt - Warm, natürlich, beruhigend
        'nq-cream': '#faf8f3',      // Hintergrund (Buchseite)
        'nq-forest': '#3d6b54',     // Primär (Waldgrün, ruhig)
        'nq-sage': '#7d9b8d',       // Sekundär (Salbeigrün)
        'nq-gold': '#d4a574',       // Akzent (Warmes Gold, Magie)
        'nq-text': '#2d2420',       // Text (Dunkles Braun)
        'nq-wood': '#8b7355',       // Holz (natürliche Elemente)
        'nq-line': '#e8dcc8',       // Trennlinien (helles Grau-Braun)
      },
      fontSize: {
        // Typografie-Scale für Kinder
        'xs': ['0.875rem', { lineHeight: '1.5' }],
        'sm': ['0.95rem', { lineHeight: '1.6' }],
        'base': ['1.125rem', { lineHeight: '1.8' }],
        'lg': ['1.25rem', { lineHeight: '1.4' }],
        'xl': ['1.75rem', { lineHeight: '1.3' }],
        '2xl': ['3rem', { lineHeight: '1.2' }],
      },
      spacing: {
        // Großzügiger Abstand für Ruhe
        'safe': '1.5rem',
        'relaxed': '2rem',
        'spacious': '3rem',
      },
      borderRadius: {
        // Warm, nicht tech
        'warm': '1.5rem',
        'cozy': '1rem',
      },
      boxShadow: {
        // Subtile Schatten
        'soft': '0 4px 12px rgba(0, 0, 0, 0.08)',
        'gentle': '0 2px 6px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        // Ruhige Animationen für Kinder
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'glow': 'glow 1.2s ease-in-out infinite',
        'breathe': 'breathe 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        slideUp: {
          'from': { 
            opacity: '0',
            transform: 'translateY(20px)',
          },
          'to': { 
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        glow: {
          '0%, 100%': { 
            opacity: '1',
            boxShadow: '0 0 10px rgba(212, 165, 116, 0.3)',
          },
          '50%': { 
            opacity: '0.8',
            boxShadow: '0 0 20px rgba(212, 165, 116, 0.6)',
          },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
        },
      },
    },
  },
  plugins: [],
};
