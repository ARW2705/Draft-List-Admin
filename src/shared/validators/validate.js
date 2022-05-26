export function validate(value, validators) {
  const errors = {}
  if (!validators || !validators.length) return errors

  validators.forEach(validator => {
    Object.assign(errors, validator(value))
  })

  return errors
}
