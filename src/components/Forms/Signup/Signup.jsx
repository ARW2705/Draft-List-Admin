import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { signup } from '../../../services/user/store/user.slice'

import FormGroup from '../../Common/Form/FormGroup/FormGroup'

import createForm from '../../../shared/form/create-form'
import { minLength, maxLength, required, pattern, isEqual } from '../../../shared/validators/validators'
import { PASSWORD_PATTERN } from '../../../shared/constants/password-pattern'
import { EMAIL_PATTERN }    from '../../../shared/constants/email-pattern'


function SignupForm() {
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

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleSubmit = async data => {
    if (!data) {
      navigate(-1)
    } else {
      try {
        const signupThunk = signup(data)
        dispatch(signupThunk)
        navigate(-1)
      } catch(error) {
        console.log('signup error', error)
      }
    }
  }

  return (
    <FormGroup
      form={ form }
      submitHandler={ handleSubmit }
      customClass='signup'
      title='Signup'
    />
  )
}

export default React.memo(SignupForm)
