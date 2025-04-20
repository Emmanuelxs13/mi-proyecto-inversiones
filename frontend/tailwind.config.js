/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,css,html}',  // Ajusta las rutas según tu estructura
  ],
  theme: {
    extend: {
      colors: {
        primary: '#026773',         // Color principal
        'primary-darker': '#024959',
        'primary-darkest': '#012E40',
        accent: '#3CA6A6',          // Color para detalles/acentos
        'background-light': '#F2E3D5', // Fondo claro
      },
    },
  },
  plugins: [],
};
