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
      default: function () {
        return [];
      },
    },
    value: {
      type: String,
      default: function () {
        return "";
      },
    },
  },
};
//定义wappered boolean值是为了区别我自己定义的同名方法，可忽略
export function calcHeightx(value, wappered = true) {
  //项目自定义的公共header部分的高度，可忽略
  let header = variable.headerHeight;
  //value为动态计算table界面高度时，减去的其他空白部分，需自行在调试找到临界值，剩下的就是table表格的高度（包含header+body部分）
  value = value == undefined ? 100 : value;
  let res =
    window.innerHeight -
    parseInt(header.substring(0, header.indexOf("px"))) -
    value;
  if (wappered) {
    //通过原生方法，获取dom节点的高度------获取element-ui table表格body的元素
    let wapper = window.document.getElementsByClassName(
      "el-table__body-wrapper"
    );
    //通过原生方法，获取dom节点的高度------获取element-ui table表格header的元素
    let header = window.document.getElementsByClassName(
      "el-table__header-wrapper"
    );
    //必须加延时，要不然赋不上去值
    setTimeout(() => {
      //通过上边计算得到的table高度的value值，减去table表格的header高度，剩下的通过dom节点直接强行赋给table表格的body
      wapper[0].style.height = value - header[0].clientHeight + "px";
    }, 100);
  }
  return res;
}
</script>
