import { fetchApi } from '@/utils/ajax'
import URL from './urlConfig'

export const sendCode = data => fetchApi(URL.SEND_CODE, data, "POST");
export const toLogin = data => fetchApi(URL.LOGIN, data, "POST");
//获取当前人的人房关系ID
export const getCustomUser = data => fetchApi(URL.GETCUSTOMUSER, data, "GET");
//查身份证
export const getUserCardNo = data => fetchApi(URL.GET_USER_CARDNO,data,"GET");
