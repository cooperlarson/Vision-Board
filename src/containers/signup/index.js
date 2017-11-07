import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { firebaseConnect } from 'react-redux-firebase';
import FormSignup from './signupForm';

  class SignupForm extends Component {
    static proptypes = {
      firebase: PropTypes.object
    }

  // Call with info
  handleSignup = ({ email, password, username }) => {
    this.props.firebase.createUser(
      { email, password },
      { username, email }
    )
    username = '';
    email = '';
    password = '';
  }

  render() {
    return (
      <FormSignup onSubmit={this.handleSignup} />
  );
}
}

export default firebaseConnect()(SignupForm)
