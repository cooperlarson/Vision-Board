import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import SignupModal from '../Signup/signup-modal';

@firebaseConnect(
  ({ auth }) => ([
    // Get auth from props
    `/users/${auth.uid}`
  ])
)
@connect(({ firebase }, { auth }) => ({}))

export default class GuestLogoutModal extends Component {
  constructor(props) {
    super(props);
    this.state = {guestLogoutModal: false}
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }

  getInitialState() {
    return { guestLogoutModal: false };
  }

  close() {
    this.setState({ guestLogoutModal: false });
  }

  open() {
    this.setState({ guestLogoutModal: true });
  }

  handleLogout = () => {
    const { firebase, auth } = this.props;
    firebase.logout()
    if (auth.isAnonymous) {
      firebase.auth().currentUser.delete();
      firebase.remove(`/goals/${auth.uid}`);
    }
  }

render() {
  return (
<div>
<button className="btn btn-danger" onClick={this.open}>Logout</button>
<Modal className="guestLogoutModal" show={this.state.guestLogoutModal} onHide={this.close}>
<Modal.Header closeButton>
  <Modal.Title><span className="text-danger">Alert: </span>Vision Board Will Be Deleted</Modal.Title>
</Modal.Header>
<Modal.Body>
  <div>Create an account to save your changes, or confirm logout below</div>
</Modal.Body>
<Modal.Footer>
    <button className="btn btn-primary guest-account-signup"><SignupModal /></button>
    <button className="btn btn-danger logout" onClick={this.handleLogout}>Logout</button>
</Modal.Footer>
</Modal>
</div>
  )
}
}
