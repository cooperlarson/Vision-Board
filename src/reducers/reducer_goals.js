import _ from 'lodash';
import { FETCH_GOALS } from '../actions';
import ActionTypes from '../constants';

export const initialState = {
  title: '',
  description: '',
  imgUrl: '',
  due: '',
  goals: []
}

export default function(state = {}, action) {
  switch(action.type) {
    case ActionTypes.GetGoalRequested: {
      return Object.assign({}, state, {
        inProgress: true,
        error: '',
        success: ''
      });
    }
    case ActionTypes.GetGoalRejected: {
      return Object.assign({}, state, {
        inProgress: false,
        error: 'Error in getting invite.',
      });
    }
    case ActionTypes.GetGoalFulfilled: {
      const { title, description, imgUrl, due } = action.goals;
      const newState = Object.assign({}, state, {
        title: '',
        description: '',
        imgUrl: '',
        due: '',
        goals: []
      });
      newState.goals = [];
      if (goals) {
        newState.guests = Object.keys(goals).map(k => goals[k]);
      }
      return newState;
    }
    default:
      return state
  }
}
