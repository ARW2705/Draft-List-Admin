import React from 'react'

import FormInput from '../Input/Input'
import FormCheckbox from '../Checkbox/Checkbox'


const buildFormComponents = (formFields, handleOnChange) => {
  const formComponents = []
  for (const key in formFields) {
    const { element, value, options, validators } = formFields[key]
    const config = {
      value,
      name: key
    }
    if (options) {
      Object.assign(config, options)
    }

    switch(element) {
      case 'input':
        formComponents.push(
          <FormInput
            key={ key }
            config={ config }
            validators={ validators }
            handleOnChange={ handleOnChange }
          />
        )
        break
      case 'checkbox':
        formComponents.push(
          <FormCheckbox
            key={ key }
            config={ config }
            handleOnChange={ handleOnChange }
          />
        )
        break
      default:
        throw new Error(`Invalid form element: ${element}`)
    }
  }
  return formComponents
}

export default buildFormComponents
