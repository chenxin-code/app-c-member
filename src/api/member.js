/*
 * @Description: 这是***页面
 * @Date: 2021-01-20 10:31:06
 * @LastEditTime: 2021-01-27 16:25:37
 */
import { fetchApi } from '@/utils/ajax'
import URL from './urlConfig'

export const getPrepay = data => fetchApi(URL.PREPAY, data, "GET");
export const getUserInfo = data => fetchApi(URL.GET_USER_INFO, data, 'GET'); //查询用户信息
export const memberDetailByPhone = data => fetchApi(URL.MEMBERDETAILBYPHONE, data, 'get');
export const memberDetailByMemberID = data => fetchApi(URL.DETAILBYMEMBERID, data, 'GET');
export const integralRecord = data => fetchApi(URL.INTEGRALRECORD, data, 'get'); //查询获取未领取的积分
export const integralRecordReceive = data => fetchApi(URL.INTEGRALRECORDRECEIVE, data, 'POST'); //根据手机号获取积分
export const integralRecordReceiveAll = data => fetchApi(URL.INTEGRALRECORDRECEIVEALL, data, 'POST') //根据手机号一键获取全部积分
export const getSignTasklistUsingget = data => fetchApi(URL.GETSIGNTASKLISTUSINGGET, data, 'GET') //获取签到任务
export const getMemberGrownLogListUsingGET = data => fetchApi(URL.GETMEMBERGROWNLOGLISTUSINGGET, data, "GET") //获取日志
export const getMyTaskListByMember = data => fetchApi(URL.GETMYTASKLISTBYMEMBER, data, "GET") //通过会员ID获取我的任务
export const collectUsingPOST = data => fetchApi(URL.COLLECTUSINGPOST, data, "POST") //用户签到
export const overdueIntegral = data => fetchApi(URL.OVERDUEINTEGRAL, data, "GET") //获取即将过期的时间
export const queryCouponList = data => fetchApi(URL.COUPON_LIST, data, "GET") //获取卡券列表
export const queryReceiveCouponList = data => fetchApi(URL.RECEIVE_COUPON_LIST, data, "GET") //领券中心
export const getReceiveCoupon = data => fetchApi(URL.RECEIVE_COUPON, data, "POST") //领取领券
export const queryMemberUseCouponList = data => fetchApi(URL.MEMBER_USE_COUPON_LIST, data, "GET") //获取会员卡券使用记录
export const queryMemberCouponList = data => fetchApi(URL.MEMBER_COUPON_LIST, data, "GET") //获取会员卡券使用记录
export const integralConversion = data => fetchApi(URL.INTEGRALCONVERSION, data, "POST") //获取会员卡券使用记录
export const getCamiloExchangeDetail = data => fetchApi(URL.CAMILO_EXCHANGE_DETAIL, data, "GET") //获取会员卡券使用记录
export const confirmCamiloExchange = data => fetchApi(URL.CAMILO_EXCHANGE, data, "POST") //兑换优惠券

export const getUserMaterual = data => fetchApi(URL.GET_USE_MATERUAL, data, "GET") //使用实物券

