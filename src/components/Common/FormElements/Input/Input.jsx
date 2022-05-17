import React, { Component } from 'react'

import toTitleCase from '../../../../shared/utilities/title-case'
import hyphenify from '../../../../shared/utilities/hyphenify'


class FormInput extends Component {
  constructor(props) {
    super(props)
    const { name, type, value, changeHandler } = props.config
    this.state = {
      name,
      type,
      value,
      changeHandler,
      displayName: toTitleCase(name),
      id: hyphenify(name)
    }
  }

  componentDidUpdate(prevProps) {
    const update = {}
    if (prevProps.config.value !== this.props.config.value) {
      update.value = this.props.config.value
    }
    if (prevProps.config.type !== this.props.config.type) {
      update.type = this.props.config.type
    }

    if (Object.keys(update).length > 0) {
      this.setState(prevProps => ({ ...prevProps, ...update }))
    }
  }

  render() {
    return (
      <label htmlFor={ this.state.id }>
        { this.state.displayName }
        <input
          id={ this.state.id }
          name={ this.state.name }
          type={ this.state.type }
          value={ this.state.value }
          onChange={ this.state.changeHandler }
        />
      </label>
    )
  }
}

export default FormInput
