import React from 'react'

import DropDown from '../../DropDown/DropDown'

import toTitleCase from '../../../../shared/utilities/title-case'

import './Select.css'


function FormSelect(props) {
  const { config, handleOnChange } = props
  const { name, value, label, selectOptions } = config
  
  const optionLabels = selectOptions.map(option => option.label)
  let title = toTitleCase(label || name)
  if (value) {
    const option = selectOptions.find(selectOption => {
      return JSON.stringify(selectOption.value) === JSON.stringify(value)
    })
    if (option) title = option.label
  }

  const handleSelect = selectionLabel => {
    const { value } = selectOptions.find(option => option.label === selectionLabel)
    handleOnChange(name, value)
  }

  return (
    <div className='form-select-container'>
      <DropDown
        title={ title }
        items={ optionLabels }
        customClass='form-select-dropdown'
        onSelect={ handleSelect }
      />
    </div>
  )
}


export default React.memo(FormSelect)
