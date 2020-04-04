const StylelintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  configureWebpack: {
    plugins: [
      new StylelintPlugin({
        files: [
          'src/**/*.vue',
          'src/**/*.scss',
        ],
      }),
    ],
  },
  lintOnSave: true,
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "~@/scss/styles.scss";',
      },
    },
  },
};
