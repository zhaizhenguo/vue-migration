<template>
  <el-dialog
    title="指定驱动"
    :visible="dialogPointDriverVisible"
    :close-on-click-modal="false"
    width="415px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="驱动路径">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :limit="1"
          :show-file-list="false"
        >
          <el-button plain size="small" type="primary">选择</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="驱动类名">
        <el-row>
          <el-col :span="15">
            <el-select v-model="form.driverClass">
              <el-option
                v-for="item in driverType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :offset="1" :span="6">
            <el-button type="primary" plain @click="btnAutoGet"
              >自动获取</el-button
            ></el-col
          >
        </el-row>
      </el-form-item>
      <el-form-item label="URL" prop="url">
        <el-row>
          <el-col :span="23"> <el-input v-model="form.url"></el-input> </el-col
        ></el-row>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closePointDriver(0)">取消</el-button>
      <el-button type="primary" @click="closePointDriver(1)">确定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import driverType from "../constant/driverType";
export default {
  props: {
    dialogPointDriverVisible: {
      type: Boolean,
      default: function () {
        return false;
      },
    },
  },
  data() {
    return {
      driverType: driverType,
      form: {
        driverClass: "ShenTong JDBC Driver",
        url: "",
      },
      rules: {
        url: [{ required: true, message: "请选择活动区域", trigger: "change" }],
      },
    };
  },
  computed: {
    visible: {
      get() {
        return this.dialogPointDriverVisible;
      },
      set(v) {
        // this.countData = v;
      },
    },
  },
  created() {
    // console.log("dialogPointDriverVisible===", this.dialogPointDriverVisible);
  },
  methods: {
    closePointDriver(isSure) {
      //   if (typeof isSure === "function") {
      //     isSure();
      //     return;
      //   }
      if (!isSure) {
        this.$emit("closePointDriver");
      }
      this.$refs.form.validate((valid) => {
        if (valid) {
          let param = this.getParam();
          this.$emit("closePointDriver", param);
          this.$emit("closePointDriver");
          return true;
        } else {
          return false;
        }
      });
    },
    getParam() {
      return {
        // driverUrl: this.form.driverUrl,
        driverClass: this.form.driverClass,
        url: this.form.url,
      };
    },
    btnAutoGet() {},
    close() {
      this.$emit("closePointDriver");
    },
  },
};
</script>
