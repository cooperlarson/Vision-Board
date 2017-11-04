import React, { Component } from 'react';
import firebase from './firebase';

class GoalsList extends Component {
    //setting initial state
    constructor() {
      super();
      this.state = {
        title: '',
        description: '',
        imgUrl: '',
        due: '',
        goals: []
      }
    };

    // retrieving goals from database
  componentDidMount() {
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
      this.setState({
        goals: newState
      });
    });
  }

  removeItem(itemId) {
    const goalsRef = firebase.database().ref(`/goals/${itemId}`);
    goalsRef.remove();
  }

  render() {
    return (
      <section className='goals'>
        {this.state.goals.map((goal) => {
          const bgImg = {backgroundImage: `url(${goal.imgUrl})`}
          return (
            <div key={goal.id} className="col-xs-12 col-sm-6 col-md-4 col-lg-3 goal-box">
              <div className="goal-item" style={bgImg}>
                <div className="goal-info">
                  <i class="fa fa-times-circle-o delete-goal" aria-hidden="true" onClick={() => this.removeItem(goal.id)}></i>
                  <h3>{goal.title}</h3>
                  <p>Due: {goal.due}</p>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    );
  }
}

export default GoalsList;
