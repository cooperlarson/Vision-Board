import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import UpdateGoalForm from './updateGoalForm'

@firebaseConnect(
  ({ auth }) => ([])
)
@connect(
  ({ firebase }, { auth }) => ({})
)

export default class UpdateGoalModal extends Component {
  constructor(props) {
    super(props);
    this.state = {updateGoalModal: false}
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }

  getInitialState() {
    return { updateGoalModal: false };
  }

  close() {
    this.setState({ updateGoalModal: false });
  }

  open() {
    this.setState({ updateGoalModal: true });
  }

render() {
  const { firebase, auth, id, goal } = this.props

  const updateGoal = (goal) => {
    firebase.update(`/goals/${auth.uid}/active/${id}`, goal)
    .then(() => {
      this.close()
    })
  }

  const deleteGoal = (event) => {
    firebase.remove(`/goals/${auth.uid}/active/${id}`)
  }

  return (
  <div>
    <i className="fa fa-pencil-square-o" onClick={this.open} aria-hidden="true"></i>
<Modal className="UpdateGoalModal" show={this.state.updateGoalModal} onHide={this.close}>
<Modal.Header closeButton>
  <i className="fa fa-trash-o" onClick={deleteGoal} aria-hidden="true"></i>
  <Modal.Title>Edit: {goal.title}</Modal.Title>
</Modal.Header>
<Modal.Body>
  <UpdateGoalForm goal={goal} onSubmit={updateGoal} />
</Modal.Body>
</Modal>
</div>
  )
}
}
