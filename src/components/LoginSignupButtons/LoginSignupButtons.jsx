import React from 'react'

import Button from '../Common/Button/Button'


function LoginSignupButtons({ handleClick, isLoggedIn }) {
  return (
    <section
      className='login-signup-buttons-container'
      onClick={ handleClick }
    >
      { !isLoggedIn &&
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
      }
      { isLoggedIn &&
        <Button
          text='Logout'
          customClass='form-button'
        />
      }
    </section>
  )
}

export default LoginSignupButtons
