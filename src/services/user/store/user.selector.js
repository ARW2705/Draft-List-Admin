function selectIsLoggedIn(state) {
  return state.user._id !== null
}

function selectProfile(state) {
  return {
    username: state.user.username,
    email: state.user.email
  }
}


export {
  selectIsLoggedIn,
  selectProfile
}
