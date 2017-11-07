import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS } from 'react-redux-firebase';

class Form extends Component {
  static proptypes = {
    goals: PropTypes.object,
    firebase: PropTypes.object
  }

  //handling form submit
handleSubmit = (e) => {
  e.preventDefault();
const {title} = this.refs;
const {imgUrl} = this.refs;
const {due} = this.refs;
const { firebase } = this.props
firebase.push('/goals', { title: title.value, imgUrl: imgUrl.value, due: due.value })
title.value = '';
imgUrl.value = '';
due.value = '';
}

render() {
  return (
  <div>
            <form id="goalForm" onSubmit={this.handleSubmit}>
              <div className="form-group">
              <label>Goal Name</label>
              <input className="form-control" type="text" name="title" placeholder="What is your goal?" ref="title" />
              </div>
              <div className="form-group">
              <label>Image URL</label>
              <input className="form-control" type="text" name="imgUrl" placeholder="Paste the goal image's URL here" ref="imgUrl" />
              </div>
              <div className="form-group">
              <label>Goal Due</label><br />
              <input type="month" name="due" ref="due" />
              </div>
              <button className="btn btn-submit" type="submit" form="goalForm" value="Submit">Add Item</button>
            </form>

      </div>
  );
}

}

const wrappedForm = firebaseConnect([
  '/goals'
])(Form)

export default connect(
  ({firebase}) => ({
    goals: dataToJS(firebase, 'goals')
  })
)(wrappedForm)
