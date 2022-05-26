export function required() {
  return function require(value) {
    if (value === null || value === undefined || (typeof value === 'string' && !value.length)) {
      return { required: true }
    }
    return null
  }
}
