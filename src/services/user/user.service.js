import { login as loginUser, signup as signupUser } from './http/user-http'


async function submitUser(isLogin, body) {
  const { username, remember } = body
  const fn = isLogin ? loginUser : signupUser
  try {
    const response = await fn(body)
    const { _id, email, beverageList, deviceList, token } = response
    return {
      token,
      user: {
        _id,
        username,
        email,
        beverageList,
        deviceList,
        remember
      }
    }
  } catch(error) {
    console.log(`${isLogin ? 'login' : 'signup'}`, error)
    throw error
  }
}


async function login(body) {
  return submitUser(true, body)
}

async function signup(body) {
  return submitUser(false, body)
}


export {
  login,
  signup
}
