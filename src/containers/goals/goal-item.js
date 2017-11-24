import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import GoalItemModal from './goal-item-modal';
import '../../css/awesome-bootstrap-checkbox.css';

@firebaseConnect(
  ({ auth }) => ([])
)
@connect(
  ({ firebase }, { auth }) => ({})
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

    const toggleDone = (done) => {
      if (goal.done === false) {
        firebase.set(`goals/${auth.uid}/completed/${id}`, goal);
        firebase.set(`goals/${auth.uid}/completed/${id}/done`, true)
          .then(() => {
            firebase.remove(`goals/${auth.uid}/active/${id}`)
          })
      }
      if (goal.done === true) {
        firebase.set(`goals/${auth.uid}/active/${id}`, goal);
        firebase.set(`goals/${auth.uid}/active/${id}/done`, false)
          .then(() => {
            firebase.remove(`goals/${auth.uid}/completed/${id}`)
          })
      }
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
