import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS } from 'react-redux-firebase';
import UpdateAccountForm from './updateAccountForm';
import ReauthModal from '../reauthModal';

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
  })
)

export default class UpdateAccountModal extends Component {
  constructor(props) {
    super(props);
    this.state = {updateAccountModal: false}
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }

  getInitialState() {
    return { updateAccountModal: false };
  }

  close() {
    this.setState({ updateAccountModal: false });
  }

  open() {
    this.setState({ updateAccountModal: true });
  }

render() {

  const updateAccount = newAccount => {
    const { firebase: { update }, auth } = this.props

    return update(`/users/${auth.uid}`, newAccount)
    .then(() => {this.close()})
  }

  return (
  <div>
<i className="fa fa-pencil-square-o" onClick={this.open} aria-hidden="true"></i>
<Modal className="updateAccountModal" show={this.state.updateAccountModal} onHide={this.close}>
<Modal.Header closeButton>
  <Modal.Title>Edit My Account</Modal.Title>
</Modal.Header>
<Modal.Body>
  <UpdateAccountForm user={this.props.user} onSubmit={updateAccount} />
</Modal.Body>
<Modal.Footer>
    <ReauthModal auth={this.props.auth} />
</Modal.Footer>
</Modal>
</div>
  )
}
}
