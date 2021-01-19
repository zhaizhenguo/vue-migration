export default {
  /*登录*/
  login(params, response, hostName) {
    window.vue._$request.post("/login", params, response, hostName);
  },
  /*登出*/
  layout(params, response, hostName) {
    window.vue._$request.post("/layout", params, response, hostName);
  },
  /*获取公钥*/
  getPublicKey(params, response, hostName) {
    window.vue._$request.get("/getPublicKey", params, response, hostName);
  },

  /*数据迁移-start*/
  dataMigration: {
    testConnection(params, response, hostName) {
      window.vue._$request.post("/dataMigration/testConnection", params, response, hostName);
    },
    saveConfig(params, response, hostName) {
      window.vue._$request.post("/dataMigration/saveConfig", params, response, hostName);
    },
    getTypeMapping(params, response, hostName) {
      window.vue._$request.get("/dataMigration/getTypeMapping", params, response, hostName);
    },
    saveTypeMapping(params, response, hostName) {
      window.vue._$request.post("/dataMigration/saveTypeMapping", params, response, hostName);
    },
    getAllPattern(params, response, hostName) {
      window.vue._$request.post("/dataMigration/getAllPattern", params, response, hostName);
    },
    getPatternDataByName(params, response, hostName) {
      window.vue._$request.postForm("/dataMigration/getPatternDataByName", params, response, hostName);
    },
  },
  /*数据迁移-end*/

  /*用户管理*/
  user: {
    save(params, response, hostName) {
      window.vue._$request.post("/user/save", params, response, hostName);
    },
    delete(params, response, hostName) {
      window.vue._$request.post("/user/delete", params, response, hostName);
    },
    update(params, response, hostName) {
      window.vue._$request.post("/user/update", params, response, hostName);
    },
    findPage(params, response, hostName) {
      window.vue._$request.post("/user/findPage", params, response, hostName);
    },
    findRolesByUserId(params, response, hostName) {
      window.vue._$request.get("/user/findRolesByUserId", params, response, hostName);
    },
    updatePassword(params, response, hostName) {
      window.vue._$request.post("/user/updatePassword", params, response, hostName);
    },
  },

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
  menu: {
    findTree(params, response, hostName) {
      window.vue._$request.get("/menu/findTree", params, response, hostName);
    },
    findMenuByUserId(params, response, hostName) {
      window.vue._$request.get("/menu/findMenuByUserId", params, response, hostName);
    },
    findMenuByRoleId(params, response, hostName) {
      window.vue._$request.get("/menu/findMenuByRoleId", params, response, hostName);
    },
  },
  /*菜单管理-end*/

  postPay(params, response, hostName) {
    window.vue._$request.post("api/postPay", params, response, hostName);
  },
  postUser(params, response, hostName) {
    window.vue._$request.post("api/postPay", params, response, hostName);
  }

};
