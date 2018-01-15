import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, pathToJS } from 'react-redux-firebase';
import PropTypes from 'prop-types';

import { FacebookLoginButton, GoogleLoginButton } from 'react-social-login-buttons';

@firebaseConnect()
@connect(({ firebase }) => ({
  authError: pathToJS(firebase, 'authError')
}))

export default class ProviderLogin extends Component {
  static proptypes = {
    firebase: PropTypes.shape({
      login: PropTypes.func.isRequired
    })
  }

render() {

  const { firebase } = this.props

  const googleLogin = loginData => {
      firebase.login({ provider: 'google', type: 'popup' })
  }

  const facebookLogin = loginData => {
    firebase.login({ provider: 'facebook' })
  }

  return (
    <div>
      <p>Or</p>
    <div className="social-login">
      <FacebookLoginButton
        appId="144263412864280"
        autoLoad={false}
        fields="name, email, picture"
        onClick={facebookLogin}
        text="Login with Facebook"
        />
      <GoogleLoginButton 
        onClick={googleLogin}
        text="Login with Google"
      />
    </div>
  </div>
  )
}
}
