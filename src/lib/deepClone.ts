type SetFunInterface = (obj, key, value) => void 

function defaultSetFun(obj, key, value): void {
  obj[key] = value
}

interface Options {
  setFun?: SetFunInterface
  cover?: boolean
}

/**
 * 拷貝 array 或 object
 * @param {Object, Array} targetElement 需要被拷貝的對象
 * @param {Object, Array} origin 拷貝來源
 * @param {Ojbect} options
 */
function deepClone<T> (targetElement: unknown, origin: T, options?: Options): void {
  const target = targetElement || {}

  let setFun

  if (options !== undefined) {
    const { setFun: optionsSetFun } = options

    if (optionsSetFun === undefined) {
      setFun = defaultSetFun
    } else {
      setFun = optionsSetFun
    }
  } else {
    setFun = defaultSetFun
  }

  const hasOwn = Object.prototype.hasOwnProperty
  const toStr = Object.prototype.toString

  for (const prop in origin) {
    if (hasOwn.hasOwnProperty.call(origin, prop)) {
      switch (toStr.call(target[(prop as string)])) {
        case '[object Array]':
          // 如果 target 是 array
          switch (toStr.call(origin[prop])) {
            case '[object Array]':
              target[(prop as string)].push([])
              deepClone(target[(prop as string)], origin[prop])
              break
            case '[object Object]':
              target[(prop as string)].push({})
              deepClone(target[(prop as string)], origin[prop])
              break
            default:
              target[(prop as string)].push(origin[prop])
              break
          }
          break
        case '[object Object]':
          // 如果 target 是 object
          switch (toStr.call(origin[prop])) {
            case '[object Array]':
              target[(prop as string)] = []
              deepClone(target[(prop as string)], origin[prop])
              break
            case '[object Object]':
              target[(prop as string)] = {}
              deepClone(target[(prop as string)], origin[prop])
              break
            default:
              setFun(target, prop, origin[prop])
              break
          }
          break
        default:
          setFun(target, prop, origin[prop])
          break
      }
    }
  }
}

export {
  deepClone
}