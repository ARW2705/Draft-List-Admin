import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { set as setToken } from '../../../services/token/store/token.slice'
import { set as setUser } from '../../../services/user/store/user.slice'
import { login } from '../../../services/user/user.service'
import { refreshUserLists } from '../../../services/user/store/user.action'

import FormGroup from '../../Common/Form/FormGroup/FormGroup'
import Toast from '../../Common/Toast/Toast'

import createForm from '../../../shared/form/create-form'
import { required } from '../../../shared/validators/validators'

import './Login.css'


function LoginForm() {
  const [ error, setError ] = useState(null)

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
        const { user, token } = await login(data)
        dispatch(setUser(user))
        dispatch(setToken(token))
        refreshUserLists()
        navigate(-1)
      } catch(error) {
        setError(`Login error: ${error.publicMessage}`)
      }
    }
  }

  return (
    <>
      {
        error
        && <Toast
          customOverlayClass='toast-background'
          message={ error }
          dismiss={ () => setError(null) }
        />
      }
      <FormGroup
        form={ form }
        submitHandler={ handleSubmit }
        customClass='login'
        title='Log In'
      />
    </>
  )
}

export default React.memo(LoginForm)
