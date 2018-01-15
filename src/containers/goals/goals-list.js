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
import GoalsHeader from '../../components/goals_header';

@firebaseConnect(
  ({ auth }) => ([
    // Get auth from props
    `/goals/${auth.uid}/active`,
  ])
)
@connect(
  ({ firebase }, { auth }) => ({
     // pathToJS(firebase, 'auth') gets from redux, but auth is already a prop
     goals: dataToJS(firebase, `/goals/${auth.uid}/active`),
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
        ? <div className="empty-notice">Vision Board is empty</div>
        : Object.keys(goals).map((id) => (
            <GoalItem auth={this.props.auth} key={id} id={id} goal={goals[id]} />
          ))
    return (
      <section className='goals'>
      <GoalsHeader />
      {goalsList}
      </section>
    );
  }
}

