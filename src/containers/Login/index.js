import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { firebaseConnect } from 'react-redux-firebase';
import FormLogin from './loginForm';

  class LoginForm extends Component {
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

export default firebaseConnect()(LoginForm)
