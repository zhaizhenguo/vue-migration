import axios from "axios";
import qs from "qs";
import Cookies from "js-cookie"
import router from './router/index.js'

let http = axios.create({
  withCredentials: true,
  timeout: 300000
});

let baseUrl = process.env.API_ROOT;

//请求拦截
http.interceptors.request.use(function (config) {
  let token = Cookies.get('oscar-token');
  let userName = sessionStorage.getItem("userName");
  let url = config.url.toLocaleLowerCase();
  if (!!token) {
    config.headers.Authorization = 'Bearer ' + token;
  }
  if (url.indexOf("save") > 0) {
    config.data.createBy = userName;
    config.data.laseUpdateBy = userName;
  } else if (url.indexOf("delete") > 0 || url.indexOf("update") > 0) {
    config.data.laseUpdateBy = userName;
  }
  return config
}, function (error) {
  return Promise.reject(error)
});

//响应拦截
http.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error.response.status == 401 || error.response.status == 403) {
    Cookies.remove("oscar-token");
    alert("登录超时,请重新登录");
    router.push('/login');
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
