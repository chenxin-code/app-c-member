module.exports = {
  plugins: [
    require('postcss-pxtorem')({
      rootValue: 50,
      minPixelValue: 2,
      propWhiteList: []
    })
  ]
}