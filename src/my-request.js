import axios from "axios";
import qs from "qs";
//import { Message } from 'element-ui';
//window.app.axios = axios;
let http = axios.create({
  withCredentials: true,
  timeout: 300000
});

let baseUrl =
  "https://www.fastmock.site/mock/0b312fa380dffc1f26339d762ae55611/vueFrame/";

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
    url:
      hostName === null || hostName === undefined
        ? baseUrl + url
        : hostName + url,
    data: method === "POST" || method === "PUT" ? params : null,
    params: method === "GET" || method === "DELETE" ? params : null,
    headers: headers !== undefined && headers != null ? headers : null,
    responseType: responseType === undefined ? "" : responseType
  })
    .then(function(res) {
      if (res === null || res === undefined) {
        return;
      }
      response(res);
    })
    .catch(function(err) {
      response(err.response);
    });
}
export default {
  get: function(url, params, response, hostName) {
    let headers = {};
    let t = "?t=" + new Date().getTime();
    if (/\?/g.test(url)) {
      t = "&t=" + new Date().getTime();
    }
    url = url + t;
    return apiAxios("GET", url, params, response, headers, hostName);
  },
  post: function(url, params, response, hostName) {
    let headers = {};
    return apiAxios("POST", url, params, response, headers, hostName);
  },
  postRequestBody: function(url, params, response, hostName) {
    let headers = {
      "Content-Type": "application/json;charset=UTF-8"
    };
    return apiAxios("POST", url, params, response, headers, hostName);
  },
  postForm: function(url, params, response, hostName) {
    let headers = {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    };
    let qsparam = qs.stringify(params);
    return apiAxios("POST", url, qsparam, response, headers, hostName);
  },
  getForm: function(url, params, response, hostName) {
    let headers = {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    };
    return apiAxios("GET", url, params, response, headers, hostName);
  },
  postRequestForm: function(url, params, response, hostName) {
    let headers = {
      "Content-Type": "multipart/form-data;charset=UTF-8"
    };
    let qsparam = qs.stringify(params);
    return apiAxios("POST", url, qsparam, response, headers, hostName);
  }
};
