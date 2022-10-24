import React, { useCallback, useEffect, useState } from 'react'

import Button from '../Button/Button'

import './DropDown.css'


function DropDown({ customClass, title, items, onSelect: handleOnSelect, isStaticTitle }) {
  const [ listItems, setListItems ] = useState([])
  const [ menuTitle, setMenuTitle ] = useState(title)
  const [ showList, setShowList ] = useState({ show: false, latched: false })

  const handleOnClick = useCallback(({ name }) => {
    setShowList({ show: false, latched: true })
    if (!isStaticTitle) setMenuTitle(name)
    handleOnSelect(name.toLowerCase())
  }, [handleOnSelect, isStaticTitle])

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

  const handleOnHover = isHovering => {
    if (isHovering && !showList.latched) {
      setShowList({ show: true, latched: false })
    } else {
      setShowList({ show: false, latched: false })
    }
  }

  return (
    <div
      className={ `drop-down-container ${customClass || ''}` }
      onMouseEnter={ () => handleOnHover(true) }
      onMouseLeave={ () => handleOnHover(false) }
    >
      <span>{ menuTitle }</span>
      {
        showList.show
        && (
          <ul>
            { listItems }
          </ul>
        )
      }
    </div>
  )
}


export default React.memo(DropDown)
