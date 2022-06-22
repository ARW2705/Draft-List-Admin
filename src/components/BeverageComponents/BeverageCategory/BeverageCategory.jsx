import React, { useState } from 'react'

import Button from '../../Common/Button/Button'

import './BeverageCategory.css'


function BeverageCategory({ handleSelectCategory }) {
  const baseClass = 'category-button'

  const [buttonClasses, setButtonClasses] = useState({
    authored: `${baseClass} selected`,
    previous: baseClass,
    search: baseClass
  })

  const handleClick = ({ target }) => {
    const name = target.name.split('-')[0]
    setButtonClasses({
      authored: `${baseClass} ${name === 'authored' ? 'selected': ''}`,
      previous: `${baseClass} ${name === 'previous' ? 'selected': ''}`,
      search: `${baseClass} ${name === 'search' ? 'selected': ''}`
    })
    handleSelectCategory(name)
  }

  return (
    <section
      className='BeverageCategory'
      onClick={ handleClick }
    >
      <Button
        text='Authored Beverages'
        name='authored-category'
        customClass={ buttonClasses.authored }
      />
      <Button
        text='Previous Beverages'
        name='previous-category'
        customClass={ buttonClasses.previous }
      />
      <Button
        text='Search Beverages'
        name='search-category'
        customClass={ buttonClasses.search }
      />
    </section>
  )
}


export default React.memo(BeverageCategory)
