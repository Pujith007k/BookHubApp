import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showSubmitError: false, errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    console.log(errorMsg)
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="mainContainer">
        <img
          className="loginImage"
          src="https://res.cloudinary.com/dbvonytlq/image/upload/v1707314803/bookhubloginImage_wlpagg.png"
          alt="website login"
        />
        <div className="LoginbgContainer">
          <form className="formContainer" onSubmit={this.onSubmitForm}>
            <img
              className="websiteLogo"
              src="https://res.cloudinary.com/dbvonytlq/image/upload/v1707368077/Group_7731_1x_xx4e2k.png"
              alt="login website logo"
            />
            <div className="usernameContainer">
              <label htmlFor="username" className="label">
                Username*
              </label>
              <input
                type="text"
                className="input"
                id="username"
                value={username}
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="passwordContainer">
              <label htmlFor="password" className="label">
                Password*
              </label>
              <input
                type="password"
                className="input"
                id="password"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>
            <button type="submit" className="loginButton">
              Login
            </button>
            {showSubmitError && <p className="error-message">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
