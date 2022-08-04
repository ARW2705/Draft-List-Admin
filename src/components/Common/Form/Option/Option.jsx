import React from 'react'

import './Option.css'


function FormOption({ label, value = '' }) {
  return (
    <option
      label={ label }
      value={ value }
    >
      { label }
    </option>
  )
}


export default React.memo(FormOption)
