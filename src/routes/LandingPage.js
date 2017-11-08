import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../containers/navbar';
import SignUpModal from '../containers/signup/signup-modal';
import LoginModal from '../containers/Login/loginModal';

class LandingPage extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="jumbotron landing-page">
          <h1>Vision Board</h1>
          <h3>Achieve your goals with the power of visualization</h3>
          <Link to={'/Home'}><button className="btn btn-submit">Get Started</button></Link>
          <ul>
            <button className="btn btn-submit"><SignUpModal /></button>
            <button className="btn btn-submit"><LoginModal /></button>
          </ul>
        </div>
      </div>
    );
  }
}

export default LandingPage;
