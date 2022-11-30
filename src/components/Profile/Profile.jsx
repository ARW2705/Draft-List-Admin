import React from 'react'
import { useSelector } from 'react-redux'

import { selectProfile } from '../../services/user/store/user.selector'

import './Profile.css'


function Profile() {
  const { username, email } = useSelector(selectProfile)

  return (
    <>
      {
        (username && email) &&
        <div className="profile-container">
          <p>Username: <span className='user-value'>{ username }</span></p>
          <p>Email: <span className='user-value'>{ email }</span></p>
        </div>
      }
    </>
  )
}


export default React.memo(Profile)
