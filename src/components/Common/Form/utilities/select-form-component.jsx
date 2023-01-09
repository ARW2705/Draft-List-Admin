import React from 'react'

import FormCheckbox  from '../Checkbox/Checkbox'
import FormFileInput from '../FileInput/FileInput'
import ImageUpload   from '../ImageUpload/ImageUpload'
import FormInput     from '../Input/Input'
import FormSelect    from '../Select/Select'
import FormQuery     from '../Query/Query'
import FormList      from '../List/List'


/**
 * Select a configured Form Component
 * 
 * @param: element - name of element to get (eg 'input' or 'list')
 * @param: config - config object for the form component
 * @param: validators - array of validators to apply to the form component
 * @param: handleOnChange - 'onChange' callback function
 * @return: configured Form Component
 */
function selectFormComponent(element, config, validators, handleOnChange) {
  const key = config.name
  
  switch(element) {
    case 'input':
      return (
        <FormInput
          key={ key }
          config={ config }
          validators={ validators }
          handleOnChange={ handleOnChange }
        />
      )
    case 'checkbox':
      return (
        <FormCheckbox
          key={ key }
          config={ config }
          validators={ validators }
          handleOnChange={ handleOnChange }
        />
      )
    case 'file':
      return (
        <FormFileInput
          key={ key }
          config={ config }
          validators={ validators }
          handleOnChange={ handleOnChange }
        />
      )
    case 'image':
      return (
        <ImageUpload
          key={ key }
          config={ config }
          validators={ validators }
          handleOnChange={ handleOnChange }
        />
      )
    case 'select':
      return (
        <FormSelect
          key={ key }
          config={ config }
          validators={ validators }
          handleOnChange={ handleOnChange }
        />
      )
    case 'query':
      return (
        <FormQuery
          key={ key }
          config={ config }
          validators={ validators }
          handleOnChange={ handleOnChange }
        />
      )
    case 'list':
      return (
        <FormList
          key={ key }
          config={ config }
          validators={ validators }
          handleOnChange={ handleOnChange }
        />
      )
    default:
      throw new Error(`Invalid form element: ${element}`)
  }
}


export { selectFormComponent }
