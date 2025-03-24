export default {
  content: ['./src/**/*.{html,js}'], // Adjust your content path accordingly
  theme: {
    extend: {
      colors: {
        'raw-sienna': {
          '50': '#fbf6ef',
          '100': '#f4e4d1',
          '200': '#e9c69e',
          '300': '#dda56c',
          '400': '#d48645',
          '500': '#cc6b34',
          '600': '#b4502b',
          '700': '#963927',
          '800': '#7b2f25',
          '900': '#662821',
          '950': '#39130f',
        },

      },
      keyframes: {
        bounceUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '50%': { transform: 'translateY(-10%)', opacity: '1' },
          '70%': { transform: 'translateY(5%)', opacity: '1' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        bounceUp: 'bounceUp 1s ease-out',
      },
      textColor: {
        'custom-black': '#000', // Custom black text color
      }
    },
  },
  plugins: [],
}
