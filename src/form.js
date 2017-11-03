import React, { Component } from 'react';
import firebase from './firebase';

class Form extends Component {
    //setting initial state
    constructor() {
      super();
      this.state = {
        title: '',
        description: '',
        imgUrl: '',
        due: '',
        goals: []
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    };

 //handling event change in form
 handleChange(e) {
  this.setState({
    [e.target.name]: e.target.value
  });
}

//handling form submit
handleSubmit(e) {
  e.preventDefault();
  const goalsRef = firebase.database().ref('goals');
  const goal = {
    title: this.state.title,
    description: this.state.description,
    imgUrl: this.state.imgUrl,
    due: this.state.due
  }
  goalsRef.push(goal);
  this.setState({
    title: '',
    description: '',
    imgUrl: '',
    due: ''
  });
}

render() {
  return (
  <div>
            <form id="goalForm" onSubmit={this.handleSubmit}>
              <div className="form-group">
              <label>Goal Name</label>
              <input className="form-control" type="text" name="title" placeholder="What is your goal?" onChange={this.handleChange} value={this.state.title} />
              </div>
              <div className="form-group">
              <label>Description</label>
              <input className="form-control" type="text" name="description" placeholder="Additional info about your goal" onChange={this.handleChange} value={this.state.description} />
              </div>
              <div className="form-group">
              <label>Image URL</label>
              <input className="form-control" type="text" name="imgUrl" placeholder="Paste the goal image's URL here" onChange={this.handleChange} value={this.state.imgUrl} />
              </div>
              <div className="form-group">
              <label>Goal Due</label>
              <input type="month" name="due" onChange={this.handleChange} value={this.state.due} autofocus />
              </div>
              <button className="btn btn-submit" type="submit" form="goalForm" value="Submit">Add Item</button>
            </form>

      </div>
  );
}

}

export default Form;
