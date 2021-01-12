// 生产环境移除console
const consoleRemovePlugins = [];
if (process.env.NODE_ENV === "production") {
  const tempArr = [];
  const tempObj = { exclude: ["error", "warn"] };
  tempArr.push("transform-remove-console");
  tempArr.push(tempObj);
  consoleRemovePlugins.push(tempArr);
}

module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: consoleRemovePlugins
  // plugins: [
  //   ['import', {
  //     libraryName: 'vant',
  //     libraryDirectory: 'es',
  //     style: true
  //   }, 'vant']
  // ]
};
