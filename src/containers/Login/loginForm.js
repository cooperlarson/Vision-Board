import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firebaseConnect, pathToJS } from 'react-redux-firebase';
import { required, validateEmail } from '../../utils/form';
import { Field, reduxForm } from 'redux-form';
import { Checkbox } from 'react-bootstrap';
import GoogleButton from 'react-google-button';
import FacebookLogin from 'react-facebook-login';

@firebaseConnect()
@connect(({ firebase }) => ({
  authError: pathToJS(firebase, 'authError')
}))
class LoginForm extends Component {
  static proptypes = {
    firebase: PropTypes.shape({
      login: PropTypes.func.isRequired
    })
  }

  handleLogin = loginData => {
    return this.props.firebase.login(loginData)
  }

  googleLogin = loginData => {
    return this.props.firebase
      .login({ provider: 'google' })
      .then(() => {
        // this is where you can redirect to another route
      })
  }

  facebookLogin = loginData => {
    return this.props.firebase
      .login({ provider: 'facebook' })
      .then(() => {
        // this is where you can redirect to another route
      })
  }

  render() {
    return (
  <form id="loginForm" className="loginForm" onSubmit={this.handleLogin}>
    <div className="form-group">
    <label>Email</label>
    <Field
      name="email"
      className="form-control"
      component="input"
      validate={[required, validateEmail]}
    />
    </div>
    <label>Password</label>
    <div className="form-group">
    <Field
      name="password"
      className="form-control"
      component="input"
      type="password"
      validate={required}
    />
    </div>
    <div className="form-group">
      <button
        type="submit"
        className="btn btn-primary"
        value="submit"
        form="loginForm"
      >Login</button>
    </div>
    <div>
      <div>
        <p>Or</p>
      </div>
      <div>
        <FacebookLogin
          appId="144263412864280"
          autoLoad={false}
          fields="name, email, picture"
          onClick={this.facebookLogin}>
          Login via Facebook
        </FacebookLogin>
      </div>
      <div className="social-login">
        <GoogleButton onClick={this.googleLogin} />
      </div>
      <div>
      <Checkbox>
        Remember?
      </Checkbox>
      </div>
      <div>
        Forgot Password?
      </div>
    </div>
  </form>
    )
  }
}

export default reduxForm({
  form: 'loginForm'
})(LoginForm)
