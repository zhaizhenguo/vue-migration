<template>
  <el-row style="background-color: #409eb3">
    <!-- logo -->
    <el-col
      :span="3"
      class="logo"
      @click.native="$router.push('/').catch((err) => {})"
    >
      <div class="logoDiv">跨平台迁移工具</div>
    </el-col>
    <span class="toolbar">
      <el-menu
        style="border: none"
        background-color="#409eb3"
        mode="horizontal"
      >
        <el-menu-item
          style="border-bottom-color: transparent"
          v-popover:popover-personal
        >
          <!-- 用户信息 -->
          <span class="user-info"
            ><img :src="user.avatar" />{{ user.name }}</span
          >
          <el-popover
            ref="popover-personal"
            placement="bottom-end"
            trigger="click"
            :visible-arrow="false"
          >
            <personal-panel :user="user"></personal-panel>
          </el-popover>
        </el-menu-item>
      </el-menu>
    </span>
  </el-row>
</template>

<script>
import PersonalPanel from "./PersonalPanel";
export default {
  components: {
    PersonalPanel,
  },
  data() {
    return {
      user: {
        name: "测试用户",
        avatar: "",
        role: "超级管理员",
        registeInfo: "注册时间：2018-12-20 ",
      },
      activeIndex: "1",
      langVisible: false,
    };
  },
  methods: {},
  mounted() {
    var user = sessionStorage.getItem("user");
    if (user) {
      this.user.name = user;
    }
  },
};
</script>

<style>
.navbar {
  float: left;
}
.toolbar {
  float: right;
}
.lang-item {
  font-size: 16px;
  padding-left: 8px;
  padding-top: 8px;
  padding-bottom: 8px;
  cursor: pointer;
}
.lang-item:hover {
  font-size: 18px;
  background: #b0d6ce4d;
}
.user-info {
  font-size: 20px;
  color: #fff;
  cursor: pointer;
}
.logo {
  top: 0px;
  height: 60px;
  line-height: 60px;
  cursor: pointer;
  border-color: rgba(180, 190, 190, 0.8);
  border-width: 0 1px;
  border-style: solid;
}
.logoDiv {
  font-size: 25px;
  color: white;
  text-align: left;
  padding-left: 20px;
}
.img {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  margin: 10px 0px 10px 10px;
  float: right;
}
.badge {
  line-height: 18px;
}
.positionLeft {
  left: 200px;
}
</style>