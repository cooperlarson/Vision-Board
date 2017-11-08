import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { firebaseConnect, pathToJS } from 'react-redux-firebase';
import { connect } from 'react-redux';
import FormLogin from './loginForm';

@firebaseConnect()
@connect(({ firebase }) => ({
  authError: pathToJS(firebase, 'authError')
}))
  export default class LoginForm extends Component {
    static proptypes = {
      firebase: PropTypes.shape({
        login: PropTypes.func.isRequired
      })
    }

    handleLogin = loginData => {
      return this.props.firebase.login(loginData)
    }

  render() {
    return (
      <FormLogin onSubmit={this.handleLogin} />
  );
}
}
