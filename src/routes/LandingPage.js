import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty, pathToJS } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import Navbar from '../containers/navbar/navbar';
import NavbarAuth from '../containers/navbar/navbar_auth';
import SignUpModal from '../containers/signup/signup-modal';
import LoginModal from '../containers/Login/loginModal';
import LoadingSpinner from '../components/LoadingSpinner';
import { UserIsNotAuthenticated } from '../utils/noauth';

@UserIsNotAuthenticated
@firebaseConnect()
@connect(({ firebase }) => ({
  auth: pathToJS(firebase, 'auth')
}))

class LandingPage extends Component {
  static propTypes = {
    auth: PropTypes.shape({
      uid: PropTypes.string
    })
  }
  render() {
    const { auth } = this.props

    if (!isLoaded(auth)) {
      return (
        <LoadingSpinner />
      )
    }
    if (isLoaded(auth) && isEmpty(auth)) {
      return (
        <div className="landing-page">
        <Navbar />
        <div className="jumbotron">
          <h1>Vision Board</h1>
          <h3>Visualize & Achieve Your Goals</h3>
          <ul>
            <button className="btn btn-primary"><SignUpModal /></button>
            <button className="btn btn-primary"><LoginModal /></button>
          </ul>
        </div>
      </div>
      )
    }
    if (isLoaded(auth) && !isEmpty(auth)) {
      return (
        <div>
        <NavbarAuth auth={this.props.auth} />
        <div className="jumbotron landing-page">
          <h1>Vision Board</h1>
          <h3>Achieve your goals with the power of visualization</h3>
          <Link to={'/Home'}><button className="btn btn-submit">Get Started</button></Link>
        </div>
      </div>
      )
    } else
    return (
      <div>Please try again later</div>
    );
  }
}

export default LandingPage;
