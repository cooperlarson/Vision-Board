import database from './firebase';
import ActionTypes from '../constants';

export function fetchGoals() {
  return dispatch => {
    dispatch(getGoalRequestedAction());
    const goalsRef = database.ref('/goals');
    for (goal in goals);
      goalsRef.push({
        title,
        description,
        imgUrl,
        due
      })

      dispatch(getGoalFulfilledAction({ title, description, imgUrl, due }));
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

function getGoalFulfilledAction({ title, description, imgUrl, due }) {
  return {
    type: ActionTypes.GetGoalFulfilled,
    invite
  };
}
