import React, { useCallback, useEffect, useState } from 'react'

import Spinner    from '../../Loaders/Spinner/Spinner'
import Button     from '../../Button/Button'

import hyphenify    from '../../../../shared/utilities/hyphenify'
import toTitleCase  from '../../../../shared/utilities/title-case'

import './List.css'


function FormList(props) {
  const { config, handleOnChange, customClass = '' } = props
  const { name, value, label, list, displayKeys } = config

  const [ listComponent, setListComponent ] = useState([])
  const [ selectedIndex, setSelectedIndex ] = useState(value ? 0 : -1)
  const [ attrs, setAttrs ] = useState({
    value,
    label: toTitleCase(label || name),
    id: hyphenify(`form-input-${name}`)
  })

  const handleClick = useCallback(index => {
    const value = list[index]
    setAttrs(prevProps => ({ ...prevProps, value }))
    setSelectedIndex(index)
    handleOnChange(name, value, {})
  }, [name, list, handleOnChange])

  useEffect(() => {
    if (!list.length) setListComponent([<div>List is empty...</div>])

    setListComponent(
      <ul className='form-list'>
        {
          list.map((item, index) => (
            <li key={ index } className='form-list-item'>
              <Button
                content={<>
                  { displayKeys.map(key => (<span key={ key }>{ toTitleCase(item[key]) }</span>)) }
                </>}
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
    )
  }, [attrs, name, list, selectedIndex, displayKeys, handleClick, setListComponent])

  return (
    <div className={`form-list-container ${customClass}`}>
      <h3>{ attrs.label }</h3>
      { listComponent ?? <Spinner /> }
    </div>
  )
}

function compare(prevProps, nextProps) {
  return JSON.stringify(prevProps.config) === JSON.stringify(nextProps.config)
}

export default React.memo(FormList, compare)

