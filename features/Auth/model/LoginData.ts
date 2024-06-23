class LoginData {
    // TODO: переделать на loginOrEmail
    login = ''

    password = ''

    isContainsValues = () => !!this.login && !!this.password
}

export default LoginData
