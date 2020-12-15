 <template >
  <el-popover trigger="click">
    <div class="popoverDiv">
      <el-row
        class="lineColor"
        style="line-height: 25px"
        v-for="(item, key) in rowData"
        :key="key"
        >{{ item }}</el-row
      >
    </div>
    <span slot="reference" style="cursor: pointer; text-decoration: underline">
      {{ rowCount }}</span
    >
  </el-popover>
</template>
<script>
export default {
  props: {
    rowData: {
      type: Array,
      default: function () {
        return [];
      },
    },
    rowCount: {
      type: Number,
      default: function () {
        return 0;
      },
    },
  },
};
</script>
<style  scoped>
.lineColor:nth-of-type(even) {
  background-color: #f5f7fa;
}

.popoverDiv {
  width: auto;
  max-height: 250px;
  overflow: auto;
}
</style>