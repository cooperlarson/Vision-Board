import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { firebaseConnect, pathToJS } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import SignupForm from './signupForm';
import GoogleButton from 'react-google-button';
import FacebookLogin from 'react-facebook-login';
import ForgotPasswordModal from '../Login/emailPassword/emailPasswordModal';

@firebaseConnect()
@connect(({ firebase }) => ({
  authError: pathToJS(firebase, 'authError'),
}))

export default class SignUpModal extends Component {
  //setting initial state
  constructor(props) {
    super(props);
    this.state = {signupModal: false};
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    }
  static proptypes = {
    firebase: PropTypes.shape({
      login: PropTypes.func.isRequired
    })
  }

  getInitialState() {
    return { signupModal: false };
  }

  close() {
    this.setState({ signupModal: false });
  }

  open() {
    this.setState({ signupModal: true });
  }

  render() {

  const { firebase } = this.props
  const user = firebase.auth().currentUser;

  const handleSignup = ({ email, password, username }) => {
    if (user == null) {
    firebase.createUser(
      { email, password },
      { username, email }
    )
  }
    if ( user !== null && user.isAnonymous) {
      const credential = firebase.auth.EmailAuthProvider.credential(email, password);
      user.linkWithCredential(credential).then(
        (user) => {
        console.log("Anonymous account successfully upgraded", user);
        firebase.set(`users/${user.uid}`, {email: email, username: username});
        this.close();
      },(error) => {
        console.log("Error upgrading anonymous account", error);
      });
    }
  }

  const googleLogin = loginData => {
    if (user == null) {
      firebase.login({ provider: 'google', type: 'popup' })
    }
    if (user !== null) {
      let provider = new firebase.auth.GoogleAuthProvider();
      user.linkWithPopup(provider).then(
        (user) => {
          let userInfo = user.user.providerData["0"];
          firebase.set(`users/${user.user.uid}`, {email: userInfo.email, displayName: userInfo.displayName, avatarUrl: userInfo.photoURL});
          this.close();
        console.log("Anonymous account successfully upgraded", user);
      },(error) => {
        console.log("Error upgrading anonymous account", error);
      });
    }
  }

  const facebookLogin = loginData => {
    if (user == null) {
    firebase.login({ provider: 'facebook' })
    }
    if (user !== null) {
      let provider = new firebase.auth.FacebookAuthProvider();
      user.linkWithPopup(provider).then(
        (user) => {
          let userInfo = user.user.providerData["0"];
          firebase.set(`users/${user.user.uid}`, {email: userInfo.email, displayName: userInfo.displayName, avatarUrl: userInfo.photoURL});
          this.close();
        console.log("Anonymous account successfully upgraded", user);
      },(error) => {
        console.log("Error upgrading anonymous account", error);
      });
    }
  }

    return (
      <div>
      <li className="nav-item" onClick={this.open}>Sign Up</li>
      <Modal className="modal-signup" show={this.state.signupModal} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SignupForm onSubmit={handleSignup}/>
          <p>Or</p>
          <div>
            <FacebookLogin
              appId="144263412864280"
              autoLoad={false}
              fields="name, email, picture"
              onClick={facebookLogin}>
              Login via Facebook
            </FacebookLogin>
          </div>
          <div className="social-login">
            <GoogleButton onClick={googleLogin} />
          </div>
        </Modal.Body>
        </Modal>
      </div>
    )
  }
}
