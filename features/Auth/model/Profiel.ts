import LoginData from '@features/Auth/model/LoginData'

class Profile {
  loginData = new LoginData()

  role = ''

  getAuthData () {
    return this.loginData
  }

  setAuthData (authData: LoginData) {
    this.loginData = authData
  }

  setUserRole (role: string) {
    this.role = role
  }

  getUserRole () {
    return this.role
  }

  clean () {
    this.loginData = new LoginData()
    this.role = ''
  }
}

export const profile = new Profile()
