export function max(maxVal) {
  return value => {
    if (value === null || value === undefined || value > maxVal) {
      return { max: { max: maxVal, value } }
    }
    return null
  }
}
