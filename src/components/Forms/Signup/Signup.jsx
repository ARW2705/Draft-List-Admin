import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { set as setToken } from '../../../services/token/store/token.slice'
import { set as setUser } from '../../../services/user/store/user.slice'
import { signup } from '../../../services/user/user.service'
import { refreshUserLists } from '../../../services/user/store/user.action'

import FormGroup from '../../Common/Form/FormGroup/FormGroup'
import Toast from '../../Common/Toast/Toast'
import Spinner from '../../Common/Loaders/Spinner/Spinner'

import createForm from '../../../shared/form/create-form'
import { minLength, maxLength, required, pattern, isEqual } from '../../../shared/validators/validators'
import { PASSWORD_PATTERN } from '../../../shared/constants/password-pattern'
import { EMAIL_PATTERN }    from '../../../shared/constants/email-pattern'


function SignupForm() {
  const [ error, setError ] = useState(null)
  const [ isLoading, setIsLoading ] = useState(false)

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
        setIsLoading(true)
        const { user, token } = await signup(data)
        dispatch(setUser(user))
        dispatch(setToken(token))
        refreshUserLists()
        navigate(-1)
      } catch(error) {
        setError(`Signup error: ${error.publicMessage}`)
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <>
      { isLoading && <Spinner text='Loggin in'/> }
      <Toast
        isOpen={ error }
        customOverlayClass='toast-background'
        message={ error }
        dismiss={ () => setError(null) }
      />
      <FormGroup
        form={ form }
        submitHandler={ handleSubmit }
        customClass='signup'
        title='Signup'
      />
    </>
  )
}

export default React.memo(SignupForm)
