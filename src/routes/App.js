import React, { Component } from 'react';
import '../css/App.css';
import ContentHeader from '../components/content-header';
import Goals from '../containers/goals/goals';
import Navbar from '../containers/navbar';
import { UserIsAuthenticated } from '../utils/auth';

@UserIsAuthenticated

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="container-fluid">
          <ContentHeader />
          <Goals />
        </div>
      </div>
    );
  }
}
