import React, { Component } from 'react';
import '../css/App.css';
import ContentHeader from '../components/content-header';
import GoalsList from '../components/goals-list';
import Header from '../components/Header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="container-fluid">
          <ContentHeader />
          <GoalsList />
        </div>
      </div>
    );
  }
}

export default App;
