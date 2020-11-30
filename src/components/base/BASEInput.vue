<template>
  <el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.code"
      :label="item.name"
      :value="item.name"
    >
    </el-option>
  </el-select>
</template>
<script>
export default {
  props: {
    options: {
      type: Array,
      default: function() {
        return [];
      }
    },
    value: {
      type: String,
      default: function() {
        return "";
      }
    }
  }
};
</script>
