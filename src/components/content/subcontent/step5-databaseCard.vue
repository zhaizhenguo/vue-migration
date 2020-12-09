<template>
  <el-card style="padding: 20px 100px 20px 50px; width: 88%">
    <el-row>
      <el-col :span="10">
        <el-card style="">
          <el-row class="databaseTitle">
            <el-col :span="8">源数据库</el-col>
            <el-col :span="16">{{ databaseData.sourceData.dataSource }}</el-col>
          </el-row>
          <el-row class="databaseBody">
            <el-col :span="8">服 务 器</el-col>
            <el-col :span="16">{{ databaseData.sourceData.server }}</el-col>
          </el-row>
          <el-row class="databaseBody">
            <el-col :span="8"> 数 据 库</el-col>
            <el-col :span="16"> {{ databaseData.sourceData.dataBase }}</el-col>
          </el-row>
          <el-row class="databaseBody">
            <el-col :span="8">用 户 名</el-col>
            <el-col :span="16">{{ databaseData.sourceData.userName }}</el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="4" style="text-align: center">
        <i class="el-icon-d-arrow-right centerContent"></i>
      </el-col>
      <el-col :span="10">
        <el-card style="">
          <el-row class="databaseTitle">
            <el-col :span="8">目标数据库</el-col>
            <el-col :span="16">{{ databaseData.targetData.dataSource }}</el-col>
          </el-row>
          <el-row class="databaseBody">
            <el-col :span="8">服 务 器</el-col>
            <el-col :span="16">{{ databaseData.targetData.server }}</el-col>
          </el-row>
          <el-row class="databaseBody">
            <el-col :span="8"> 数 据 库</el-col>
            <el-col :span="16"> {{ databaseData.targetData.dataBase }}</el-col>
          </el-row>
          <el-row class="databaseBody">
            <el-col :span="8">用 户 名</el-col>
            <el-col :span="16">{{ databaseData.targetData.userName }}</el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      databaseData: { sourceData: {}, targetData: {} },
    };
  },
  methods: {
    initData(data) {
      this.databaseData = data;
    },
  },
};
</script>
<style scoped>
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