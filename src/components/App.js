import React, { Component } from 'react';
import '../css/App.css';
import ContentHeader from './content-header';
import GoalsList from './goals-list';
import Header from './Header';

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
