import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS } from 'react-redux-firebase';
import UpdateGoalForm from './updateGoalForm'

@firebaseConnect(
  ({ auth }) => ([
    // Get auth from props
    `/goals/${auth.uid}`
  ])
)
@connect(
  ({ firebase }, { auth }) => ({
     // pathToJS(firebase, 'auth') gets from redux, but auth is already a prop
     goals: dataToJS(firebase, `/goals/${auth.uid}`),
  })
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
    firebase.update(`/goals/${auth.uid}/${id}`, goal)
    .then(() => {
      this.close()
    })
  }

  const deleteGoal = (event) => {
    firebase.remove(`/goals/${auth.uid}/${id}`)
  }

  return (
  <div>
    <i class="fa fa-pencil-square-o" onClick={this.open} aria-hidden="true"></i>
<Modal className="UpdateGoalModal" show={this.state.updateGoalModal} onHide={this.close}>
<Modal.Header closeButton>
  <Modal.Title>Edit: {goal.title}</Modal.Title>
</Modal.Header>
<Modal.Body>
  <UpdateGoalForm goal={goal} onSubmit={updateGoal} />
</Modal.Body>
<Modal.Footer>
<button className="btn btn-danger" onClick={deleteGoal}>Delete</button>
</Modal.Footer>
</Modal>
</div>
  )
}
}
