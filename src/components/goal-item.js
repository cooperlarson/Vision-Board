import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { firebase } from 'react-redux-firebase';

class GoalItem extends Component {
  static propTypes = {
    goal: PropTypes.object,
    id: PropTypes.string
  }

  render() {
    const {firebase, goal, id} = this.props

    const goalBgImg = {backgroundImage: `url(${goal.imgUrl})`};

    const deleteGoal = () => {
      firebase.remove(`/goals/${goal.id}`)
   }

    return (
      <div key={id} className="col-xs-12 col-sm-6 col-md-4 col-lg-3 goal-box">
      <div className="goal-item" style={goalBgImg}>
        <div className="goal-info">
          <i className="fa fa-times-circle-o delete-goal" onClick={deleteGoal} aria-hidden="true"></i>
          <h3>{goal.title}</h3>
          <p>Due: {goal.due}</p>
        </div>
      </div>
      </div>
    )
  }
}
export default firebase()(GoalItem)
