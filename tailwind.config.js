/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Garante que o Tailwind analise todos os arquivos relevantes
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#00796b', // Um tom de verde/azul escuro para a marca (Ex: Teal 700)
        'brand-primary-dark': '#004d40', // Um tom mais escuro para hover/active
        'brand-secondary': '#80cbc4', // Um tom mais claro para acentos (Ex: Teal 200)
        'brand-accent': '#ffc107',   // Um amarelo para botões de destaque (Ex: Amber)
        'brand-accent-dark': '#ffa000', // Amarelo mais escuro para hover/active
        'gray-custom': { // Paleta de cinzas personalizada para consistência
          50: '#f8f9fa',
          100: '#f1f3f5',
          200: '#e9ecef',
          300: '#dee2e6',
          400: '#ced4da',
          500: '#adb5bd',
          600: '#868e96',
          700: '#495057',
          800: '#343a40',
          900: '#212529',
        },
        'success': '#28a745',
        'danger': '#dc3545',
        'warning': '#ffc107',
        'info': '#17a2b8',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"'],
      },
      borderRadius: {
        'xl': '0.75rem', // Um pouco maior que o padrão 'lg'
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'modal': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Plugin oficial para estilizar formulários mais facilmente
  ],
};
