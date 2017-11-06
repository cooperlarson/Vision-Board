import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  dataToJS,
} from 'react-redux-firebase';
import GoalItem from './goal-item';

class GoalsList extends Component {
  static propTypes = {
    goals: PropTypes.object
  }

  render() {
    const { goals } = this.props;

    const goalsList = !isLoaded(goals)
      ? 'Loading'
      : isEmpty(goals)
        ? 'Goals list is empty'
        : Object.keys(goals).map((id) => (
            <GoalItem key={id} goal={goals[id]} />
          ))
    return (
      <section className='goals'>
      {goalsList}
      </section>
    );
  }
}

export default compose(
  firebaseConnect([
    '/goals'
  ]),
  connect(
    ({ firebase }) => ({
      goals: dataToJS(firebase, 'goals')
    })
  )
)(GoalsList)
