module.exports = {
  // filenameHashing: false,
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "./src/assets/scss/variable.scss";`,
        // additionalData: `@import "~@/assets/scss/variables.scss";`,
      },
    },
  }
};
