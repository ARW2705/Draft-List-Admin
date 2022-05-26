import React, { Component } from 'react'


function buildForm(FormGroupComponent) {
  class Form extends Component {
    constructor(props) {
      super(props)
      this.state = {
        ...props,
        updateForm: this.updateForm.bind(this)
      }
    }

    updateForm(name, value, errors, form) {
      return this.handleOnChanges(name, value, this.updateValue(name, value, errors, form))
    }

    updateValue(name, value, errors, form) {
      const updateField = {
        ...form[name],
        value,
        errors
      }
      return {
        ...form,
        [name]: updateField
      }
    }

    handleOnChanges(name, value, form) {
      const { onChanges } = this.state.form
      const formUpdate = {}
      if (onChanges && onChanges[name]) {
        const onChange = onChanges[name]
        for (const formField in onChange) {
          const field = form[formField]
          const optionsUpdate = {}
          for (const propKey in onChange[formField]) {
            Object.assign(
              optionsUpdate,
              {
                [propKey]: onChange[formField][propKey](value)
              }
            )
          }

          Object.assign(
            formUpdate,
            {
              [formField]: {
                ...field,
                options: {
                  ...field.options,
                  ...optionsUpdate
                }
              }
            }
          )
        }
      }

      return {
        ...form,
        ...formUpdate
      }
    }

    render() {
      return <FormGroupComponent {...this.props} {...this.state} />
    }
  }

  return Form
}

export default buildForm
