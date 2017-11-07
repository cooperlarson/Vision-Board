import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import SignupForm from './';

class SignUpModal extends Component {
  //setting initial state
  constructor(props) {
    super(props);
    this.state = {signupModal: false};
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
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
    return (
      <div>
      <li className="nav-item" onClick={this.open}>Sign Up</li>
      <Modal className="modal-signup" show={this.state.signupModal} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SignupForm />
        </Modal.Body>
        </Modal>
      </div>
    )
  }


};

export default SignUpModal;
