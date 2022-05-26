function hasValue(obj, key) {
  return (
    obj.hasOwnProperty(key)
    && obj[key] !== null
    && obj[key] !== undefined
  )
}

export default hasValue
