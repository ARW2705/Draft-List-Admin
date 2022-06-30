import React from 'react'

import './Profile.css'


function Profile({ user }) {
  const { username, email } = user
  return (
    <div className="Profile">
      <p>{ username }</p>
      <p>{ email }</p>
    </div>
  )
}


export default React.memo(Profile)
