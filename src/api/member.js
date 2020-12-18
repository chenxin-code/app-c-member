import {fetchApi} from '@/utils/ajax'
import URL from './urlConfig'

export const getPrepay = data => fetchApi(URL.PREPAY, data, "GET");
