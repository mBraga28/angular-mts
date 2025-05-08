require('postcss');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,css}",
  ],
  darkMode:'class',
  theme: {
    extend: {
      colors: {
        root: {
          "soft-cyan":"#A8DADC",
          "light-blue": "#B6E0E2",
          "light-cyan": "#CDEAE5",
          "tyffany-blue":"#7CC7CB",
          "berkeley-blue": "#1D3557",
          "dark-moderate-blue": "#2e548a",
          "silver-lake-blue": "#5785c7",
          "vista-blue": "#759CD1",
          "white": "#ffffff",
          "gray": "rgba(88, 89, 91, 1)",
          "light-gray": "rgba(232, 232, 232, 1)",
          "light-gray-2": "rgba(247, 247, 247)",
          "dark-mint-green": "#1DC244",
          "venetian-red": "#C9001E"
        },
        primary: {"50":"#eff6ff","100":"#dbeafe","200":"#bfdbfe","300":"#93c5fd","400":"#60a5fa","500":"#3b82f6","600":"#2563eb","700":"#1d4ed8","800":"#1e40af","900":"#1e3a8a","950":"#172554"},
        secondary: {"50":"#f3f4f6","100":"#e5e7eb","200":"#d1d5db","300":"#9ca3af","400":"#71717a","500":"#52525b","600":"#404149","700":"#323244","800":"#1f2029","900":"#181b23","950":"#0c0d0f"},
      }
    },
    fontFamily: {
      'body': [
        'Inter',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'system-ui',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji'
      ],
      'sans': [
        'Inter',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'system-ui',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji'
      ]
    }
  },
  plugins: [],
}

