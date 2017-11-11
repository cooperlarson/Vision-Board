import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  dataToJS
} from 'react-redux-firebase';
import GoalItem from './goal-item';

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

export default class GoalsList extends Component {
  static propTypes = {
    goals: PropTypes.object,
    firebase: PropTypes.shape({
      push: PropTypes.func.isRequired
    }),
    auth: PropTypes.shape({
      uid: PropTypes.string
    })
  }

  render() {
    const { goals } = this.props;

    const goalsList = !isLoaded(goals)
      ? 'Loading'
      : isEmpty(goals)
        ? 'Goals list is empty'
        : Object.keys(goals).map((id) => (
            <GoalItem auth={this.props.auth} key={id} id={id} goal={goals[id]} />
          ))
    return (
      <section className='goals'>
      {goalsList}
      </section>
    );
  }
}

