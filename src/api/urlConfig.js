export let option = {
  login: '/times/auth', // 登录
};

// 请求地址
export default {
  LOGIN: option.login + '/oauth/token', // 登录
}
