import React from 'react'
import { useSelector } from 'react-redux'

import { selectProfile } from '../../services/user/store/user.selector'

import './Profile.css'


function Profile() {
  const { username, email } = useSelector(selectProfile)

  return (
    <div className="profile-container">
      { username && <p>Username: <span className='user-value'>{ username }</span></p> }
      { email && <p>Email: <span className='user-value'>{ email }</span></p> }
    </div>
  )
}


export default React.memo(Profile)
