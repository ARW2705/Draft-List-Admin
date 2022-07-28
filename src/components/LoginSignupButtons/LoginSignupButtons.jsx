import React from 'react'

import Button from '../Common/Button/Button'


function LoginSignupButtons({ handleOnClick, isLoggedIn }) {
  return (
    <div
      className='login-signup-buttons-container'
      
    >
      {
        !isLoggedIn
        && (
          <>
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
          </>
        )
      }
      { 
        isLoggedIn
        && (
          <Button
            text='Logout'
            customClass='form-button'
            onClick={ handleOnClick }
          />
        )
      }
    </div>
  )
}

export default LoginSignupButtons
