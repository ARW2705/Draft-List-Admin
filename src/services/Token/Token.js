class Token {
  constructor() {
    if (Token._instance) return Token._instance
    Token._instance = this
    this.storageKey = 'accessToken'
  }

  init() {
    this.accessToken = localStorage.getItem(this.storageKey)
  }

  getToken() {
    return this.accessToken
  }

  setToken(token, remember) {
    this.accessToken = token
    if (remember) {
      localStorage.setItem(this.storageKey, token)
    }
  }

  removeToken() {
    this.accessToken = ''
    localStorage.removeItem(this.storageKey)
  }
}

const token = new Token()

export default token
