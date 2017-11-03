import React, { Component } from 'react';
import './App.css';
import firebase from './firebase';

class App extends Component {
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
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

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

  //handling event change in form
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  //handling form submit
  handleSubmit(e) {
    e.preventDefault();
    const goalsRef = firebase.database().ref('goals');
    const goal = {
      title: this.state.title,
      description: this.state.description,
      imgUrl: this.state.imgUrl,
      due: this.state.due
    }
    goalsRef.push(goal);
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      due: ''
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Vision Board</h1>
        </header>
        <div className="container">
        <section className="new-goal">
          <form id="goalForm" onSubmit={this.handleSubmit}>
            <input type="text" name="title" placeholder="Title" onChange={this.handleChange} value={this.state.title} />
            <input type="text" name="description" placeholder="Description" onChange={this.handleChange} value={this.state.description} />
            <input type="text" name="imgUrl" placeholder="Image url" onChange={this.handleChange} value={this.state.imgUrl} />
            <input type="date" name="due" placeholder="Due Date" onChange={this.handleChange} value={this.state.due} />
            <button type="submit" form="goalForm" value="Submit">Add Item</button>
          </form>
        </section>
        <section className='goals'>
          <div className='goals-wrapper'>
            <ul className="goals-list">
              {this.state.goals.map((goal) => {
                const bgImg = {backgroundImage: `url(${goal.imgUrl})`}
                return (
                  <li key={goal.id}>
                    <div className="goal-item" style={bgImg}>
                      <div className="goal-info">
                        <h3>{goal.title}</h3>
                        <h4>{goal.description}</h4>
                        <p>Due: {goal.due}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
        </div>
      </div>
    );
  }
}

export default App;
