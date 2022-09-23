import { BehaviorSubject } from 'rxjs'

import { get, post } from '../HttpClient/HttpClient'
import token from '../Token/Token'

import { userRouteURL } from './user-route-url'


class User {
  constructor() {
    if (User._instance) return User._instance
    User._instance = this
    this.storageKey = 'user'
    this.remember = false
    this.user$ = new BehaviorSubject({
      _id: null,
      username: null,
      email: null,
      beverageList: [],
      deviceList: []
    })
  }

  getUser() {
    return this.user$
  }

  getBeverageList() {
    return this.user$.value.beverageList
  }

  getDeviceList() {
    return this.user$.value.deviceList
  }

  setUser(user) {
    this.user$.next(user)
    console.log('user', this.user$.value)
    this.storeUser()
  }

  init() {
    if (this._isInitializing) return
    this._isInitializing = true
    const storedUser = JSON.parse(localStorage.getItem(this.storageKey))
    console.log('got user from storage', storedUser)
    if (storedUser) this.setUser(storedUser)
  }

  addBeverageToList(beverage) {
    const user = this.user$.value
    this.setUser({
      ...user,
      beverageList: [...user.beverageList, beverage._id]
    })
  }

  handleUserResponse(user, remember) {
    this.remember = remember
    const newUser = {
      _id: user._id,
      username: user.username,
      email: user.email,
      beverageList: user.beverageList,
      deviceList: user.deviceList
    }
    this.setUser(newUser)
    token.setToken(user.token, remember)
  }

  refreshUserDataFromServer() {
    return get(`${userRouteURL}`)
      .then(user => {
        if (user) {
          this.setUser(user)
        }
      })
      .catch(error => {
        console.error('error on user refresh', error)
        throw error
      })
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
      beverageList: [],
      deviceList: []
    })
    this.remember = false
    token.removeToken()
    localStorage.removeItem(this.storageKey)
  }

  storeUser() {
    if (this.remember) {
      localStorage.setItem(this.storageKey, JSON.stringify(this.user$.value))
    }
  }
}

const user = new User()

export default user
