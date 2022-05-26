import React, { Component } from 'react'

import Button from '../../Common/Button/Button'
import FormInput from '../../Common/Form/Input/Input'
import FormCheckbox from '../../Common/Form/Checkbox/Checkbox'
import FormGroup from '../../Common/Form/FormGroup/FormGroup'

import createForm from '../../../shared/form/create-form'
import { minLength, maxLength, required, pattern, isEqual } from '../../../shared/validators/validators'
import { PASSWORD_PATTERN } from '../../../shared/constants/password-pattern'
import { EMAIL_PATTERN } from '../../../shared/constants/email-pattern'


function SignupForm(props) {
  const form = createForm({
    fields: {
      username: {
        validators: [required(), minLength(6), maxLength(20)]
      },
      password: {
        validators: [required(), minLength(12), maxLength(30), pattern(PASSWORD_PATTERN)],
        options: {
          type: 'password'
        }
      },
      confirmPassword: {
        options: {
          label: 'confirm password',
          type: 'password'
        }
      },
      email: {
        validators: [required(), pattern(EMAIL_PATTERN)],
        options: {
          type: 'email'
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
        },
        confirmPassword: {
          type: show => show ? 'text' : 'password'
        }
      }
    },
    validators: {
      passwordMatch: isEqual('password', 'confirmPassword')
    }
  })

  const handleSubmit = event => {
    console.log('submit event', event)
  }

  return (
    <FormGroup
      form={ form }
      submitHandler={ handleSubmit }
      customClass='signup'
    />
  )
}

export default SignupForm
