module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: '#FFD66E',
          peach: '#FFB59A',
          blue: '#5CC8FF',
          purple: '#B79CFF'
        }
      }
    }
  },
  corePlugins: {
    preflight: false
  }
}
