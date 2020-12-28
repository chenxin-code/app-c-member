import axios from "axios";
import JSONbig from "json-bigint";
import api from "@/api";
import QS from "qs";
import localstorage from "@zkty-team/x-engine-module-localstorage";
import { Toast } from "vant";

// var BASEURL = ''
var RERRESH = "";

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
  if (process.env.NODE_ENV === "development") {
    await localstorage.get({ key: "LLBToken", isPublic: true }).then(res => {
      tokenStr1 = "Bearer " + res.result;
    });
    await localstorage
      .get({ key: "LLBRefreshToken", isPublic: true })
      .then(res => {
        RERRESH = "Bearer " + res.result;
      });
    // tokenStr1 = `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJmYW5qaXVqaXUiLCJzY29wZSI6WyJhbGwiXSwiaWQiOjEsImV4cCI6MTYwNTYxODI5MiwiYXV0aG9yaXRpZXMiOlsiYXBwX2FjdGl2aXR5X2FkbWluIiwiYXBwX3F1YWxpdHlfYWRtaW4iLCJhcHBfaG91c2VfYWRtaW4iLCJhcHBfdmlzaXRvcl9hZG1pbiIsInN5c19hZG1pbiIsImFwcF9hZHZlcnRfYWRtaW4iLCJhcHBfbm90aWNlX2FkbWluIiwiYXBwX21pY3JvX2FkbWluIiwiYXBwX2FyZWFfYWRtaW4iLCJhcHBfZGVjb3JhdGVfYWRtaW4iLCJhcHBfdmVoaWNsZV9hZG1pbiIsImFwcF9hcmVhX2VtcF9hZG1pbiIsImFwcF9wYXNzYWdlX2FkbWluIiwiYW55dGltZXMiLCJhcHBfdXNlcl9hZG1pbiIsImFwcF9zcGFjZV9hZG1pbiIsImFwcF9vd25lcl9hZG1pbiIsImFwcF9jb21wYW55X2xpYl9hZG1pbiIsImFwcF9hZG1pbiJdLCJqdGkiOiJkYTBjYmMzYi1kMjRhLTQxNjktYTAwYy04NThiZDUwNWZmZWUiLCJjbGllbnRfaWQiOiJhcHBfYiJ9.VT4a9c0U-SePRAt75l27AbTANe-pmCPnCF--csIs7AMRU1LcZeJ4yRB-iDH5I6oQ2OWqY3vvBTzQcXhfXQeZH5JaahHBxPAg8QKyAqWCDEZe4v7lbrowoSg45MwfV0BXs_L9u71y6jyXW5FiPnVdll1y3cRr9_qKYUUgV0Hbgvb2KeVHs7n9-6DOVC5WPtcdaugBzHj8IDtD1jbn3-fElDq2FgyKBB2aN-qDbzo08m917DiUk6w2GLm_DsgwXXx9wCK0RVgOyycCPbNCLM1TWhiB-YwaESJd9VaZCZ1jSOEholtccGXE8AOyiN7XH10RnAz9yFu-z_MlXGtlqfDPtg`
    config.headers.Authorization = tokenStr1;
    return config;
  } else {
    await localstorage.get({ key: "LLBToken", isPublic: true }).then(res => {
      tokenStr1 = "Bearer " + res.result;
    });
    await localstorage
      .get({ key: "LLBRefreshToken", isPublic: true })
      .then(res => {
        RERRESH = "Bearer " + res.result;
      });
    config.headers.Authorization = tokenStr1;
    return config;
  }
});

function handleParams(url, rawData, rawMethod) {
  const method = rawMethod.toUpperCase();
  let data = {};
  if (method === "GET") {
    data = { params: rawData };
  }
  switch (method) {
    case "GET":
      data = { params: rawData };
      break;
    case "POST":
    case "PUT":
    case "PATCH":
    case "DELETE":
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
  if (response) {
    Toast("请求失败");
  } else {
    var originalRequest = error.config;
    if (
      error.code == "ECONNABORTED" &&
      error.message.indexOf("timeout") != -1 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      Toast("请求超时");
    }
  }
  reject(error);
}

let defaultHeader = {
  timezoneoffset: Math.abs(new Date().getTimezoneOffset() / 60),
  locale: "zh_CN",
  get: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
};

let refresh = false;
async function refreshToken() {
  refresh = true;
  const para = QS.stringify({
    grant_type: "refresh_token",
    client_id: "app_c",
    client_secret: "times",
    scope: "all",
    refresh_token: RERRESH
  });
  api
    .toLogin(para)
    .then(res => {
      if (res.code === 200) {
        localstorage.set({
          key: "LLBToken",
          value: res.dta.token,
          isPublic: false
        });
        location.reload();
      }
    })
    .finally(() => {});
}
var baseurl;
export const fetchApi = async (
  api,
  rawData = {},
  method = "GET",
  headers = {}
) => {
  if (process.env.NODE_ENV !== "development") {
    await localstorage.get({ key: "LLBOrigin", isPublic: true }).then(res => {
      baseurl = res.result + "/";
    });
  } else {
    baseurl = "/";
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
            resolve(res);
          } else {
            if (res.code === 401) {
              if (refresh) {
                resolve(res);
              } else {
                refreshToken();
                resolve(res);
              }
            } else if (res.code !== 200) {
              Toast(res.message);
              resolve(res);
            } else {
              resolve(res);
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
