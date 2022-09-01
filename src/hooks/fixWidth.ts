import { Ref, ref, reactive, watch } from 'vue'

/**
 * 计算文字宽度
 * @param value
 * @returns
 */
function fixWidth(value: string, num = 15) {
  let length = 0
  if (value.indexOf('(') != -1) {
    length = value.length * 16
  } else {
    length = value.length * 10 + num
  }
  if (length < 50) {
    length = 40
  }
  return length
}
export default fixWidth
