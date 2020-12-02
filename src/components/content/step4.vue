<template>
  <div style="padding: 0px 50px 0px">
    <el-container>
      <el-header>
        <el-row
          ><el-col :span="3"
            >源模式
            <el-select
              style="width: 130px"
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
          ><el-col :span="3"
            >对象类型
            <el-select
              style="width: 130px"
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
          ><el-col :span="3"
            >迁移范围
            <el-select
              style="width: 130px"
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
          <el-col :span="3" class="qzqy">
            开启强制迁移
            <el-switch v-model="isOpenSwitch"> </el-switch>
            <div style="float: right" v-show="isOpenSwitch">
              迁移到
              <el-select
                :disabled="!isOpenSwitch"
                style="width: 130px"
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
        <el-row> </el-row>
      </el-header>
      <el-main style="padding: 0px 20px"
        ><el-table
          :data="objData"
          border
          stripe
          :height="tableHeight"
          style="width: 100%"
        >
          <el-table-column type="selection" min-width="2%"> </el-table-column>
          <el-table-column type="index" label="行号" min-width="2%">
          </el-table-column>
          <el-table-column
            sortable
            prop="sourceTableName"
            label="源表名"
            min-width="10%"
          >
          </el-table-column>
          <el-table-column
            sortable
            prop="targetTableName"
            label="目标表名"
            min-width="10%"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.targetTableName"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            sortable
            prop="checkOperatingMode"
            label="操作方式"
            min-width="10%"
          >
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.checkOperatingMode"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in operatingMode"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            sortable
            prop="checkTableSpace"
            label="表空间"
            min-width="10%"
          >
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.checkTableSpace"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in tableSpace"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            sortable
            prop="initSize"
            label="初始大小(K)"
            min-width="10%"
          >
          </el-table-column>
          <el-table-column
            sortable
            prop="incrementSize"
            label="增长量(K)"
            min-width="10%"
          >
          </el-table-column>
          <el-table-column
            sortable
            prop="maxSize"
            label="最大值"
            min-width="10%"
          >
          </el-table-column>
          <el-table-column
            sortable
            prop="freeRatio"
            label="空闲比"
            min-width="10%"
          >
          </el-table-column>
          <el-table-column
            sortable
            prop="minUseRatio"
            label="最小使用比"
            min-width="10%"
          >
          </el-table-column>
          <el-table-column
            sortable
            prop="checkOutputLog"
            label="输出日志"
            min-width="10%"
            ><template slot-scope="scope">
              <el-select
                v-model="scope.row.checkOutputLog"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in outputLog"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column sortable prop="filter" label="过滤" min-width="10%">
            <template slot-scope="scope">
              <el-input v-model="scope.row.filter"></el-input>
            </template>
          </el-table-column> </el-table
      ></el-main>
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
export default {
  components: {
    dialogSQLData: dialogSQLData,
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
    handleSelectionChange(val) {
      if (val === "ZG") {
        this.objData = JSON.parse(
          JSON.stringify(this.$options.data().objData02)
        );
      } else {
        this.objData = JSON.parse(JSON.stringify(this.$options.data().objData));
      }
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
  padding-left: 50px;
  line-height: 32px;
  width: auto;
}
.btnCom {
  width: 120px;
  margin-left: 20px;
}
</style>
