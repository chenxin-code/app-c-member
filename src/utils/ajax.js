import axios from "axios";
import JSONbig from "json-bigint";
import api from "@/api";
import QS from "qs";
import localstorage from "@zkty-team/x-engine-module-localstorage";
import { Toast } from "vant";

// var BASEURL = ''
var REFRESH = "";

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
    // await localstorage.get({ key: "LLBToken", isPublic: true }).then(res => {
    //   tokenStr1 = "Bearer " + res.result;
    // });
    // await localstorage
    //   .get({ key: "LLBRefreshToken", isPublic: true })
    //   .then(res => {
    //     REFRESH = "Bearer " + res.result;
    //   });
    tokenStr1 = `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiIxNTAxMTQ4NTU3NyIsInNjb3BlIjpbImFsbCJdLCJpZCI6MjI1Mjk5NDYzOTIyNzI1NzY3OSwiZXhwIjoxNjA5OTY1NDYyLCJhdXRob3JpdGllcyI6WyJ2aXNpdG9yIiwib3duZXIiXSwianRpIjoiOTczMmYwMjMtZjY3OS00ZjI0LTljMjQtZDllZWQ2NzgyZGU4IiwiY2xpZW50X2lkIjoiYXBwX2MifQ.SFxtLMjdFPLajPHvRel7jRT_HkNrOzEHejO1lTDkItL2ldlg5id_6eiTBP53u1zWZQ0xsJO9FurmHnkH3dFnEhhytfBRmb6jhNodGUBgW4UHSgg52RM1dJ7aln8lbWZLB2Tvt-37nwG-8G27IS8GmWwy6Bu38q6ywbRtvygdyQDaXoqSWhVEBLTSDOZo3GztIAGtPyPs3p65DzLzT6IP3t7w3MdBGCFBvsiRZx1GvrriKTw8HxK40zLgvTQbyF6E4ubK9yaFa6LdjpwYb9svI48-1JuXBV3uyEFKT-dS80KBF-F4dfJYpHmS5tEpurmSICS7Zfvc78pHPpkG7Q9A7Q`
    config.headers.Authorization = tokenStr1;
    return config;
  } else {
    await localstorage.get({ key: "LLBToken", isPublic: true }).then(res => {
      tokenStr1 = "Bearer " + res.result;
    });
    await localstorage
      .get({ key: "LLBRefreshToken", isPublic: true })
      .then(res => {
        REFRESH = "Bearer " + res.result;
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
    refresh_token: REFRESH
  });
  api
    .toLogin(para)
    .then(res => {
      if (res.code === 200) {
        localstorage.set({
          key: "LLBToken",
          value: res.data.token,
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
