import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS, pathToJS } from 'react-redux-firebase';
import GoalForm from './newGoalForm';

@firebaseConnect()
@connect(({ firebase }) => ({
  goals: dataToJS(firebase, 'goals'),
  auth: pathToJS(firebase, 'auth'),
}))

export default class NewGoalForm extends Component {
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
firebase.push(`goals/${userId}`, newGoal)
.then(() => this.close)
}

  render() {
    return (
      <div>
        <GoalForm onSubmit={this.handleAdd} />
      </div>
    );
  }
}
