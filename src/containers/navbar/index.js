import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SignUpModal from '../signup/signup-modal';
import LoginModal from '../Login/loginModal';
import { connect } from 'react-redux';
import { firebaseConnect, pathToJS, isLoaded, isEmpty } from 'react-redux-firebase';
import PropTypes from 'prop-types';

@firebaseConnect()
@connect(({ firebase }) => ({
  auth: pathToJS(firebase, 'auth')
}))

class Navbar extends Component {
  static propTypes = {
    auth: PropTypes.shape({
      uid: PropTypes.string
    })
  }

  handleLogout = () => {
    this.props.firebase.logout()
  }

  render() {
    const { auth } = this.props

      if (!isLoaded(auth)) {
        return (
          <div>
            <span>Loading...</span>
          </div>
        )
      }

      if (isLoaded(auth) && isEmpty(auth)) {
        return (
        <header className="App-header">
        <Link to={'/'}><h1 className="App-title">Vision Board</h1></Link>
        <ul className="nav-list">
          <SignUpModal />
          <LoginModal />
        </ul>
      </header>
        )
      }

     if (isLoaded(auth) && !isEmpty(auth)) {
       return (
        <header className="App-header">
        <Link to={'/'}><h1 className="App-title">Vision Board</h1></Link>
        <ul className="nav-list">
          <li className="nav-item" onClick={this.handleLogout}>Logout</li>
          </ul>
      </header>
       )
    } else
    return (
      <header className="App-header">
        <Link to={'/'}><h1 className="App-title">Vision Board</h1></Link>
        <ul className="nav-list">
          <li>error</li>
          </ul>
      </header>
    );
  }
}

export default Navbar;
