export default {
  postLogin(params, response, hostName) {
    window.vue._$request.post("/login", params, response, hostName);
  },
  postFindMenuTree(params, response, hostName) {
    window.vue._$request.post("/menu/findTree", params, response, hostName);
  },
  /*用户管理*/
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
  getUserFindRolesByUserId(params, response, hostName) {
    window.vue._$request.get("/user/findRolesByUserId", params, response, hostName);
  },
  /*用户管理*/

  /*角色管理-start*/
  postRoleSave(params, response, hostName) {
    window.vue._$request.post("/role/save", params, response, hostName);
  },
  postRoleDelete(params, response, hostName) {
    window.vue._$request.post("/role/delete", params, response, hostName);
  },
  postRoleUpdate(params, response, hostName) {
    window.vue._$request.post("/role/update", params, response, hostName);
  },
  postRoleFindPage(params, response, hostName) {
    window.vue._$request.post("/role/findPage", params, response, hostName);
  },
  postRoleFindMenusByRoleId(params, response, hostName) {
    window.vue._$request.postForm("/role/findMenusByRoleId", params, response, hostName);
  },
  postRoleFindAll(params, response, hostName) {
    window.vue._$request.post("/role/findAll", params, response, hostName);
  },
  /*角色管理-end*/

  /*菜单管理-start*/
  getMenuFindTree(params, response, hostName) {
    window.vue._$request.get("/menu/findTree", params, response, hostName);
  },
  getMenuFindMenuByUserId(params, response, hostName) {
    window.vue._$request.get("/menu/findMenuByUserId", params, response, hostName);
  },
  getMenuFindMenuByRoleId(params, response, hostName) {
    window.vue._$request.get("/menu/findMenuByRoleId", params, response, hostName);
  },
  /*菜单管理-end*/
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
