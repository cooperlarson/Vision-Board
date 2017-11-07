import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { firebase } from 'react-redux-firebase';
import PropTypes from 'prop-types';

class GoalModal extends Component {
  //setting initial state
  constructor(props) {
    super(props);
    this.state = {showModal: false};
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    }

    static proptypes = {
      goals: PropTypes.object,
      firebase: PropTypes.object
    }

  getInitialState() {
    return { showModal: false };
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  render() {
    const {firebase, goal, id} = this.props;

    const goalBgImg = {backgroundImage: `url(${goal.imgUrl})`};

    return (
      <div>
      <Modal className="modal-form" show={this.state.showModal} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>{goal.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div key={this.props.id} id={this.props.id} className="col-xs-12 col-sm-6 col-md-4 col-lg-3 goal-box">
      <div className="goal-item" style={goalBgImg}>
        <div className="goal-info">
          <h3>{goal.title}</h3>
          <p>Due: {goal.due}</p>
        </div>
      </div>
      </div>
        </Modal.Body>
        </Modal>
      </div>
    )
  }
}

export default firebase()(GoalModal);
