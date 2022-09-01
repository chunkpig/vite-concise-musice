function debounce(func: Function, delay: number, immediate = false) {
  let timer: any | undefined

  return (...args: any) => {
    if (immediate && !timer) {
      func(...args)
      immediate = false
      return
    }
    clearTimeout(timer)
    timer = setTimeout(() => {
      func(...args)
    }, delay)
  }
}
export default debounce
