import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS } from 'react-redux-firebase';

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

class GoalItem extends Component {
  constructor(props) {
    super(props);
    this.state = {showGoalModal: false}
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }
  static propTypes = {
    goal: PropTypes.object,
    id: PropTypes.string,
    firebase: PropTypes.shape({
      remove: PropTypes.func.isRequired,
      update: PropTypes.func.isRequired
    }),
    auth: PropTypes.shape({
      uid: PropTypes.string
    })
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
    const {firebase, goal, auth, id} = this.props;

    const goalBgImg = {backgroundImage: `url(${goal.imgUrl})`};

    const deleteGoal = (event) => {
      firebase.remove(`/goals/${auth.uid}/${id}`)
    }

    const updateGoal = () => {
      firebase.update(`/goals/${auth.uid}/${id}`)
    }

    return (
      <div key={id} id={id} className="col-xs-12 col-sm-6 col-md-4 col-lg-3 goal-box">
      <div className="goal-item" style={goalBgImg}>
        <div className="goal-info" onClick={this.open}>
          <i className="fa fa-times-circle-o delete-goal" onClick={deleteGoal} aria-hidden="true"></i>
          <h3>{goal.title}</h3>
        </div>
      </div>
      <div>
      <Modal className="goalItemModal" show={this.state.showGoalModal} onHide={this.close}>
      <form id="updateGoalForm" className="updateGoalForm" onSubmit={updateGoal}>
        <Modal.Header closeButton>
          <Modal.Title>{goal.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img className="img-responsive" alt="" src={goal.imgUrl} />
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger" onClick={deleteGoal}>Delete</button>
        </Modal.Footer>
        </form>
      </Modal>
      </div>
      </div>
    )
  }
}
export default GoalItem
