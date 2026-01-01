/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      'pastel',
      'retro',
      'coffe',
      'orest',
      'cyberpunk',
      'synthwave',
      'luxury',
      'autumn',
      'valentine',
      'aqua',
      'busineess',
      'night',
      'dracula',
    ],
  },
}
