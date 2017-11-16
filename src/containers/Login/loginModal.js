import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, pathToJS } from 'react-redux-firebase';
import { Modal } from 'react-bootstrap';
import LoginForm from './loginForm';
import ProviderLogin from './Provider';

@firebaseConnect()
@connect(({ firebase }) => ({
  authError: pathToJS(firebase, 'authError')
}))


class LoginModal extends Component {
  //setting initial state
  constructor(props) {
    super(props);
    this.state = {loginModal: false};
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    }

  getInitialState() {
    return { loginModal: false };
  }

  close() {
    this.setState({ loginModal: false });
  }

  open() {
    this.setState({ loginModal: true });
  }

  render() {

    const handleLogin = loginData => {
      this.props.firebase.login(loginData)
    }

    return (
      <div>
      <li className="nav-item" onClick={this.open}>Login</li>
      <Modal className="modal-signup" show={this.state.loginModal} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm onSubmit={handleLogin} />
          <ProviderLogin />
        </Modal.Body>
        </Modal>
      </div>
    )
  }


};

export default LoginModal;
