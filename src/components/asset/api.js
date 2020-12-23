export default {
  postLogin(params, response, hostName) {
    window.vue._$request.post("/api/login", params, response, hostName);
  },
  getShopList(params, response, hostName) {
    window.vue._$request.get("api/getShopList", params, response, hostName);
  },
  postPay(params, response, hostName) {
    window.vue._$request.post("api/postPay", params, response, hostName);
  },
  postUser(params, response, hostName) {
    window.vue._$request.post("api/postPay", params, response, hostName);
  }

};
