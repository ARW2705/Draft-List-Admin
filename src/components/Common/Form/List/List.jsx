import React, { Fragment, useState } from 'react'

import Button from '../../Button/Button'

import hyphenify   from '../../../../shared/utilities/hyphenify'
import toTitleCase from '../../../../shared/utilities/title-case'

import './List.css'


function FormList(props) {
  const { config, handleOnChange } = props
  const { name, value, label, list, displayKeys } = config

  const [ selectedIndex, setSelectedIndex ] = useState(value ? 0 : -1)
  const [ attrs, setAttrs ] = useState({
    value,
    label: toTitleCase(label || name),
    id: hyphenify(`form-input-${name}`)
  })

  const buildButtonContent = item => {
    return displayKeys.map((key, index) => {
      let content = <span key={ key }>{ toTitleCase(item[key]) }</span>
      if (index !== displayKeys.length - 1) {
        content = (
          <Fragment key={ key }>
            { content }
            <span className='content-separator'>•</span>
          </Fragment>
        )
      }

      return content
    })
  }

  const handleClick = index => {
    const value = list[index]
    setAttrs(prevProps => ({ ...prevProps, value }))
    setSelectedIndex(index)
    handleOnChange(name, value, {})
  }

  return (
    <div className='form-list-container'>
      <h3>{ attrs.label }</h3>
      <ul className='form-list'>
      {
        list.map((item, index) => (
          <li key={ index } className='form-list-item'>
            <Button
              content={ buildButtonContent(item) }
              onClick ={ () => handleClick(index) }
              customClass={`list-button ${selectedIndex === index ? 'active' : ''}`}
              name={`select ${name} button`}
              ariaLabel={`select ${name}`}
              isFlat={ true }
            />
          </li>
        ))
      }
      </ul>
    </div>
  )
}


export default React.memo(FormList)

