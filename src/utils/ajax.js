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
    tokenStr1 = `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiIxMzYzMTA5NTE0NSIsInNjb3BlIjpbImFsbCJdLCJpZCI6MjI0ODYyOTU0MzcwNTI0ODQzOCwiZXhwIjoxNjEwOTc5NjU5LCJhdXRob3JpdGllcyI6WyJ2aXNpdG9yIl0sImp0aSI6IjRmMmYyZDMxLWFlMTYtNGUzMi05YjIzLTYzNGNlNTVlMGUyYiIsImNsaWVudF9pZCI6ImFwcF9jIn0.BBcdlZ6w4sJbCU_MvLNhSdj2dAz9YLgSvdPrA3QOjsTJd_SVdDqzOE2NFLpRvHcvYCGSb9TYkKd9A88MLBNK-q8yFYQtWzII6YHCtYS8PF4VNWnv2Xv9VBKzwqd2RuK7iMiE02w9B3jCPHTY8CrWpN8wSoomsOIh95GtQX3Ql-aG9uG0Y6bcODK8aNTXybfO60VpLoMUId35A45dfm4bNcDX0BhAcfkgkjsA5DHflwjASOBpyGCSZLqxY6V330UPp4NTxiMECcOs7yBHM8YulXC2SqqwYiy3oy5o7LHvBo-GsrhPS2JrqjOttTv6BDF836sQh-pC_apkdevvqyS5Ww`;
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
