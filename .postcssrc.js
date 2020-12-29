module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: 50, //换算基数,默认100,根标签的字体规定为1rem为50px
      minPixelValue: 2, //设置要替换的最小像素值(2px会被转rem) 默认 0
      propWhiteList: [] //默认值是一个空数组，这意味着禁用白名单并启用所有属性
    }
  }
};