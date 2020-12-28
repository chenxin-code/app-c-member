export let option = {
    login: '/times/auth', // 登录
    memberCenter: '/times/member-bff/member',
    isv_member: '/times/member-bff/member',
    isv_member_task: '/times/member-bff/member-task/',
    isv_integralRecord: '/times/member-bff/integral-record',
    isv_task: '/times/member-bff/task',
    isv_user_behaviour: '/times/member-bff/user-behaviour/',
    c_user: '/times/c-user-center/user', // C端用户
};

// 请求地址
export default {
    LOGIN: option.login + '/oauth/token', // 登录
    GET_USER_INFO: option.c_user + '/api-c/v1/user/query', //获取用户基本信息
    MEMBERDETAILBYPHONE: option.isv_member + '/api-c/v1/member/detailByPhone',
    DETAILBYMEMBERID: option.memberCenter + '/api-c/v1/member/detailByMemberId',
    INTEGRALRECORD: option.isv_member + '/api-c/v1/member/integralRecord/list',
    INTEGRALRECORDRECEIVE: option.isv_integralRecord + '/api-c/v1/integral-record/receive',
    INTEGRALRECORDRECEIVEALL: option.isv_integralRecord + '/api-c/v1/integral-record/receive/all',
    GETSIGNTASKLISTUSINGGET: option.isv_task + '/api-c/v1/sign/task/list',
    GETMEMBERGROWNLOGLISTUSINGGET: option.isv_member + '/api-c/v1/member/grown_log/list',
    GETMYTASKLISTBYMEMBER: option.isv_member_task + '/api-c/v1/task/getListByMember',
    COLLECTUSINGPOST: option.isv_user_behaviour + '/api-c/v1/user-behaviour/collect',
    OVERDUEINTEGRAL: option.isv_member + '/api-c/v1/member/overdueIntegral'

}
