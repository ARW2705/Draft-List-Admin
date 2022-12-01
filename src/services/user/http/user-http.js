import { post } from '../../http-client/http-client.service'

import { userRouteURL } from './user-route-url'

async function login(credentials) {
  const response = await post(`${userRouteURL}/login`, credentials)
  return response.user
}

async function signup(userData) {
  const response = await post(`${userRouteURL}/signup`, userData)
  return response.user
}

export {
  login,
  signup
}
