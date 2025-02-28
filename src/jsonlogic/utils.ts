export const bool = (value: any): boolean => {
  return !!value
}

export const cleanup = (obj: any): any => {
  if (obj === null) {
    return null
  }

  if (typeof obj !== "object") {
    return obj
  }

  if (Array.isArray(obj)) {
    const value = obj.map(cleanup).filter(bool)
    if (value.length === 0) return null
    return value
  }

  const keys = Object.keys(obj)

  if (keys.length === 1) {
    const key = keys[0]
    const value = obj[key]

    // If the key is "and" or "or" and the value is an array with only one element,
    // we can remove the key and return the value directly.
    if (key === "and" || key === "or") {
      if (Array.isArray(value)) {
        const newValue = value.map(cleanup).filter(bool)
        if (newValue.length === 0) return null
        if (newValue.length === 1) return cleanup(newValue[0])
        return { [key]: newValue }
      }
    }
  }

  const newObj: { [key: string]: any } = {}

  for (const key of keys) {
    const value = obj[key]

    if (Array.isArray(value) && value.length === 0) {
      continue
    }

    const newValue = cleanup(value)

    if (!newValue) {
      continue
    }

    newObj[key] = newValue
  }

  if (Object.keys(newObj).length === 0) {
    return null
  }

  return newObj
}
