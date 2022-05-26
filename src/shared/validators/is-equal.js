export function isEqual() {
  const fieldNames = Array.from(arguments)
  if (!fieldNames || fieldNames.length < 2) {
    throw new Error('Validator "isEqual" requires at least two fields')
  }

  return fields => {
    if (!fieldNames.every(fieldName => fields[fieldName].value === fields[fieldNames[0]].value)) {
      return { isEqual: fieldNames }
    }
    return null
  }
}
