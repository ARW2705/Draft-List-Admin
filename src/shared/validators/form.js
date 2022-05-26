function getFieldErrors(fields) {
  const errors = {}
  for (const field in fields) {
    if (fields[field].errors && Object.keys(fields[field].errors).length) {
      Object.assign(errors, { [field]: fields[field].errors })
    }
  }

  return errors
}

function validateFormLevel(fields, validators) {
  const errors = {}
  for (const key in validators) {
    Object.assign(errors, validators[key](fields))
  }

  return errors
}

function checkRequired(fields) {
  const errors = {}
  const isMissingRequired = field => {
    return field.validators.some(validator => validator.name === 'require' && !field.value)
  }

  for (const key in fields) {
    const field = fields[key]
    if (field.validators && field.validators.length && isMissingRequired(field)) {
      const requiredFields = errors.requiredFields ? [...errors.requiredFields, key] : []
      Object.assign(errors, { requiredFields })
    }
  }

  return errors
}

export function validateForm(fields, validators) {
  return {
    ...checkRequired(fields),
    ...getFieldErrors(fields),
    formLevel: {
      ...validateFormLevel(fields, validators)
    }
  }
}
