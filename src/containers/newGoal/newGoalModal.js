import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import NewGoalForm from './';

class NewGoalModal extends Component {
  //setting initial state
  constructor(props) {
    super(props);
    this.state = {showModal: false};
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
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
          <Modal.Title>Add New Goal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NewGoalForm />
        </Modal.Body>
        </Modal>
      </div>
    )
  }


};

export default NewGoalModal;