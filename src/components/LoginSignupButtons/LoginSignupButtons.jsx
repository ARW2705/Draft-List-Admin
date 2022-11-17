import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { selectIsLoggedIn } from '../../services/user/store/user.slice'

import { CLEAR_ALL } from '../../shared/constants/shared-event-names'

import Button from '../Common/Button/Button'

import './LoginSignupButtons.css'


function LoginSignupButtons() {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div className={`login-signup-buttons-container ${ isLoggedIn ? 'logout' : '' }`}>
      {
        isLoggedIn
        ? (
          <Button
            text='Logout'
            customClass='form-button'
            onClick={ () => dispatch({ type: CLEAR_ALL }) }
          />
        )
        : (
          <>
            <h2>Please log in or signup to continue</h2>
            <div className='login-signup-buttons'>
              <Button
                text='Login'
                customClass='form-button'
                onClick={ () => navigate(`${location.pathname}/login`) }
              />
              <Button
                text='Signup'
                customClass='form-button'
                onClick={ () => navigate(`${location.pathname}/signup`) }
              />
            </div>
          </>
        )
      }
    </div>
  )
}


export default React.memo(LoginSignupButtons)
