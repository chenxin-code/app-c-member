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
    tokenStr1 = `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiIxODgxOTMxMDY4OCIsInNjb3BlIjpbImFsbCJdLCJpZCI6MjI0ODYzODQyNTY5NzYxNzMwMywiZXhwIjoxNjE2Njc3OTE3LCJhdXRob3JpdGllcyI6WyJ2aXNpdG9yIl0sImp0aSI6IjBlOWFhZTg3LTAzOWQtNDAyNS04OTdmLTJkY2ZmZTI3MDU0NyIsImNsaWVudF9pZCI6ImFwcF9jIn0.KExNgpZ1ZlX-h7hh_D8ZEorfEoqL6WmVsl3J2PmE6Ow2rHRgN4tkZXOQWs2b5MLBmwtgCcoEcOCs2Ew81l0Td2qfuhRZpNVeCuYtTtwsQaI3Dop7r24HGIBloOOb3rcT43i-lYWMybaFBoesjJxBNGsTCu7ZzbB79qxjifHYWLxExHPOWwsCsFzuLAHAIyP74LnSr5x0_eD4s_64Jrji6DFMFDsRm_j2X1AXBr9umS8hCKg3kaz5nBEtIDDBmPaSUO0t2zhcP1ejGAkaAvGP0ytgTGa3AGAiW99PAXC_b15-rOmQV_C44G24Qw1chGanqE5rtoStSLYdhwTHsWr1_A`;
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
