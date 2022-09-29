/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/**
 * 防抖函數
 * @param {*} callback 回調函數
 * @param {*} delay 延遲
 * @returns 
 */
export const debounce = (callback, delay) => {
  // let now = null
  let timeoutId

  const scopeData = {}

  return new Proxy(() => {}, {
    // set (obj, key, value) {
    //   if (scopeData.hasOwnProperty(key)) {
    //     scopeData[key] = value
    //     return true
    //   }
    // },
    get (obj, key) {
      if (scopeData.hasOwnProperty(key)) {
        return scopeData[key]
      }
      return obj[key]
    },
    apply (obj, thisArg, params) {
      // now = +new Date()

      if (timeoutId) { clearInterval(timeoutId) }

      timeoutId = setTimeout(() => {
        callback.call(thisArg, ...params)
      }, delay)
    }
  })
}