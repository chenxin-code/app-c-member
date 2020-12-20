import { fetchApi } from '@/utils/ajax'
import URL from './urlConfig'

export const getPrepay = data => fetchApi(URL.PREPAY, data, "GET");
export const getUserInfo = data => fetchApi(URL.GET_USER_INFO, data, 'GET'); //查询用户信息
export const memberDetailByPhone = data => fetchApi(URL.MEMBERDETAILBYPHONE, data, 'get');
export const integralRecord = data => fetchApi(URL.INTEGRALRECORD, data, 'get'); //查询获取未领取的积分
export const integralRecordReceive = data => fetchApi(URL.INTEGRALRECORDRECEIVE, data, 'POST'); //根据手机号获取积分
export const integralRecordReceiveAll = data => fetchApi(URL.integralRecordReceiveAll, data, 'POST') //根据手机号一键获取全部积分
export const getSignTasklistUsingget = data => fetchApi(URL.GETSIGNTASKLISTUSINGGET, data, 'GET') //获取签到任务
export const getMemberGrownLogListUsingGET = data => fetchApi(URL.GETMEMBERGROWNLOGLISTUSINGGET, data, "GET") //获取日志