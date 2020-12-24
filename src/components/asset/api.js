export default {
  postLogin(params, response, hostName) {
    window.vue._$request.post("/login", params, response, hostName);
  },
  postFindMenuTree(params, response, hostName) {
    window.vue._$request.post("/menu/findTree", params, response, hostName);
  },
  /**用户管理START*/
  postUserSave(params, response, hostName) {
    window.vue._$request.post("/user/save", params, response, hostName);
  },
  postUserDelete(params, response, hostName) {
    window.vue._$request.post("/user/delete", params, response, hostName);
  },
  postUserUpdate(params, response, hostName) {
    window.vue._$request.post("/user/update", params, response, hostName);
  },
  postUserFindPage(params, response, hostName) {
    window.vue._$request.post("/user/findPage", params, response, hostName);
  },
  postUserFindPageByName(params, response, hostName) {
    window.vue._$request.post("/user/findPageByName", params, response, hostName);
  },
  postUserFindRolesByUserId(params, response, hostName) {
    window.vue._$request.post("/user/findRolesByUserId", params, response, hostName);
  },
  /**用户管理END*/

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
