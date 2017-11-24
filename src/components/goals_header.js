import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class GoalsHeader extends Component {
  render() {
    return (
      <section className="content-header">
        <div className="col-xs-4">
          <Link to={this.props.listLink}><button className="btn btn-sort">{this.props.linkTitle}</button></Link>
        </div>
        <div className="col-xs-4">
          <h3>{this.props.title}</h3>
        </div>
      </section>
    )
  }
}
