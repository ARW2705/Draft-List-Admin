class Token {
  constructor() {
    if (Token._instance) return Token._instance
    Token._instance = this
    this.accessToken = localStorage.getItem('accessToken') || ''
  }

  getToken() {
    return this.accessToken
  }

  setToken(token) {
    this.accessToken = token
    localStorage.setItem('accessToken', token)
  }

  removeToken(tokenType, token) {
    localStorage.removeItem('accessToken')
    this.accessToken = ''
  }
}

const token = new Token()

export default token
