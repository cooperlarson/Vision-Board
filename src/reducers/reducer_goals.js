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
        title: '',
        description: '',
        imgUrl: '',
        due: '',
        goals: []
      });
    }
    case ActionTypes.GetGoalRejected: {
      return Object.assign({}, state, {
        error: 'Error in getting invite.'
      });
    }
    case ActionTypes.GetGoalFulfilled: {
      const { id, title, description, imgUrl, due } = action.goals;
      const newState = Object.assign({}, state, {
        id: '',
        title: title,
        description: description,
        imgUrl: imgUrl,
        due: due
      })
    }
    default:
      return state
  }
}
