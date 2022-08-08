import React, { useCallback, useEffect, useState } from 'react'

import Button from '../Button/Button'

import './DropDown.css'


function DropDown({ customClass, title, items, onSelect: handleOnSelect }) {
  const [ listItems, setListItems ] = useState([])

  const handleOnClick = useCallback(({ name }) => {
    handleOnSelect(name.toLowerCase())
  }, [handleOnSelect])

  useEffect(() => {
    setListItems(items.map((item, index) => {
      return (
        <li key={ `${item}-${index}` }>
          <Button
            customClass='drop-down'
            isDisabled={ false }
            text={ item }
            onClick={ handleOnClick }
          />
        </li>
      )
    }))
  }, [items, handleOnClick])

  return (
    <div className={ `drop-down-container ${customClass || ''}` }>
      <span>{ title }</span>
      <ul>
        { listItems }
      </ul>
    </div>
  )
}


export default React.memo(DropDown)
