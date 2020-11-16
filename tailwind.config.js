const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  experimental: {
    applyComplexClasses: true,
    extendedSpacingScale: true,
    extendedFontSizeScale: true,
  },
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  corePlugins: {
    container: false
  },
  purge: {
    layers: ['utilities'],
    content: [
      './components/**/*.js',
      './pages/**/*.js',
    ],
    options: {
      defaultExtractor: content => content.match(/[\w-/.:]+(?<!:)/g) || []
    }
  },
  theme: {
    extend: {
      spacing: {
        '2px': '2px',
        '6px': '6px',
        '44': '10.5rem',
        '80': '20rem',
        '88': '22rem',
        '96': '24rem',
        '112': '28rem',
        '128': '32rem'
      },
      fontFamily: {
      },
      boxShadow: {
        'soft-inset': 'inset 0 0px 1px 2px rgba(0, 0, 0, 0.25)'
      },
      backgroundImage: {
      },
    },
  },
  variants: {
    borderWidth: ['responsive', 'hover'],
    padding: ['responsive', 'hover']
  },
  plugins: [
    require('@tailwindcss/ui'),
  ]
}
