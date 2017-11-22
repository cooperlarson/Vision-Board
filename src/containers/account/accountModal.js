import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import NewPasswordModal from './Password/emailPassModal';
import UpdateAccountModal from './Update/updateAccountModal';
import SignupModal from '../Signup/signup-modal';

@firebaseConnect(
  ({ auth }) => ([
    // Get auth from props
    `/users/${auth.uid}`
  ])
)
@connect(
  ({ firebase }, { auth }) => ({
     // pathToJS(firebase, 'auth') gets from redux, but auth is already a prop
    avatar: dataToJS(firebase, `/users/${auth.uid}/avatarUrl`),
    displayName: dataToJS(firebase, `/users/${auth.uid}/displayName`),
    username: dataToJS(firebase, `/users/${auth.uid}/username`),
    email: dataToJS(firebase, `/users/${auth.uid}/email`)
  })
)

export default class UserProfileModal extends Component {
  constructor(props) {
    super(props);
    this.state = {showProfileModal: false}
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }

  static propTypes = {
    avatar: PropTypes.string,
    displayName: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string
  }

  getInitialState() {
    return { showProfileModal: false };
  }

  close() {
    this.setState({ showProfileModal: false });
  }

  open() {
    this.setState({ showProfileModal: true });
  }

  render() {
    const { auth, avatar, displayName, username, email } = this.props

    const isAnonymous = auth.isAnonymous;

  if (!isAnonymous) {
    return (
      <div className="user-nav">
      <div className="user-profile-name">Welcome,<br/><span className="display-name" onClick={this.open}>{displayName ? displayName : username ? username : 'User'}</span></div>
      <img className="profile-avatar" alt="user" onClick={this.open} src={avatar ? avatar : 'http://res.cloudinary.com/ddddyraui/image/upload/v1510783413/avatar-default_tzstp0.png'} />
      <Modal className="UserProfileModal" show={this.state.showProfileModal} onHide={this.close}>
      <Modal.Header closeButton>
        <UpdateAccountModal auth={auth} />
        <Modal.Title>
        <img className="profile-avatar-lg" alt="user" src={avatar ? avatar : 'http://res.cloudinary.com/ddddyraui/image/upload/v1510783413/avatar-default_tzstp0.png'} />
        <div>{displayName}</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="user-profile-body">
        <div><strong>Email: </strong>{email}</div>
        <div><strong>Username: </strong>{username}</div>
        <NewPasswordModal />
      </Modal.Body>
      </Modal>
      </div>
    )
  }
  if (isAnonymous) {
    return (
      <div className="user-nav">
      <div className="user-profile-name">Welcome,<br/><span className="display-name" onClick={this.open}>Guest</span></div>
      <img className="profile-avatar" alt="user" onClick={this.open} src='http://res.cloudinary.com/ddddyraui/image/upload/v1510783413/avatar-default_tzstp0.png' />
      <Modal className="UserProfileModal" show={this.state.showProfileModal} onHide={this.close}>
      <Modal.Header closeButton>
        <Modal.Title>
          <img className="profile-avatar-lg" alt="user" src={avatar ? avatar : 'http://res.cloudinary.com/ddddyraui/image/upload/v1510783413/avatar-default_tzstp0.png'} />
          <div>Guest Account</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="user-profile-body">
          <button className="btn btn-primary guest-account-signup"><SignupModal /></button>
      </Modal.Body>
      </Modal>
      </div>
    )
  }
}
}
