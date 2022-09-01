import Cookies from 'js-cookie'

/**
 * 获取cookies
 * @param key
 * @returns
 */
export function getCookies(key: string) {
  const value = Cookies.get(key)
  if (value === 'null' && value === 'undefined') {
    return false
  }
  return value
}
/**
 * 保存cookies
 * @param key
 * @returns
 */

export function setCookies(name: string, value: any) {
  return Cookies.set(name, value, { expires: 7 })
}

/**
 * 删除cookies
 * @param name
 * @returns
 */
export function removeCookies(name: string) {
  return Cookies.remove(name)
}
