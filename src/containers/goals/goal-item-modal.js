import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS } from 'react-redux-firebase';
import UpdateGoalModal from '../updateGoal/updateGoalModal';
import countdown from 'countdown';

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

export default class GoalItemModal extends Component {
  constructor(props) {
    super(props);
    this.state = {showGoalModal: false}
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }

  getInitialState() {
    return { showGoalModal: false };
  }

  close() {
    this.setState({ showGoalModal: false });
  }

  open() {
    this.setState({ showGoalModal: true });
  }

render() {
  const { auth, id, goal } = this.props;

  const CountDownOptions = (countdown.YEARS | countdown.MONTHS | countdown.DAYS);

  const CountDown = countdown( new Date(goal.yearDue, goal.monthDue), null, CountDownOptions ).toString();

  return (
  <div>
  <div className="goal-info" onClick={this.open}>
    <h3>{goal.title}</h3>
    <h4>{CountDown}</h4>
  </div>
<Modal className="goalItemModal" show={this.state.showGoalModal} onHide={this.close}>
<Modal.Header closeButton>
<UpdateGoalModal auth={auth} id={id} goal={goal} />
  <Modal.Title>
  {goal.title}
  </Modal.Title>
</Modal.Header>
<Modal.Body>
  <div className="goal-description">{goal.description}</div>
  <img className="img-responsive" alt="" src={goal.imgUrl} />
</Modal.Body>
<Modal.Footer>
<span className="goal-due-text">Due:</span> {CountDown}
</Modal.Footer>
</Modal>
</div>
  )
}
}
