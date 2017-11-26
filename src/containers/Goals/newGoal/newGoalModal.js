import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS, pathToJS } from 'react-redux-firebase';
import NewGoalForm from './newGoalForm';

@firebaseConnect()
@connect(({ firebase }) => ({
  goals: dataToJS(firebase, 'goals'),
  auth: pathToJS(firebase, 'auth'),
}))

class NewGoalModal extends Component {
  //setting initial state
  constructor(props) {
    super(props);
    this.state = {showModal: false};
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    }

  static proptypes = {
    goals: PropTypes.object,
    firebase: PropTypes.object,
    auth: PropTypes.shape({
      uid: PropTypes.string
    })
  }

    //handling form submit
  handleAdd = (newGoal) => {
  const { firebase } = this.props;
  const userId = firebase.auth().currentUser.uid;
  firebase.push(`goals/${userId}/active`, newGoal)
  .then(() => {
    this.close()
  })
  }

  getInitialState() {
    return { showModal: false };
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  render() {
    return (
      <div>
      <button className="btn btn-primary add-new" onClick={this.open}>Add Goal</button>
      <Modal className="modal-form" show={this.state.showModal} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Goal To Vision Board</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NewGoalForm onSubmit={this.handleAdd} />
        </Modal.Body>
        </Modal>
      </div>
    )
  }


};

export default NewGoalModal;
