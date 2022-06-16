import React from 'react'

import './Profile.css'


function Profile({ user }) {
  const { username, email } = user
  return (
    <section className="Profile">
      <p>{ username }</p>
      <p>{ email }</p>
    </section>
  )
}


export default React.memo(Profile)
