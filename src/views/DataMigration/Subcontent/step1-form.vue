<template>
  <div>
    <el-card class="box-card" shadow="hover">
      <el-row>
        <el-col :span="1">&nbsp;</el-col>
        <el-col :span="21">
          <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="数据源">
              <el-select v-model="form.dataSource">
                <el-option
                  v-for="item in databaseType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="默认驱动">
              <el-select v-model="form.driver" placeholder="请选择活动区域">
                <el-option
                  v-for="item in driverType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-button type="primary" plain @click="btnPointDriver"
                >指定驱动</el-button
              >
              <el-button type="primary" plain @click="btnDriverData"
                >驱动属性</el-button
              >
            </el-form-item>
            <el-form-item label="服务器" prop="server">
              <el-input
                placeholder="请输入服务器"
                v-model.trim="form.server"
              ></el-input>
            </el-form-item>
            <el-form-item label="端口号" prop="port">
              <el-input
                placeholder="请输入端口号"
                type="number"
                v-model.trim="form.port"
              ></el-input>
            </el-form-item>
            <el-form-item label="数据库" prop="dataBase">
              <el-input
                placeholder="请输入数据库"
                v-model.trim="form.dataBase"
              ></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="userName">
              <el-input
                placeholder="请输入用户名"
                v-model.trim="form.userName"
              ></el-input>
            </el-form-item>
            <el-form-item label="口令" prop="password">
              <el-input
                placeholder="请输入口令"
                v-model.trim="form.password"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item label="可信通道">
              <el-switch v-model="form.bChannel"></el-switch>
            </el-form-item>
            <el-form-item label="" style="float: right">
              <el-button type="primary" @click="testConnection"
                >测试连接</el-button
              >
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
    <dialogPointDriver
      v-if="dialogPointDriverVisible"
      :dialogPointDriverVisible="dialogPointDriverVisible"
      @closePointDriver="closePointDriver"
    ></dialogPointDriver>
    <dialogDriverData
      v-if="dialogDriverDataVisible"
      :dialogDriverDataVisible="dialogDriverDataVisible"
      :tableData="driverData"
      @closeDriverData="closeDriverData"
      @getDriverData="getDriverData"
    ></dialogDriverData>
  </div>
</template>
<script>
import dialogPointDriver from "../../Dialog/DialogPointDriver";
import dialogDriverData from "../../Dialog/DialogDriverData";
import databaseType from "@/components/Constant/databaseType";
import driverType from "@/components/Constant/driverType";
import api from "@/components/Asset/Api";
export default {
  components: {
    dialogPointDriver: dialogPointDriver,
    dialogDriverData: dialogDriverData,
  },
  data() {
    return {
      databaseType: databaseType,
      driverType: driverType,
      dialogPointDriverVisible: false,
      dialogDriverDataVisible: false,
      form: {
        dataSource: "ShenTong",
        driver: "ShenTong JDBC Driver",
        server: "localhost",
        port: "3306",
        userName: "zhaizhenguo",
        dataBase: "TEST",
        password: "112336554",
        bChannel: false,
      },
      rules: {
        server: [
          { required: true, message: "请输入服务器", trigger: "change" },

          {
            pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(localhost)$/,
            message: "请输正确的服务器",
          },
        ],
        port: [
          { required: true, message: "请输入端口号", trigger: "change" },
          {
            pattern: /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/,
            message: "请输正确的端口号",
          },
        ],
        dataBase: [
          { required: true, message: "请输入数据库", trigger: "change" },
        ],
        userName: [
          { required: true, message: "请输入用户名", trigger: "change" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
        ],
      },
      driverData: [],
      backDriverData: [],
    };
  },
  methods: {
    testConnection() {
      api.dataMigration.testConnection(
        { connectionInfo: this.form },
        (response) => {
          let res = response.data;
          console.log("res===", res);
          if (res.code == 0) {
            this.$message({ message: "连接成功" });
          } else {
            this.$message({ message: "连接失败, " + res.msg, type: "error" });
          }
        }
      );
    },
    btnPointDriver() {
      this.dialogPointDriverVisible = true;
    },
    closePointDriver() {
      this.dialogPointDriverVisible = false;
    },
    btnDriverData() {
      this.dialogDriverDataVisible = true;
    },
    closeDriverData(isSumbit) {
      if (!isSumbit) {
        this.driverData = this.backDriverData.slice();
      }
      this.dialogDriverDataVisible = false;
    },
    getData() {
      let param;
      this.$refs.form.validate((valid) => {
        if (valid) {
          param = this.getParam();
        } else {
          param = false;
        }
      });
      return param;
    },
    getParam() {
      return {
        dataSource: this.form.dataSource,
        driver: this.form.driver,
        server: this.form.server,
        port: this.form.port,
        userName: this.form.userName,
        dataBase: this.form.dataBase,
        password: this.form.password,
        bChannel: this.form.bChannel ? 1 : 0,
        driverData: this.driverData,
      };
    },
    getDriverData(driverData) {
      //   this.backDriverData = JSON.parse(JSON.stringify(driverData));
      this.backDriverData = driverData.slice();
      this.driverData = driverData;
      this.closeDriverData(1);
    },
  },
  created() {},
};
</script>
