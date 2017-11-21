import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SignUpModal from '../signup/signup-modal';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
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
  ({ firebase }, { auth }) => ({})
)

export default class NavbarAuth extends Component {
  static propTypes = {
    auth: PropTypes.shape({
      uid: PropTypes.string
    })
  }

  handleLogout = () => {
    const { firebase, auth } = this.props;
    firebase.logout()
    if (auth.isAnonymous) {
      firebase.auth().currentUser.delete();
      firebase.remove(`/goals/${auth.uid}`);
    }
  }

  render() {
    const { auth } = this.props

    const isAnonymous = auth.isAnonymous;

      if (!isLoaded(auth)) {
        return (
          <div>
            <span>Loading...</span>
          </div>
        )
      }
     if (isLoaded(auth) && !isEmpty(auth) && !isAnonymous) {
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
    }
    if (isLoaded(auth) && !isEmpty(auth) && isAnonymous) {
      return (
      <header className="App-header">
        <Link to={'/'}><h1 className="App-title">Vision Board</h1></Link>
        <NewGoalModal />
        <ul className="nav-list">
          <SignUpModal />
          <UserProfileModal auth={auth} />
          <li className="nav-item" onClick={this.handleLogout}>Logout</li>
          </ul>
      </header>
      )
    }
  }
}
