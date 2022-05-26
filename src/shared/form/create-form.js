import hasValue from '../utilities/has-value'


function configFields(fields) {
  const configedFields = {}
  for (const key in fields) {
    const configedField = { ...fields[key] }
    if (!hasValue(fields[key], 'element')) {
      Object.assign(configedField, { element: 'input' })
    }
    if (!hasValue(fields[key], 'value')) {
      Object.assign(configedField, { value: '' })
    }
    Object.assign(configedFields, { [key]: configedField })
  }
  return configedFields
}

function configValidators(validators, fields) {
  const configedValidators = {}
  for (const key in validators) {
    Object.assign(configedValidators, { [key]: validators[key].bind(fields) })
  }

  return configedValidators
}

function createForm(config) {
  const { fields, onChanges, validators } = config
  const configedFields = configFields(fields)
  const configedValidators = configValidators(validators, configFields)

  return {
    onChanges,
    fields: configedFields,
    validators: configedValidators
  }
}

export default createForm
