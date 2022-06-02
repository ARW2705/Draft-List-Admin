import { BehaviorSubject } from 'rxjs'

import httpClient from '../HttpClient/HttpClient.service'
import tokenService from '../Token/Token.service'


class User {
  constructor() {
    if (User._instance) return User._instance
    User._instance = this
    this.storageKey = 'user'
    this.user$ = new BehaviorSubject(null)
  }

  getUser() {
    return this.user$
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

  login(credentials) {
    return httpClient.postUser('login', credentials)
      .then(loginRes => {
        if (loginRes.success) {
          const { user } = loginRes
          const newUser = {
            _id: user._id,
            username: user.username,
            email: user.email
          }
          this.setUser(newUser)
          tokenService.setToken(user.token)

          if (credentials.remember) {
            this.storeUser(newUser)
          }

          return null
        }
        throw new Error('Error on login')
      })
      .catch(error => {
        console.error('error on login', error)
        throw error
      })
  }

  signup(userData) {
    return httpClient.postUser('signup', userData)
      .then(signupRes => {
        if (signupRes.success) {
          const { user } = signupRes
          const newUser = {
            _id: user._id,
            username: user.username,
            email: user.email
          }
          this.setUser(newUser)
          tokenService.setToken(user.token)

          if (userData.remember) {
            this.storeUser(newUser)
          }

          return null
        }
        throw new Error('Error on signup')
      })
      .catch(error => {
        console.error('error on signup', error)
        throw error
      })
  }

  storeUser(user) {
    localStorage.setItem(this.storageKey, JSON.stringify(user))
  }
}

const user = new User()

export default user
