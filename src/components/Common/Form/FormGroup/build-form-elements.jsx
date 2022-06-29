import React from 'react'

import FormFileInput from '../FileInput/FileInput'
import FormInput from '../Input/Input'
import FormCheckbox from '../Checkbox/Checkbox'
import ImageUpload from '../ImageUpload/ImageUpload'


const buildFormElements = (formFields, handleOnChange) => {
  let formComponents = []
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
        formComponents = [
          ...formComponents,
          <FormInput
            key={ key }
            config={ config }
            validators={ validators }
            handleOnChange={ handleOnChange }
          />
        ]
        break
      case 'checkbox':
        formComponents = [
          ...formComponents,
          <FormCheckbox
            key={ key }
            config={ config }
            handleOnChange={ handleOnChange }
          />
        ]
        break
      case 'file':
        formComponents = [
          ...formComponents,
          <FormFileInput
            key={ key }
            config={ config }
            handleOnChange={ handleOnChange }
          />
        ]
        break
      case 'image':
        formComponents = [
          ...formComponents,
          <ImageUpload
            key={ key }
            config={ config }
            handleOnChange={ handleOnChange }
          />
        ]
        break
      default:
        throw new Error(`Invalid form element: ${element}`)
    }
  }
  
  return formComponents
}

export default buildFormElements
