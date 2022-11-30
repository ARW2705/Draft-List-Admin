export function eitherOr(fieldName1, fieldName2) {
  return function(fields) {
    if (!fields[fieldName1]?.value && !fields[fieldName2]?.value) {
      return { eitherOr: { eitherOr: [fieldName1, fieldName2], value: [fields[fieldName1].value, fields[fieldName2].value] } }
    }
    return null
  }
}
