module.exports = {
  plugins: [
    // 转rem
    require("postcss-pxtorem")({
      rootValue: 50,
      minPixelValue: 2,
      propWhiteList: []
    }),
    // css自动添加前缀
    require("autoprefixer")({
      overrideBrowserslist: [
        "ie >= 8", // 兼容IE7以上浏览器
        "Firefox >= 3.5", // 兼容火狐版本号大于3.5浏览器
        "chrome  >= 35", // 兼容谷歌版本号大于35浏览器,
        "opera >= 11.5", // 兼容欧朋版本号大于11.5浏览器,
        "chrome  >= 36" // 如果需要适配的浏览器完全兼容则不会添加前缀
      ]
    })
  ]
};
