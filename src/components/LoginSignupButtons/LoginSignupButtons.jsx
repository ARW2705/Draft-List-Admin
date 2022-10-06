import React from 'react'

import Button from '../Common/Button/Button'

import './LoginSignupButtons.css'


function LoginSignupButtons({ handleOnClick, isLoggedIn }) {
  return (
    <div className={`login-signup-buttons-container ${ isLoggedIn ? 'logout' : '' }`}>
      {
        isLoggedIn
        ? (
          <Button
            text='Logout'
            customClass='form-button'
            onClick={ handleOnClick }
          />
        )
        : (
          <>
            <h2>Please log in or signup to continue</h2>
            <div className='login-signup-buttons'>
              <Button
                text='Login'
                customClass='form-button'
                onClick={ handleOnClick }
              />
              <Button
                text='Signup'
                customClass='form-button'
                onClick={ handleOnClick }
              />
            </div>
          </>
        )
      }
    </div>
  )
}

export default LoginSignupButtons
