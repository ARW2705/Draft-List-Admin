import React from 'react'

import Button from '../Common/Button/Button'


function LoginSignupButtons({ handleOnClick, isLoggedIn }) {
  return (
    <div
      className='login-signup-buttons-container'
      onClick={ handleOnClick }
    >
      {
        !isLoggedIn
        && (
          <>
            <Button
              text='Login'
              customClass='form-button'
            />
            <Button
              text='Signup'
              customClass='form-button'
            />
          </>
        )
      }
      { 
        isLoggedIn
        && (
          <Button
            text='Logout'
            customClass='form-button'
          />
        )
      }
    </div>
  )
}

export default LoginSignupButtons
