import axios from 'axios'
import JSONbig from 'json-bigint'
import api from "@/api";
import QS from "qs";
import localstorage from "@zkty-team/x-engine-module-localstorage";
import { Toast } from 'vant';

// var BASEURL = ''
var RERRESH = ''

// if (process.env.NODE_ENV === 'development') {
//   // getBaseURL();
//   // BASEURL = '/'
//   // BASEURL = "http://dev.linli580.com:10000/";
// } else {
//   // getBaseURL();
//   // BASEURL = location.origin
//  // BASEURL = "http://sit.linli590.cn:7777/"
// }

const JSONBigString = JSONbig({ "storeAsString": true });
export const HTTP = axios.create({

    withCredentials: false,
    timeout: 20000,
    headers: {
        // post: {
        //   'Content-Type': 'application/json'
        // }
    },
    transformResponse: [
        function(data) {
            return JSONBigString.parse(data)
        }
    ]
});

//请求拦截
HTTP.interceptors.request.use(async(config) => {
    let tokenStr1;
    if (process.env.NODE_ENV === 'development') {
        // await localstorage.get({ key: "LLBToken", isPublic: true }).then((res) => {
        //     tokenStr1 = "Bearer " + res.result;
        // });
        // await localstorage.get({ key: "LLBRefreshToken", isPublic: true }).then((res) => {
        //     RERRESH = "Bearer " + res.result;
        // });
        tokenStr1 = `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiIxMzU1MjEzOTUyNiIsInNjb3BlIjpbImFsbCJdLCJpZCI6MjI2MzE1NDcxMDc4MzQ2MTcyMiwiZXhwIjoxNjA4NjUyODE3LCJhdXRob3JpdGllcyI6WyJ2aXNpdG9yIiwib3duZXIiXSwianRpIjoiMWEyYTMzYTgtZGE3Yi00YmY5LWEwMDQtZmM2MmUyMDUxOGEwIiwiY2xpZW50X2lkIjoiYXBwX2MifQ.cuWikCfUG9xaixjP00R6R1WS6lp6DgvWbcRwx_gZJiJyk9PI78HNnlK_-okjLKEVo5sbr2RboyMfifjPHrAQ2moVFjwvSbSmr0cuDq-egZ3fg-MD0Y2AL2v_N6VSlUqOryUCKGp9ei6pbIfHQbbyRBWxsYat82X4snphE0NjYIefOCDRc2WU6HtUXoSrqEnm282WPxH26agaW5Ju_YAxywSoa_bmz1ihpZtEQ_P04JH18kcTL5N2QqMuYrDKco8bRKZdqAcQjBIQlOoaywIEcwYNmevdj7h8nC36iys6-dixUPmDkTZSJOuyH0LW07KvgUmoTDyfmPZ0l4opqm_0gQ`
        config.headers.Authorization = tokenStr1;
        return config
    } else {
        await localstorage.get({ key: "LLBToken", isPublic: true }).then((res) => {
            tokenStr1 = "Bearer " + res.result;
        });
        await localstorage.get({ key: "LLBRefreshToken", isPublic: true }).then((res) => {
            RERRESH = "Bearer " + res.result;
        });
        config.headers.Authorization = tokenStr1;
        return config
    }
});


function handleParams(url, rawData, rawMethod) {
    const method = rawMethod.toUpperCase()
    let data = {}
    if (method === 'GET') {
        data = { params: rawData }
    }
    switch (method) {
        case 'GET':
            data = { params: rawData }
            break
        case 'POST':
        case 'PUT':
        case 'PATCH':
        case 'DELETE':
            data = { data: rawData }
            break
        default:
            data = { params: rawData }
            break
    }

    return Promise.resolve({
        url,
        method,
        data
    })
}

async function handleFail(option) {
    console.log(option)
    const { error, reject } = option
    const { response } = error
    if (response) {
        switch (response.status) {
            case 400:
                Toast("请求失败")
                    // message.error('请求失败')
                break
            case 401:
                break
            case 403:
                Toast("请求失败")
                break
            case 404:
                Toast("请求失败")
                    // message.error('请求失败')
                break
            case 500:
                Toast("请求失败")
                    // message.error('请求失败')
                break
            default:
                break
        }
    } else {
        var originalRequest = error.config;
        if (error.code == 'ECONNABORTED' && error.message.indexOf('timeout') != -1 && !originalRequest._retry) {
            originalRequest._retry = true
            Toast('请求超时')
        }
    }
    reject(error)
}

let defaultHeader = {
    timezoneoffset: Math.abs(new Date().getTimezoneOffset() / 60),
    locale: 'zh_CN',
    get: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}


let refresh = false;
async function refreshToken() {
    refresh = true;
    const para = QS.stringify({
        grant_type: "refresh_token",
        client_id: "app_c",
        client_secret: "times",
        scope: "all",
        refresh_token: RERRESH
    })
    api.toLogin(para).then(res => {
        if (res.code === 200) {
            localstorage.set({
                key: "token",
                value: res.dta.token,
                isPublic: false,
            })
            location.reload();
        }
    }).finally(() => {});
}
var baseurl;
export const fetchApi = async(api, rawData = {}, method = 'GET', headers = {}) => {

    if (process.env.NODE_ENV !== 'development') {
        await localstorage.get({ key: "LLBOrigin", isPublic: true }).then((res) => {
            baseurl = res.result + "/"
        });
    } else {
        baseurl = "/"
    }
    return handleParams(api, rawData, method, headers).then(options => {

        return new Promise((resolve, reject) => {

            HTTP({
                    baseURL: baseurl,
                    withCredentials: false,
                    url: options.url,
                    method: options.method,
                    headers: {...defaultHeader, ...headers },
                    ...options.data
                })
                .then(resp => {
                    // NProgress.done()
                    const res = resp.data
                    if (res.code === 0) {
                        resolve(res)
                    } else {
                        if (res.code === 401) {
                            if (refresh) {
                                resolve(res)
                            } else {
                                resolve(res)
                                refreshToken();
                            }
                        } else if (res.code === 404) {
                            resolve(res)
                        } else if (res.code !== 200) {
                            resolve(res)
                            Toast(res.message)
                        } else {
                            resolve(res)
                        }
                    }
                }, error => {
                    // NProgress.done()
                    handleFail({
                        error,
                        reject,
                        options
                    })
                    throw error
                })
        })
    })

}