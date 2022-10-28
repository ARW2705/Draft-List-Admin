import React from 'react'

import FormCheckbox  from '../Checkbox/Checkbox'
import FormFileInput from '../FileInput/FileInput'
import ImageUpload   from '../ImageUpload/ImageUpload'
import FormInput     from '../Input/Input'
import FormSelect    from '../Select/Select'
import FormQuery     from '../Query/Query'
import FormList      from '../List/List'

/**
 * Construct a form element component for each form field
 * 
 * @param: formFields - object containing config data for a form field
 *   A form field can use any of the following optional properties
 *     {
 *       value: value to apply on first load, default is undefined
 *       validators: array of form validators to apply
 *       element: the type of form element, default is 'input'
 *       options: {
 *         label: element label
 *         type: form input 'type' eg 'number' or 'email', default is 'text'
 *         selectOptions: array of options for 'select' form elements
 *       }
 *     }
 * @param: handleOnChange - callback function for onChange event
 * @return: array of form components
 */
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
            validators={ validators }
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
            validators={ validators }
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
            validators={ validators }
            handleOnChange={ handleOnChange }
          />
        ]
        break
      case 'select':
        formComponents = [
          ...formComponents,
          <FormSelect
            key={ key }
            config={ config }
            validators={ validators }
            handleOnChange={ handleOnChange }
          />
        ]
        break
      case 'query':
        formComponents = [
          ...formComponents,
          <FormQuery
            key={ key }
            config={ config }
            validators={ validators }
            handleOnChange={ handleOnChange }
          />
        ]
        break
      case 'list':
        formComponents = [
          ...formComponents,
          <FormList
            key={ key }
            config={ config }
            validators={ validators }
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
