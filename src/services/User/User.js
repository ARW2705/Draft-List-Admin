import { BehaviorSubject } from 'rxjs'

import { post } from '../HttpClient/HttpClient'
import token from '../Token/Token'

import { userRouteURL } from './user-route-url'


class User {
  constructor() {
    if (User._instance) return User._instance
    User._instance = this
    this.storageKey = 'user'
    this.user$ = new BehaviorSubject({
      _id: null,
      username: null,
      email: null,
      authoredList: [],
      previousList: []
    })
  }

  getUser() {
    return this.user$
  }

  getAuthoredList() {
    return this.user$.value.authoredList
  }

  getPreviousList() {
    return this.user$.value.previousList
  }

  setUser(user) {
    this.user$.next(user)
  }

  init() {
    if (this._isInitializing) return
    this._isInitializing = true
    const storedUser = JSON.parse(localStorage.getItem(this.storageKey))
    console.log('got user from storage', storedUser)
    this.setUser(storedUser)
  }

  handleUserResponse(user, remember) {
    const newUser = {
      _id: user._id,
      username: user.username,
      email: user.email,
      authoredList: user.authoredList,
      previousList: user.previousList
    }
    this.setUser(newUser)
    token.setToken(user.token, remember)

    if (remember) {
      this.storeUser(newUser)
    }
  }

  login(credentials) {
    return post(`${userRouteURL}/login`, credentials)
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
    return post(`${userRouteURL}/signup`, userData)
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
    this.setUser({
      _id: null,
      username: null,
      email: null,
      authoredList: [],
      previousList: []
    })
    token.removeToken()
    localStorage.removeItem(this.storageKey)
  }

  storeUser(user) {
    localStorage.setItem(this.storageKey, JSON.stringify(user))
  }
}

const user = new User()

export default user
