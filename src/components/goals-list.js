import React, { Component } from 'react';
import firebase from '../actions/firebase';
import { connect } from 'react-redux';
import { fetchGoals } from '../actions';
import _ from 'lodash';

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
    fetchGoals();
  }

  renderGoals() {
      return (
        this.state.goals.map((goal) => {
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
        })
      );
  }

  render() {
    return (
      <section className='goals'>
        {this.renderGoals()}
      </section>
    );
  }
}

function mapStateToProps(state) {
  return { goals: state.goals };
}

export default connect(mapStateToProps, {fetchGoals})(GoalsList);
