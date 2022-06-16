import { BehaviorSubject } from 'rxjs'

import { post } from '../HttpClient/HttpClient'
import token from '../Token/Token'
import { BASE_URL } from '../../shared/constants/base-url'


class User {
  constructor() {
    if (User._instance) return User._instance
    User._instance = this
    this.storageKey = 'user'
    this.user$ = new BehaviorSubject(null)
    this.baseRoute = `${BASE_URL}/users`
  }

  getUser() {
    return this.user$
  }

  getUserId() {
    return this.user$.value._id
  }

  getAuthoredList() {
    return this.getUser().value.authoredList
  }

  getPreviousList() {
    return this.getUser().value.previousList
  }

  setUser(user) {
    this.user$.next(user)
  }

  init() {
    if (this._isInitializing) return
    this._isInitializing = true
    const user = JSON.parse(localStorage.getItem(this.storageKey))
    console.log('got user from storage', user)
    this.user$.next(user)
  }

  handleUserResponse(user, remember) {
    const newUser = {
      _id: user._id,
      username: user.username,
      email: user.email
    }
    this.setUser(newUser)
    token.setToken(user.token)

    if (remember) {
      this.storeUser(newUser)
    }
  }

  login(credentials) {
    return post(`${this.baseRoute}/login`, credentials)
      .then(loginRes => {
        if (loginRes.success) {
          this.handleUserResponse(loginRes.user, credentials.remember)
          return
        }
        throw new Error('Error on login')
      })
      .catch(error => {
        console.error('error on login', error)
        throw error
      })
  }

  signup(userData) {
    console.log(`${this.baseRoute}/signup`)
    return post(`${this.baseRoute}/signup`, userData)
      .then(signupRes => {
        if (signupRes.success) {
          this.handleUserResponse(signupRes.user, userData.remember)
          return
        }
        throw new Error('Error on signup')
      })
      .catch(error => {
        console.error('error on signup', error)
        throw error
      })
  }

  logout() {
    this.setUser(null)
    localStorage.removeItem(this.storageKey)
  }

  storeUser(user) {
    localStorage.setItem(this.storageKey, JSON.stringify(user))
  }
}

const user = new User()

export default user