import { selectFormComponent } from './select-form-component'


/**
 * Construct a form element component
 * 
 * @param: formField - object containing config data for a form field
 * A form field can use any of the following optional properties
 * {
 *   element: the type of form element, default is 'input'
 *   value: value to apply on first load, default is undefined
 *   validators: array of form validators to apply
 *   options: {
 *     label: element label
 *     type: form input 'type' (eg 'number' or 'email', default is 'text')
 *     selectOptions: array of options for 'select' form elements
 *   }
 * }
 * @param: name - the form field identifier name
 * @param: handleOnChange - callback function for form element's onChange event
 * @return: Form component
 */
function buildFormComponent(formField, name, handleOnChange) {
  const { element, value, validators, options } = formField
  const config = { value, name }
  if (options) {
    Object.assign(config, options)
  }

  return selectFormComponent(element, config, validators, handleOnChange)
}

/**
 * Construct form components for each form field
 * 
 * @param: formFields - object containing config data for each form field
 * @param: handleOnChange - callback function for onChange event
 * @return: array of form components
 */
function buildFormComponents(formFields, handleOnChange) {
  let formComponents = []
  for (const key in formFields) {
    formComponents = [
      ...formComponents,
      buildFormComponent(formFields[key], key, handleOnChange)
    ]
  }
  
  return formComponents
}


export { buildFormComponent, buildFormComponents }
