import axios from 'axios';
import JSONbig from 'json-bigint';
import api from '@/api';
import QS from 'qs';
import localstorage from '@zkty-team/x-engine-module-localstorage';
import { Toast } from 'vant';

// var BASEURL = ''
var REFRESH = '';

// if (process.env.NODE_ENV === 'development') {
//   // getBaseURL();
//   // BASEURL = '/'
//   // BASEURL = "http://dev.linli580.com:10000/";
// } else {
//   // getBaseURL();
//   // BASEURL = location.origin
//  // BASEURL = "http://sit.linli590.cn:7777/"
// }

const JSONBigString = JSONbig({ storeAsString: true });
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
      return JSONBigString.parse(data);
    }
  ]
});

//请求拦截
HTTP.interceptors.request.use(async config => {
  let tokenStr1;
  if (process.env.NODE_ENV === 'development') {
    //生产环境
    // await localstorage.get({ key: "LLBToken", isPublic: true }).then(res => {
    //   tokenStr1 = "Bearer " + res.result;
    // });
    // await localstorage
    //   .get({ key: "LLBRefreshToken", isPublic: true })
    //   .then(res => {
    //     REFRESH = "Bearer " + res.result;
    //   });

    //开发环境
<<<<<<< HEAD
    tokenStr1 = `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiIxODgxOTMxMDY4OCIsInNjb3BlIjpbImFsbCJdLCJpZCI6MjQwNTU0OTAwODU0MzAyNjExNiwiZXhwIjoxNjE1OTM0MDY1LCJhdXRob3JpdGllcyI6WyJ2aXNpdG9yIl0sImp0aSI6ImVhMGU2YzU5LTE0YjYtNGEyYy1hMTVmLWI2YzA1OWJlYjJkZiIsImNsaWVudF9pZCI6ImFwcF9jIn0.hNCn_Uk8K2gkbd2InmQb4yKPlRzeYgKEoNE3ceBhMDg04sMnp9pn4sHWifHi6flPIk9Vz_I9p-Alk6R24DTGVLj-YTmrhxejoqOTUafKgUES6lLrorJVDM5DteqaLaSMFZP2Da4hxUEsZiQK5_mtLcXDP7avNdehpcfXFLIc30j_1a63nyDv4nBVTvz0JJ4ZOWD4P4s9ShMuhALERXy3XqEnqSnWVp7RbcAbAdGeNrZN13Vz-2kXepngWqwOp7I-Ttv26HRqGmgTfwxOpT9Ymx4jS3Ok0G6sQzynWWfriRV14Vv6Ce_EsuFkgrnP-7kNvtYrm7rnTY5NPYKMO0tErQ`;
=======
    tokenStr1 = `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiIxODgxOTMxMDY4OCIsInNjb3BlIjpbImFsbCJdLCJpZCI6MjI0ODYzODQyNTY5NzYxNzMwMywiZXhwIjoxNjE1OTI4ODAzLCJhdXRob3JpdGllcyI6WyJ2aXNpdG9yIl0sImp0aSI6IjczMjZhNGM3LWQzNjEtNDZmOS04ZGI0LTUxMmNjMThiNDQxMSIsImNsaWVudF9pZCI6ImFwcF9jIn0.a0RZEiP9ie25f6bYa-i1UJT7m3GuFM5cUFqZimkNWceBrR4dgUhrjveWZ9yG-QoMT_voAWJGjgd4O784JcKCxFaeZHQQa8GDUs6kW_fGvkj4jbeZTlgTsOCWVpZJmREG3ZHyUCRyaJADa5NLEG8eZJaeXBLD8mObpgMPVtFkZL7QoH-HZkVJWXxwmn1cVoCWgPl-s3UjezKWSaOp2uoCerXckYhBqwFjQXijOKn3VC3PdV1lmPOdzkYNDbfos8oJOp-wZsRitLasOoXhw4ixfVNp-o2Msjb9tbWwcA32s6KYHQYjyYDkxrtS1a0EuZ1wen3p0u8N5picYl-QnID4zg`;
>>>>>>> 111dfdbe1736e34153d5430d2fa40dc5f8958368
    config.headers.Authorization = tokenStr1;
    return config;
  } else {
    await localstorage.get({ key: 'LLBToken', isPublic: true }).then(res => {
      tokenStr1 = 'Bearer ' + res.result;
    });
    await localstorage.get({ key: 'LLBRefreshToken', isPublic: true }).then(res => {
      REFRESH = 'Bearer ' + res.result;
    });
    config.headers.Authorization = tokenStr1;
    return config;
  }
});

function handleParams(url, rawData, rawMethod) {
  const method = rawMethod.toUpperCase();
  let data = {};
  if (method === 'GET') {
    data = { params: rawData };
  }
  switch (method) {
    case 'GET':
      data = { params: rawData };
      break;
    case 'POST':
    case 'PUT':
    case 'PATCH':
    case 'DELETE':
      data = { data: rawData };
      break;
    default:
      data = { params: rawData };
      break;
  }

  return Promise.resolve({
    url,
    method,
    data
  });
}

async function handleFail(option) {
  console.log(option);
  const { error, reject } = option;
  const { response } = error;
  console.log('error', error);
  if (response) {
    Toast('请求失败');
  } else {
    var originalRequest = error.config;
    if (error.code == 'ECONNABORTED' && error.message.indexOf('timeout') != -1 && !originalRequest._retry) {
      originalRequest._retry = true;
      Toast('请求超时');
    }
  }
  reject(error);
}

let defaultHeader = {
  timezoneoffset: Math.abs(new Date().getTimezoneOffset() / 60),
  locale: 'zh_CN',
  get: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
};

let refresh = false;
async function refreshToken() {
  refresh = true;
  const para = QS.stringify({
    grant_type: 'refresh_token',
    client_id: 'app_c',
    client_secret: 'times',
    scope: 'all',
    refresh_token: REFRESH
  });
  api
    .toLogin(para)
    .then(res => {
      if (res.code === 200) {
        localstorage.set({
          key: 'LLBToken',
          value: res.data.token,
          isPublic: false
        });
        location.reload();
      }
    })
    .finally(() => {});
}
var baseurl;
export const fetchApi = async (api, rawData = {}, method = 'GET', headers = {}) => {
  if (process.env.NODE_ENV !== 'development') {
    await localstorage.get({ key: 'LLBOrigin', isPublic: true }).then(res => {
      baseurl = res.result + '/';
    });
  } else {
    baseurl = '/';
  }
  return handleParams(api, rawData, method, headers).then(options => {
    return new Promise((resolve, reject) => {
      HTTP({
        baseURL: baseurl,
        withCredentials: false,
        url: options.url,
        method: options.method,
        headers: { ...defaultHeader, ...headers },
        ...options.data
      }).then(
        resp => {
          // NProgress.done()
          const res = resp.data;
          if (res.code === 0) {
            return resolve(res);
          } else {
            if (res.code === 401) {
              if (refresh) {
                return resolve(res);
              } else {
                refreshToken();
                return resolve(res);
              }
            } else if (res.code !== 200) {
              Toast(res.message);
              return resolve(res);
            } else {
              return resolve(res);
            }
          }
        },
        error => {
          // NProgress.done()
          handleFail({
            error,
            reject,
            options
          });

          throw error;
        }
      );
    });
  });
};
