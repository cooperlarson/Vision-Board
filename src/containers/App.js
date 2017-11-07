import React, { Component } from 'react';
import '../css/App.css';
import ContentHeader from '../components/content-header';
import GoalsList from '../components/goals-list';
import Navbar from './navbar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="container-fluid">
          <ContentHeader />
          <GoalsList />
        </div>
      </div>
    );
  }
}

export default App;
