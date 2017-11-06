import database from './firebase';
import ActionTypes from '../constants';

export function fetchGoals() {
  return dispatch => {
    dispatch(getGoalRequestedAction());
    return database.ref('goals').on('value', snap => {
      const goalsRef = snap.val();
      dispatch(getGoalFulfilledAction(goalsRef))
    })
    .catch((error) => {
      console.log(error);
      dispatch(getGoalRejectedAction());
    });
  }
}

function getGoalRequestedAction() {
  return {
    type: ActionTypes.GetGoalRequested
  };
}

function getGoalRejectedAction() {
  return {
    type: ActionTypes.GetGoalRejected
  }
}

function getGoalFulfilledAction({ goalsRef }) {
  return {
    type: ActionTypes.GetGoalFulfilled,
    goalsRef
  };
}
