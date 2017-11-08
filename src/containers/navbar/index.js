import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SignUpModal from '../signup/signup-modal';
import LoginModal from '../Login/loginModal';

class Navbar extends Component {
  render() {
    return (
      <header className="App-header">
        <Link to={'/'}><h1 className="App-title">Vision Board</h1></Link>
        <ul className="nav-list">
          <SignUpModal />
          <LoginModal />
        </ul>
      </header>
    );
  }
}

export default Navbar;
