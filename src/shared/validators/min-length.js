export function minLength(minVal) {
  return value => {
    if (value === null || value === undefined || (value.length && value.length < minVal)) {
      return { minLength: { minLength: minVal, value } }
    }
    return null
  }
}
