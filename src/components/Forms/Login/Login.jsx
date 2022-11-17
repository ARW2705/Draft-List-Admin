import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { login } from '../../../services/user/store/user.slice'

import FormGroup from '../../Common/Form/FormGroup/FormGroup'

import createForm from '../../../shared/form/create-form'
import { required } from '../../../shared/validators/validators'


function LoginForm() {
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

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleSubmit = async data => {
    if (!data) {
      navigate(-1)
    } else {
      try {
        const loginThunk = login(data)
        dispatch(loginThunk)
        navigate(-1)
      } catch(error) {
        console.log('error on login', error)
      }
    }
  }

  return (
    <FormGroup
      form={ form }
      submitHandler={ handleSubmit }
      customClass='login'
      title='Log In'
    />
  )
}

export default React.memo(LoginForm)
