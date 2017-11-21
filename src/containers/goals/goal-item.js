import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS, isEmpty } from 'react-redux-firebase';
import GoalItemModal from './goal-item-modal';
import '../../css/awesome-bootstrap-checkbox.css';

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
    const { firebase, goal, auth, id } = this.props;

    const isDone = () => {
      if (goal.done === true) {
        return (
          false
        );
      }
      if (goal.done === false || null || isEmpty) {
        return (
          true
        );
      }
    }

    const toggleDone = (done) => {
        firebase.set(`goals/${auth.uid}/${id}/done`, isDone());
    }

    const goalBgImg = {backgroundImage: `url(${goal.imgUrl})`};

    return (
      <div key={id} id={id} className="col-xs-12 col-sm-6 col-lg-4 goal-box">
      <div className="goal-item" style={goalBgImg}>
      <GoalItemModal auth={auth} id={id} goal={goal} />
      <div className="abc-checkbox abc-checkbox-success abc-checkbox-circle">
        <input type="checkbox" id="toggleDone" onClick={toggleDone} defaultChecked={goal.done === true} />
        <label />
      </div>
      </div>
      </div>
    )
  }
}
export default GoalItem
