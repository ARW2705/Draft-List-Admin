import React, { useEffect, useState } from 'react'

import Button from '../Button/Button'

import './DropDown.css'


function DropDown({ customClass, title, items, handleOnSelect }) {
  const [ listItems, setListItems ] = useState([])

  const handleOnClick = event => {
    event.stopPropagation()
    handleOnSelect(event.target.name.toLowerCase())
  }

  useEffect(() => {
    setListItems(items.map((item, index) => {
      return (
        <li key={ `${item}-${index}` }>
          <Button
            customClass='drop-down'
            isDisabled={ false }
            text={ item }
          />
        </li>
      )
    }))
  }, [items])

  return (
    <div
      className={ `drop-down-container ${customClass || ''}`}
      onClick={ handleOnClick }
    >
      <span>{ title }</span>
      <ul>
        { listItems }
      </ul>
    </div>
  )
}


export default React.memo(DropDown)
