const hasOwn = Object.prototype.hasOwnProperty

function object_forEach<T> (object: T, callback: (value, key, obj) => void, thisArg?: typeof globalThis): T {
  thisArg = thisArg || window

  for (const key in object) {
    if (hasOwn.call(object, key)) {
      callback.call(thisArg, object[key], key, object)
    }
  }

  return object
}

function object_map<T, R> (object: T, callback: (value, key, obj) => void, thisArg?: typeof globalThis): R {
  thisArg = thisArg || window

  const resObj = {}

  for (const key in object) {
    if (hasOwn.call(object, key)) {
      resObj[(key as string)] = callback.call(thisArg, object[key], key, object)
    }
  }

  return (resObj as R)
}

function object_filter<T, R> (object: T, callback: (value, key, obj) => boolean, thisArg?: typeof globalThis): R {
  thisArg = thisArg || window

  const resObj = {}

  for (const key in object) {
    if (hasOwn.call(object, key) && callback.call(thisArg, object[key], key, object)) {
      resObj[(key as string)] = object[key]
    }
  }

  return (resObj as R)
}

function object_some<T> (object: T, callback: (value, key, obj) => boolean, thisArg?: typeof globalThis): boolean {
  thisArg = thisArg || window

  for (const key in object) {
    if (hasOwn.call(object, key) && callback.call(thisArg, object[key], key, object)) {
      return true
    }
  }

  return false
}

function object_every<T> (object: T, callback: (value, key, obj) => boolean, thisArg?: typeof globalThis): boolean {
  thisArg = thisArg || window

  for (const key in object) {
    if (hasOwn.call(object, key) && !callback.call(thisArg, object[key], key, object)) {
      return false
    }
  }

  return true
}

function object_reduce<T, R> (object: T, callback: (temp, value, key, obj) => R, temp: R, thisArg?: typeof globalThis): R {
  thisArg = thisArg || window

  for (const key in object) {
    if (hasOwn.call(object, key)) {
      temp = callback.call(thisArg, temp, object[key], key, object)
    }
  }

  return temp
}

export {
  object_forEach,
  object_map,
  object_filter,
  object_some,
  object_every,
  object_reduce
}