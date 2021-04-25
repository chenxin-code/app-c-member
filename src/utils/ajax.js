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
    tokenStr1 = `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiIxNTYyNjEyNzM4MiIsInNjb3BlIjpbImFsbCJdLCJpZCI6MjI1Mjk5NDYzOTIyNzI1NzU2MSwiZXhwIjoxNjE5MzY1MjQzLCJhdXRob3JpdGllcyI6WyJ2aXNpdG9yIiwib3duZXIiXSwianRpIjoiNjUzMjQ4YzMtZTRkOS00NjMxLTk2ZTAtYzY2N2IyMDI5ZGNjIiwiY2xpZW50X2lkIjoiYXBwX2MifQ.MGTxTD4ZkQlKei5pyFPuZn9eGsYHdD4uQfb5lNEglXQ2FSnAEUfbi8PyF0ABc8LLnFL01qz7pXohzJzRjB_j5ebYfVFIybYTH8rU20_4gSf3CxzUcfp7ULJCHkyUm1vDDTUhXaEl9SjDh-wX74xmvfME-9NhzG_96aGooX0LC9DofE9-rkrDW3ZrLIsHAqPMNRbWgoNvPoV8HIbSl3KOm2K-e8Nn9mcOzBO-bujcXSoLIDoewutAy-DOQNP-5k0t2kb2YkQgQ4WtbK-JuDsVngsqXvKIgt0h5qMmoMvvZ3EqOIMO4YCmD4U7KyiMDWvPmW7xa9fVjo04fG2pZ0FlXQ`;
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
      //如果需要写死服务器环境可以在这里处理
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
