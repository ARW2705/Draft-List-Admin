export function maxLength(maxVal) {
  return value => {
    if (value === null || value === undefined || value.length > maxVal) {
      return { maxLength: { maxLength: maxVal, value } }
    }
    return null
  }
}
