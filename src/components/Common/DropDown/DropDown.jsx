import React, { useEffect, useState } from 'react'

import Button from '../Button/Button'

import './DropDown.css'


function DropDown({ customClass, title, items, onSelect: handleOnSelect, isStaticTitle }) {
  const [ listItems, setListItems ] = useState([])
  const [ menuTitle, setMenuTitle ] = useState(title)
  const [ showList, setShowList ] = useState(false)

  useEffect(() => {
    setMenuTitle(title)
  }, [title])

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

  const handleClick = event => {
    event.preventDefault()
    const { name } = event.target.tagName.toLowerCase() === 'button' ? event.target : event.target.parentElement
    setShowList(!name)
    if (name) {
      if (!isStaticTitle) setMenuTitle(name)
      setShowList(false)
      handleOnSelect(name)
    }
  }

  return (
    <div
      className={ `drop-down-container ${customClass || ''}` }
      onMouseLeave={ () => setShowList(false) }
      onClick={ handleClick }
    >
      <span>{ menuTitle }</span>
      {
        showList && <ul>{ listItems }</ul>
      }
    </div>
  )
}


export default React.memo(DropDown)
