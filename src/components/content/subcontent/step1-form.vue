<template>
  <div>
    <el-row>
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="21">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="数据源">
            <el-select v-model="form.dataSource" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="默认驱动">
            <el-select v-model="form.driver" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            <el-button @click="btnPointDriver">指定驱动</el-button>
            <el-button @click="btnDriverData">驱动属性</el-button>
          </el-form-item>
          <el-form-item label="服务器" prop="server">
            <el-input v-model="form.server"></el-input>
          </el-form-item>
          <el-form-item label="端口号" prop="port">
            <el-input v-model="form.port"></el-input>
          </el-form-item>
          <el-form-item label="数据库" prop="dataBase">
            <el-input v-model="form.dataBase"></el-input>
          </el-form-item>
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="form.userName"></el-input>
          </el-form-item>
          <el-form-item label="口令" prop="password">
            <el-input v-model="form.password" show-password></el-input>
          </el-form-item>
          <el-form-item label="可信通道">
            <el-switch v-model="form.bChannel"></el-switch>
          </el-form-item>
          <el-form-item label="">
            <el-button @click="testConnect">测试连接</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
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
import dialogPointDriver from "../../dialog/dialogPointDriver";
import dialogDriverData from "../../dialog/dialogDriverData";
export default {
  components: {
    dialogPointDriver: dialogPointDriver,
    dialogDriverData: dialogDriverData,
  },
  data() {
    return {
      dialogPointDriverVisible: false,
      dialogDriverDataVisible: false,
      form: {
        dataSource: "shanghai",
        driver: "beijing",
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
        ],
        port: [{ required: true, message: "请输入端口号", trigger: "change" }],
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
    testConnect() {},
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
      param = this.getParam();
      //   this.$refs.form.validate((valid) => {
      //     if (valid) {
      //       param = this.getParam();
      //     } else {
      //       param = false;
      //     }
      //   });
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
};
</script>
