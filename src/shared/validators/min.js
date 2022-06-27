export function min(minVal) {
  return value => {
    if (value === null || value === undefined || value < minVal) {
      return { min: { min: minVal, value } }
    }
    return null
  }
}
