import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { firebaseConnect, pathToJS } from 'react-redux-firebase';
import ForgotPasswordForm from './forgotPassForm';

@firebaseConnect()
@connect(({ firebase }) => ({
  authError: pathToJS(firebase, 'authError')
}))

export default class ForgotPasswordModal extends Component {
  constructor(props) {
    super(props);
    this.state = {showForgotPassModal: false}
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }

  getInitialState() {
    return { showForgotPassModal: false };
  }

  close() {
    this.setState({ showForgotPassModal: false });
  }

  open() {
    this.setState({ showForgotPassModal: true });
  }

  sendRecoveryEmail = ({ email }) =>
  this.props.firebase
    .resetPassword(email)
    .then(() => {
      this.setState({
        message: 'Account Recovery Email Sent'
      })
    })
    .catch(err => {
      console.error('Error updating account', err) // eslint-disable-line no-console
      this.setState({ error_message: err.message || 'Error' })
      return Promise.reject(err)
    })

render() {
  return (
<div>
<p className="forgot-pass-text" onClick={this.open}>Forgot Password</p>
<Modal className="ForgotPasswordModal" show={this.state.showForgotPassModal} onHide={this.close}>
<Modal.Header closeButton>
  <Modal.Title>
    <div>Forgot Password</div>
  </Modal.Title>
</Modal.Header>
<Modal.Body>
    <div className="success_message">{this.state.message}</div>
    <div className="error_message">{this.state.error_message}</div>
    <ForgotPasswordForm onSubmit={this.sendRecoveryEmail} />
</Modal.Body>
</Modal>
</div>
  )
}
}
