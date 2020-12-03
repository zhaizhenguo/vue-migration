<template>
  <div>
    <el-container>
      <el-header style="height: auto">
        <el-row
          ><el-col :span="4"
            >源模式
            <el-select
              class="selectDiv"
              @change="handleSelectionChange"
              v-model="checkSourcePattern"
              placeholder="请选择"
            >
              <el-option
                v-for="item in sourcePattern"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select> </el-col
          ><el-col :span="4"
            >对象类型
            <el-select
              class="selectDiv"
              @change="handleSelectionChange"
              v-model="checkSourcePattern"
              placeholder="请选择"
            >
              <el-option
                v-for="item in sourcePattern"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select> </el-col
          ><el-col :span="4"
            >迁移范围
            <el-select
              class="selectDiv"
              @change="handleSelectionChange"
              v-model="checkSourcePattern"
              placeholder="请选择"
            >
              <el-option
                v-for="item in sourcePattern"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="3"
            ><el-input v-model="input" placeholder="请输入"></el-input
          ></el-col>
          <el-col :span="1" style="margin-left: 5px"
            ><el-button type="primary" :loading="false">查询</el-button></el-col
          >
          <el-col :span="2" class="btnCom">
            <el-upload
              plain
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList"
            >
              <el-button size="small" type="primary">快速选择对象</el-button>
            </el-upload>
          </el-col>
          <el-col :span="2" style="width: 120px">
            <el-button type="primary" @click="btnPointSQL()"
              >SQL查询迁移</el-button
            ></el-col
          ><el-col :span="2">
            <el-upload
              plain
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList"
            >
              <el-button size="small" type="primary"
                >查询迁移批量导入</el-button
              >
            </el-upload>
          </el-col>
        </el-row>
        <el-row
          ><el-col :span="3" class="qzqy">
            开启强制迁移
            <el-switch v-model="isOpenSwitch"> </el-switch>
            <div style="float: right; padding: 0px 10px" v-show="isOpenSwitch">
              迁移到
              <el-select
                :disabled="!isOpenSwitch"
                class="selectDiv"
                @change="handleSelectionChange"
                v-model="checkSourcePattern"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in sourcePattern"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-main style="padding: 0px 20px">
        <step4Tabs ref="step4Tabs"></step4Tabs>
      </el-main>
      <el-fotter> </el-fotter>
    </el-container>
    <dialogSQLData
      v-if="dialogSQLDataVisible"
      :dialogSQLDataVisible="dialogSQLDataVisible"
      @closePointSQL="closePointSQL"
      @getSqlData="getSqlData"
    ></dialogSQLData>
  </div>
</template>
<script>
import objData from "../constant/step4Tab";
import objData02 from "../constant/step4Tab02";
import dialogSQLData from "../dialog/dialogSQLData";
import step4Tabs from "./subcontent/step4-tabs";
export default {
  components: {
    dialogSQLData: dialogSQLData,
    step4Tabs: step4Tabs,
  },
  data() {
    return {
      objData: objData,
      objData02: objData02,
      tableHeight: 570,
      isOpenSwitch: false,
      dialogSQLDataVisible: false,
      operatingMode: [
        { value: "newTable", label: "新建表" },
        { value: "heavyLoadData", label: "重载数据" },
        { value: "addToData", label: "追加数据" },
      ],
      tableSpace: [
        { value: "SYSTEM", label: "SYSTEM" },
        { value: "UNDOTS01", label: "UNDOTS01" },
        { value: "TEMP", label: "TEMP" },
        { value: "AUDIT", label: "AUDIT" },
      ],
      outputLog: [
        { value: 0, label: "是" },
        { value: 1, label: "否" },
      ],

      sourcePattern: [
        { value: "SYSDBA", label: "SYSDBA" },
        { value: "ZG", label: "ZG" },
      ],
      checkSourcePattern: "SYSDBA",
      //   this.sourcePattern[0].value,
    };
  },
  methods: {
    tabHandleClick(tab, event) {
      console.log(this.getParam());
    },
    handleSelectionChange(val) {
      this.$refs["step4Tabs"].handleSourceDataSelectionChange(val);
      console.log("val===", val);
    },
    btnPointSQL() {
      this.dialogSQLDataVisible = true;
    },
    closePointSQL() {
      this.dialogSQLDataVisible = false;
    },
    getSqlData(data) {
      console.log("parent==========", data);
    },
    getData() {
      return {
        objData,
      };
    },
    calcHeightx() {
      let wapper = window.document.getElementsByClassName(
        "el-table__body-wrapper"
      );
      //必须加延时，要不然赋不上去值
      setTimeout(() => {
        //通过上边计算得到的table高度的value值，减去table表格的header高度，剩下的通过dom节点直接强行赋给table表格的body
        wapper[0].style.height = this.tableHeight + "px";
      }, 100);
    },
  },
  created: function () {
    this.calcHeightx();
  },
  computed: {},
};
</script>
<style scoped>
.qzqy {
  padding: 10px 0px;
  height: 50px;
  line-height: 32px;
  width: auto;
}
.btnCom {
  width: 120px;
  margin-left: 20px;
}
.selectDiv {
  width: 150px;
}
</style>
