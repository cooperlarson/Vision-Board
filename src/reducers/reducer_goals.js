import _ from 'lodash';
import { FETCH_GOALS, DELETE_GOAL } from '../actions';

const initialState = {
  title: '',
  description: '',
  imgUrl: '',
  due: '',
  goals: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_GOALS:
      return _.mapKeys(action.payload.data)
    case DELETE_GOAL:
      return _.omit(state, action.payload);
    default:
      return state
  }
}
