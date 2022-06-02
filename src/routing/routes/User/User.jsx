import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import userService from '../../../services/User/User.service'

import SignupForm from '../../../components/Forms/Signup/Signup'


function User() {
  const [ component, setComponent ] = useState(null)

  useEffect(() => {
    const subscription = userService.getUser()
      .subscribe(
        user => {
          console.log('user update', user)
          if (user) {
            // set profile component
          } else {
            // set login/signup buttons component
          }
        },
        error => console.log('user error', error)
      )

    return () => subscription.unsubscribe()
  }, [])

  return (
    <main className="route user">
      { component ? component : <div>Error: Missing Component</div> }
    </main>
  )
}

export default User
