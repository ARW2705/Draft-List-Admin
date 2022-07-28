import React, { useState } from 'react'

import Button from '../../Common/Button/Button'

import './BeverageCategory.css'


function BeverageCategory({ handleSelectCategory }) {
  const baseClass = 'category-button'

  const [ buttonClasses, setButtonClasses ] = useState({
    authored: `${baseClass} selected`,
    previous: baseClass,
    search: baseClass
  })

  const handleClick = buttonName => {
    setButtonClasses({
      authored: `${baseClass} ${buttonName === 'authored' ? 'selected': ''}`,
      previous: `${baseClass} ${buttonName === 'previous' ? 'selected': ''}`,
      search  : `${baseClass} ${buttonName === 'search'   ? 'selected': ''}`
    })
    handleSelectCategory(buttonName)
  }

  return (
    <div className='beverage-category'>
      <Button
        text='Authored Beverages'
        name='authored-category'
        customClass={ buttonClasses.authored }
        onClick={ () => handleClick('authored') }
      />
      <Button
        text='Previous Beverages'
        name='previous-category'
        customClass={ buttonClasses.previous }
        onClick={ () => handleClick('previous') }
      />
      <Button
        text='Search Beverages'
        name='search-category'
        customClass={ buttonClasses.search }
        onClick={ () => handleClick('search') }
      />
    </div>
  )
}


export default React.memo(BeverageCategory)
