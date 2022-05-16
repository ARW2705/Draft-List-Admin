import React, { Component } from 'react'

import Button from '../../Common/Button/Button'

// import userService from '../../services/User/User.service'


class SignupForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPassword: false,
      formValues: {
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        remember: false
      },
      submitButton: {
        disabled: true,
        text: 'Submit'
      }
    }
    this.handleFormChange = this.handleFormChange.bind(this)
    this.handleViewChange = this.handleViewChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleFormChange(event) {
    console.log('input change event', event)
    const { target } = event
    const value = target.type === 'checkbox' ? target.checked : target.value
    const { name } = target

    this.setState({
      formValues: {
        ...this.state.formValues,
        [name]: value
      }
    }, () => console.log(this.state.formValues))
  }

  handleViewChange(event) {
    console.log('view change event', event)
    const { target } = event
    const { checked } = target

    this.setState({
      showPassword: checked
    })
  }

  handleSubmit(event) {
    console.log('submit event', event, this.state)
    event.preventDefault()
  }

  render() {
    return (
      <form
        onSubmit={ this.handleSubmit }
        autocomplete='off'
        novalidate
      >
        <label for='username'>
          Username
          <input
            id='username'
            name='username'
            type='text'
            value={ this.state.formValues.username }
            onChange={ this.handleFormChange }
          />
        </label>
        <label for='password'>
          Password
          <input
            id='password'
            name='password'
            type={ this.state.showPassword ? 'text' : 'password' }
            value={ this.state.formValues.password }
            onChange={ this.handleFormChange }
          />
        </label>
        <label for='confirm-password'>
          Confirm Password
          <input
            id='confirm-password'
            name='confirmPassword'
            type={ this.state.showPassword ? 'text' : 'password' }
            value={ this.state.formValues.confirmPassword }
            onChange={ this.handleFormChange }
          />
        </label>
        <label for='email'>
          Email
          <input
            id='email'
            name='email'
            type='email'
            value={ this.state.formValues.email }
            onChange={ this.handleFormChange }
          />
        </label>
        <label for='show-password'>
          Show Password
          <input
            id='show-password'
            name='showPassword'
            type='checkbox'
            checked={ this.state.showPassword }
            onChange={ this.handleViewChange }
          />
        </label>
        <label for='remember'>
          Remember Me
          <input
            id='remember'
            name='remember'
            type='checkbox'
            checked={ this.state.formValues.remember }
            onChange={ this.handleFormChange }
          />
        </label>
        <Button button={ this.state.submitButton }/>
      </form>
    )
  }
}

export default SignupForm
