/*
 * @Description: 这是***页面
 * @Date: 2021-01-20 10:29:28
 * @LastEditTime: 2021-01-31 16:12:26
 */
const user = {
  state: {
    //存储定义的变量
    token: '',
    isDebugMode: process.env.NODE_ENV === 'development' //写死会员ID为 true || 原生localStorage获取会员ID为 false
  },
  mutations: {
    //更改state里面的值定义的一些方法
    setToken(state, token) {
      state.token = token;
    }
  },
  action: {
    //提交mutations
  }
};

export default user;
