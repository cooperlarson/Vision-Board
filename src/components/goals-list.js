import React, { Component } from 'react';
import firebase from '../actions/firebase';
import { connect } from 'react-redux';
import { fetchGoals } from '../actions';
import _ from 'lodash';
import { initialState } from '../actions';

class GoalsList extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      imgUrl: '',
      due: ''
    };
  }

    // retrieving goals from database
  componentDidMount() {
    this.props.onFetchGoals();
  }

  render() {
    const { title, description, imgUrl, due } = this.props.goals;
    return (
      <section className='goals'>
        {goals.map((title, description, imgUrl, due) => {
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
        }
      );
    }
      </section>
    );
  }
}

function mapStateToProps(state) {
  return
    { goals: state.goals };
}

function mapDispatchToProps(dispatch) {
  return
    { onFetchGoals: () => dispatch(fetchGoals())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GoalsList);
