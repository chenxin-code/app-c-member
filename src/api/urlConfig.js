export let option = {
    login: '/times/auth', // 登录
    memberCenter: '/times/member-center/member',
    isv_member: '/times/member-isv-bff/member',
    isv_integralRecord: '/times/member-isv-bff/integral-record',
    isv_task: '/times/member-isv-bff/task',
    c_user: '/times/c-user-center/user', // C端用户

};

// 请求地址
export default {
    LOGIN: option.login + '/oauth/token', // 登录
    GET_USER_INFO: option.c_user + '/api-c/v1/user/query', //获取用户基本信息
    MEMBERDETAILBYPHONE: option.isv_member + '/api/v1/member/detailByPhone',
    INTEGRALRECORD: option.isv_member + '/api/v1/member/integralRecord/list',
    INTEGRALRECORDRECEIVE: option.isv_integralRecord + '/api/v1/integral-record/receive/phone',
    INTEGRALRECORDRECEIVEALL: option.isv_integralRecord + '/api/v1/integral-record/receive/all',
    GETSIGNTASKLISTUSINGGET: option.isv_task + '/api/v1/sign/task/list',
    GETMEMBERGROWNLOGLISTUSINGGET: option.isv_member + '/api/v1/member/grown_log/list'
}