module.exports = {
  transpileDependencies: [
    'vuetify',
  ],
  devServer: {
    proxy: 'https://us-central1-streak-stat.cloudfunctions.net/',
  },
}
