import {fetchApi} from '@/utils/ajax'
import URL from './urlConfig'

export const sendCode = data => fetchApi(URL.SEND_CODE, data, "POST");
export const toLogin = data => fetchApi(URL.LOGIN, data, "POST");
