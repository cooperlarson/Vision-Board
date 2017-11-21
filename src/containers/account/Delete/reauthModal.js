import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, pathToJS, dataToJS } from 'react-redux-firebase';
import { Modal } from 'react-bootstrap';
import LoginForm from '../../Login/loginForm';
import ProviderLogin from '../../Login/Provider';

@firebaseConnect(
  ({ auth }) => ([
    // Get auth from props
    `/users/${auth.uid}`
  ])
)
@connect(
  ({ firebase }, { auth }) => ({
     // pathToJS(firebase, 'auth') gets from redux, but auth is already a prop
     user: dataToJS(firebase, `/users/${auth.uid}`),
     authError: pathToJS(firebase, 'authError')
  })
)


class ReauthModal extends Component {
  //setting initial state
  constructor(props) {
    super(props);
    this.state = {ReauthModal: false};
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    }

  getInitialState() {
    return { ReauthModal: false };
  }

  close() {
    this.setState({ ReauthModal: false });
  }

  open() {
    this.setState({ ReauthModal: true });
  }

  render() {
    const deleteAccount = removeAccount => {
      const { firebase, auth } = this.props;
      let user = firebase.auth().currentUser;
      firebase.login(removeAccount);
      user.delete();
      firebase.remove(`/users/${auth.uid}`);
      firebase.remove(`/goals/${auth.uid}`);
    }

    return (
      <div>
      <button className="btn btn-danger delete-account" onClick={this.open}>Delete Account</button>
      <Modal className="modal-signup" show={this.state.ReauthModal} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>Sign-in to delete account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm onSubmit={deleteAccount} />
          <ProviderLogin />
        </Modal.Body>
        </Modal>
      </div>
    )
  }


};

export default ReauthModal;
