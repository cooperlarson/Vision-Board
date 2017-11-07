import React, { Component } from 'react';
import ModalForm from './form/modal';

class ContentHeader extends Component {
  render() {
    return (
      <section className="content-header">
      <div className="col-xs-4" />
      <div className="col-xs-4">
        <h3>All Goals</h3>
      </div>
      <div className="col-xs-4">
        <ModalForm />
      </div>
    </section>
    );
  }
}

export default ContentHeader;
