import React, { Component } from 'react';
import NewGoalModal from '../newGoal/newGoalModal';

class ContentHeader extends Component {
  render() {
    return (
      <section className="content-header">
      <div className="col-xs-4" />
      <div className="col-xs-4">
        <h3>My Vision Board</h3>
      </div>
      <div className="col-xs-4">
        <NewGoalModal />
      </div>
    </section>
    );
  }
}

export default ContentHeader;
