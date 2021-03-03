/*
 * @Description: 这是***页面
 * @Date: 2021-01-20 10:29:28
 * @LastEditTime: 2021-01-31 10:06:20
 */
const getters = {
  token: state => state.user.token,
  devServer: state => state.user.devServer,
  isDebugMode: state => state.user.isDebugMode
};
export default getters;
