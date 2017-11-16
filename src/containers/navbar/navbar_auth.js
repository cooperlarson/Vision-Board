import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SignUpModal from '../signup/signup-modal';
import LoginModal from '../Login/loginModal';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS, isLoaded, isEmpty } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import NewGoalModal from '../newGoal/newGoalModal';
import UserProfileModal from '../account/accountModal';

@firebaseConnect(
  ({ auth }) => ([
    // Get auth from props
    `/users/${auth.uid}`
  ])
)
@connect(
  ({ firebase }, { auth }) => ({
     // pathToJS(firebase, 'auth') gets from redux, but auth is already a prop
     avatar: dataToJS(firebase, `/users/${auth.uid}/avatarUrl`)
  })
)

class NavbarAuth extends Component {
  static propTypes = {
    auth: PropTypes.shape({
      uid: PropTypes.string
    }),
    avatar: PropTypes.string
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
        <NewGoalModal />
        <ul className="nav-list">
          <UserProfileModal auth={auth} />
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

export default NavbarAuth;
