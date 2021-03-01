// 生产环境移除console
const consoleRemovePlugins = [];
if (process.env.NODE_ENV === "production") {
  consoleRemovePlugins.push("transform-remove-console");
  consoleRemovePlugins.push({ exclude: ["error", "warn"] });
}
module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    consoleRemovePlugins,
    // vant按需引入 babel 配置
    // [
    //   "import",
    //   {
    //     libraryName: "vant",
    //     libraryDirectory: "es",
    //     style: true
    //   },
    //   "vant"
    // ]
  ]
};
