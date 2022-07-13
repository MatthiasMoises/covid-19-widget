/* eslint-disable */

const prefixer = require('postcss-prefix-selector');

module.exports = {
  productionSourceMap: false,
  filenameHashing: false,
  chainWebpack: config => {
    config.optimization.delete('splitChunks')
  },
  css: {
    extract: false,
    loaderOptions: {
      postcss: {
        plugins: [
          prefixer({
            prefix: '.covid19-wrapper',
            transform: function (prefix, selector, prefixedSelector) {
              if (selector === '.container') {
                return `${prefix} .container`
              } if (selector === '.row') {
                return `${prefix} .row`
              } if (selector === '.col') {
                return `${prefix} .col`
              } if (selector.includes('.col-')) {
                return `${prefix} ${selector}`
              } else {
                return selector
              }
            }
          })
        ]
      },
      sass: {
        prependData: `@import "@/assets/scss/_custom_variables.sass"` // empty file
      },
      scss: {
        prependData: `@import "@/assets/scss/_custom_variables.scss";`
      }
    }
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/' : (process.env.NODE_ENV === 'staging' ? '/' : '/'),
  pluginOptions: {
    i18n: {
      locale: 'de',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  },
  transpileDependencies: [
    'vuetify'
  ]
}
