/*
 * @Description: 这是***页面
 * @Date: 2021-01-20 10:31:06
 * @LastEditTime: 2021-01-28 17:44:06
 */
export let option = {
    login: '/times/auth', // 登录
    member: '/times/member-bff',
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
    OVERDUEINTEGRAL: option.isv_member + '/api-c/v1/member/overdueIntegral',
    COUPON_LIST: option.member + '/coupon/api/v1/coupon/list',//获取卡券列表
    RECEIVE_COUPON_LIST: option.member + '/coupon/api/v1/receive-coupon/list', // 领券中心
    RECEIVE_COUPON: option.member + '/coupon/api/v1/member-id/receiveCoupon',//领取卡券
    MEMBER_USE_COUPON_LIST: option.member + '/coupon/api/v1/member-use-coupon/list',// 获取会员卡券使用记录
    MEMBER_COUPON_LIST: option.member + '/coupon/api/v1/coupon-member/list', //获取会员可使用卡券列表
    INTEGRALCONVERSION: option.member + '/api/v1/integralConversion', // 邦豆兑换
    GETCUSTOMUSER: option.c_user + '/api-c/v1/customer-room/customer',//获取当前人的人房关系ID
    CAMILO_EXCHANGE_DETAIL:'/times/member-center/coupon/api/v1/assgin-member/selectCamilo',//卡密对应的优惠卷详情展示
    CAMILO_EXCHANGE:'/times/member-center/coupon/api/v1/assgin-member/exchangeCamilo',//卡密确认兑换
}
