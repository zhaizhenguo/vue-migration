import axios from "axios";
import qs from "qs";
import Cookies from "js-cookie"

let http = axios.create({
  withCredentials: true,
  timeout: 300000
});

let baseUrl = process.env.API_ROOT;

//请求拦截
http.interceptors.request.use(function (config) {
  let token = Cookies.get('oscar-token');
  if (!!token) {
    config.headers.Authorization = 'Bearer ' + token;
  }
  return config
}, function (error) {
  return Promise.reject(error)
});

//响应拦截
http.interceptors.response.use(function (response) {
  return response
}, function (error) {
  console.error("@@@error=======", error);
  if (error.response.status == 401) {
    this.$router.push('/login');
    this.$message({
      message: "请重新登录",
      type: "error"
    });
  }
  return Promise.reject(error)
});

function apiAxios(
  method,
  url,
  params,
  response,
  headers,
  hostName,
  responseType
) {

  http({
      method: method,
      url: hostName === null || hostName === undefined ?
        baseUrl + url : hostName + url,
      data: method === "POST" || method === "PUT" ? params : null,
      params: method === "GET" || method === "DELETE" ? params : null,
      headers: headers !== undefined && headers != null ? headers : null,
      responseType: responseType === undefined ? "" : responseType
    })
    .then(function (res) {
      if (res === null || res === undefined) {
        return;
      }
      response(res);
    })
    .catch(function (err) {
      response(err.response);
    });
}
export default {
  get: function (url, params, response, hostName) {
    let headers = {};
    let t = "?t=" + new Date().getTime();
    if (/\?/g.test(url)) {
      t = "&t=" + new Date().getTime();
    }
    url = url + t;
    return apiAxios("GET", url, params, response, headers, hostName);
  },
  post: function (url, params, response, hostName) {

    let headers = {};
    return apiAxios("POST", url, params, response, headers, hostName);
  },
  postRequestBody: function (url, params, response, hostName) {
    let headers = {
      "Content-Type": "application/json;charset=UTF-8"
    };
    return apiAxios("POST", url, params, response, headers, hostName);
  },
  postForm: function (url, params, response, hostName) {
    let headers = {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    };
    let qsparam = qs.stringify(params);
    return apiAxios("POST", url, qsparam, response, headers, hostName);
  },
  getForm: function (url, params, response, hostName) {
    let headers = {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    };
    return apiAxios("GET", url, params, response, headers, hostName);
  },
  postRequestForm: function (url, params, response, hostName) {
    let headers = {
      "Content-Type": "multipart/form-data;charset=UTF-8"
    };
    let qsparam = qs.stringify(params);
    return apiAxios("POST", url, qsparam, response, headers, hostName);
  }
};
