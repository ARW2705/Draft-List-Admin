import React from 'react'

import user from '../../../services/User/User'

import FormGroup from '../../Common/Form/FormGroup/FormGroup'

import createForm from '../../../shared/form/create-form'
import { required } from '../../../shared/validators/validators'


function Login() {
  const form = createForm({
    fields: {
      username: {
        validators: [required()]
      },
      password: {
        validators: [required()],
        options: {
          type: 'password'
        }
      },
      remember: {
        element: 'checkbox',
        value: false,
        options: {
          label: 'remember me'
        }
      },
      showPassword: {
        element: 'checkbox',
        value: false,
        options: {
          label: 'show password'
        }
      }
    },
    onChanges: {
      showPassword: {
        password: {
          type: show => show ? 'text' : 'password'
        }
      }
    }
  })

  const handleSubmit = ({ username, password, remember }) => {
    user.login({ username, password, remember })
      .then(() => console.log('login complete'))
      .catch(error => {
        // TODO handle error feedback
      })
  }

  return (
    <FormGroup
      form={ form }
      submitHandler={ handleSubmit }
      customClass='login'
    />
  )
}

export default Login
