/**
 * 对比两个对象的值是否完全相等 返回值 true/false
 * @param {*} a 
 * @param {*} b
 */
export function isObjectValueEqual(a, b) {
  // 
  //取对象a和b的属性名
  var aProps = Object.getOwnPropertyNames(a);
  var bProps = Object.getOwnPropertyNames(b);
  let aIndex = aProps.indexOf("__ob__");
  if (aIndex != -1) {
    aProps.splice(aIndex, 1);
  }
  let bIndex = bProps.indexOf("__ob__");
  if (bIndex != -1) {
    bProps.splice(bIndex, 1);
  }
  //判断属性名的length是否一致
  if (aProps.length != bProps.length) {
    return false;
  }
  //循环取出属性名，再判断属性值是否一致
  for (var i = 0; i < aProps.length; i++) {
    var propName = aProps[i];
    if (a[propName] !== b[propName]) {
      return false;
    }
  }
  return true;
}
