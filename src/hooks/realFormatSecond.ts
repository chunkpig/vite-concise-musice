import { Ref, ref, reactive, watch } from 'vue'
/**
 * 将整数转换成 时：分：秒的格式
 * @param second 时间
 * @returns
 */
function realFormatSecond(second: any) {
  var secondType = typeof second

  if (secondType === 'number' || secondType === 'string') {
    second = parseInt(second)

    var hours = Math.floor(second / 3600)
    second = second - hours * 3600
    var mimute = Math.floor(second / 60)
    second = second - mimute * 60
    // hours + ':' +
    return ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2)
  } else {
    return '0:00:00'
  }
}
export default realFormatSecond
