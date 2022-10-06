import React from 'react'

import './Profile.css'


function Profile({ user }) {
  const { username, email } = user
  return (
    <div className="profile-container">
      <p>Username: <span className='user-value'>{ username }</span></p>
      <p>Email: <span className='user-value'>{ email }</span></p>
    </div>
  )
}


export default React.memo(Profile)
