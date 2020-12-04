<template>
  <el-timeline class="timelineDiv">
    <el-timeline-item type="primary" timestamp="数据库连接信息" placement="top">
      <el-card style="padding: 20px 100px 20px 50px; width: 88%">
        <el-row>
          <el-col :span="10">
            <el-card style="">
              <el-row class="databaseTitle">
                <el-col :span="8">源数据库</el-col>
                <el-col :span="16">ShenTong</el-col>
              </el-row>
              <el-row class="databaseBody">
                <el-col :span="8">服 务 器</el-col>
                <el-col :span="16">localhost</el-col>
              </el-row>
              <el-row class="databaseBody">
                <el-col :span="8"> 数 据 库</el-col>
                <el-col :span="16"> OSRDB</el-col>
              </el-row>
              <el-row class="databaseBody">
                <el-col :span="8">用户名</el-col>
                <el-col :span="16">sysdba</el-col>
              </el-row>
            </el-card>
          </el-col>
          <el-col :span="4" style="text-align: center">
            <i class="el-icon-d-arrow-right centerContent"></i>
          </el-col>
          <el-col :span="10">
            <el-card style="">
              <el-row class="databaseTitle">
                <el-col :span="8">源数据库</el-col>
                <el-col :span="16">ShenTong</el-col>
              </el-row>
              <el-row class="databaseBody">
                <el-col :span="8">服 务 器</el-col>
                <el-col :span="16">localhost</el-col>
              </el-row>
              <el-row class="databaseBody">
                <el-col :span="8"> 数 据 库</el-col>
                <el-col :span="16"> OSRDB</el-col>
              </el-row>
              <el-row class="databaseBody">
                <el-col :span="8">用户名</el-col>
                <el-col :span="16">sysdba</el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </el-card>
    </el-timeline-item>
    <el-timeline-item type="primary" timestamp="迁移对象" placement="top">
      <el-card style="padding: 20px 100px 20px 50px; width: 88%">
        <el-row class="databaseTitle"
          ><el-col :span="24">【新建表】</el-col>
        </el-row>
        <el-row style="line-height: 32px; text-align: center">
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="9">PUBLIC.DBMS_LOCK_ALLOCATED</el-col>
          <el-col :span="4" style="color: #409eff; font-size: 25px">
            <i class="el-icon-d-arrow-right"></i>
          </el-col>
          <el-col :span="10">PUBLIC.DBMS_LOCK_ALLOCATED</el-col>
        </el-row>
        <el-row class="databaseTitle"
          ><el-col :span="24">【映射列】</el-col>
        </el-row>
        <el-row style="line-height: 32px; text-align: center">
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="9">NAME</el-col>
          <el-col :span="4" style="color: #409eff; font-size: 25px">
            <i class="el-icon-d-arrow-right"></i>
          </el-col>
          <el-col :span="10">NAME</el-col>
        </el-row>
      </el-card>
    </el-timeline-item>

    <el-timeline-item type="primary" placement="top"></el-timeline-item>
  </el-timeline>
</template>
<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {
    getData() {
      return {};
    },
  },
  created: function () {},
  computed: {},
};
</script>
<style scoped>
.timelineDiv {
  max-height: 610px;
  overflow: auto;
}
.databaseTitle {
  font-weight: 700;
  padding: 5px 0px;
}
.databaseBody {
  padding: 5px 0px;
}
.centerContent {
  line-height: 156px;
  flex: 0.4;
  text-align: center;
  color: #409eff;
  font-size: 120px;
}
</style>
