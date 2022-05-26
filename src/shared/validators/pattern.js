export function pattern(regex) {
  return value => {
    if (value === null || value === undefined || (value.length && !regex.test(value))) {
      return { pattern: true }
    }
    return null
  }
}
