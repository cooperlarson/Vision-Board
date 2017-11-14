import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS } from 'react-redux-firebase';
import GoalItemModal from './goal-item-modal';

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

  render() {
    const {goal, auth, id} = this.props;

    const goalBgImg = {backgroundImage: `url(${goal.imgUrl})`};

    return (
      <div key={id} id={id} className="col-xs-12 col-sm-6 col-lg-4 goal-box">
      <div className="goal-item" style={goalBgImg}>
      <GoalItemModal auth={auth} id={id} goal={goal} />
      </div>
      </div>
    )
  }
}
export default GoalItem
