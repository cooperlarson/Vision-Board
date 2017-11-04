import { combineReducers } from 'redux';
import GoalsReducer from './reducer_goals';

const rootReducer = combineReducers({
  goals: GoalsReducer
});

export default rootReducer;
