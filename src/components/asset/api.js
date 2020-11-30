export default {
  getShopList(params, response, hostName) {
    window.vue._$request.get("api/getShopList", params, response, hostName);
  },
  postPay(params, response, hostName) {
    window.vue._$request.post("api/postPay", params, response, hostName);
  }
};
