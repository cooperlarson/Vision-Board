import firebase from './firebase';

export const FETCH_GOALS = 'fetch_goals';
export const DELETE_GOAL = 'delete_goal';

export function fetchGoals() {
const goalsRef = firebase.database().ref('goals');
goalsRef.on('value', (snapshot) => {
  let goals = snapshot.val();
  let newState = [];
  for (let goal in goals) {
    newState.push({
      id: goal,
      title: goals[goal].title,
      description: goals[goal].description,
      imgUrl: goals[goal].imgUrl,
      due: goals[goal].due
    });
  }
});

return {
  type: FETCH_GOALS,
  payload: goalsRef
}
}

export function removeGoal(itemId) {
const goalsRef = firebase.database().ref(`/goals/${itemId}`);
goalsRef.remove();
}
