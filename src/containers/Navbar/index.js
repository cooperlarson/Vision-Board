import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SignUpModal from '../Signup/signup-modal';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import NewGoalModal from '../Goals/newGoal/newGoalModal';
import UserProfileModal from '../Account/accountModal';

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

  render() {
    const { auth, listLink, linkTitle } = this.props

    const isAnonymous = auth.isAnonymous;

    const goBack = isLoaded(listLink && linkTitle) && !isEmpty(listLink && linkTitle) ?
    <Link to={listLink}><button className="btn btn-primary add-new"><i class="fa fa-arrow-left" aria-hidden="true"></i> {linkTitle}</button></Link>
      : <NewGoalModal />; 

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
        {goBack}
        <Link to={'/'}><h1 className="App-title">Vision Board</h1></Link>
        <ul className="nav-list">
          <UserProfileModal auth={auth} listLink={'/Completed'} linkTitle="Completed Goals"/>
          </ul>
      </header>
       )
    }
    if (isLoaded(auth) && !isEmpty(auth) && isAnonymous) {
      return (
      <header className="App-header">
        {goBack}
        <Link to={'/'}><h1 className="App-title">Vision Board</h1></Link>
        <ul className="nav-list">
          <UserProfileModal auth={auth} />
          <button className="btn btn-primary nav-btn"><SignUpModal /></button>
          </ul>
      </header>
      )
    }
  }
}
