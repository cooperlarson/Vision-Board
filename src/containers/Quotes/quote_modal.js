import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS, pathToJS } from 'react-redux-firebase';
import QuoteForm from './quote_form';

@firebaseConnect([
  {type: 'once', path:'/quotes', queryParams: ['orderByChild=number', 'limitToLast=1']}
])
@connect(({ firebase }) => ({
  quotes: dataToJS(firebase, 'quotes'),
  auth: pathToJS(firebase, 'auth'),
}))

class NewQuoteModal extends Component {
  //setting initial state
  constructor(props) {
    super(props);
    this.state = {newQuoteModal: false};
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    }

  static proptypes = {
    goals: PropTypes.object,
    firebase: PropTypes.object,
    auth: PropTypes.shape({
      uid: PropTypes.string
    }),
    quotes: PropTypes.object
  }

    //handling form submit
  handleAdd = (newQuote) => {
  const { firebase } = this.props;
  firebase.push(`/quotes`, newQuote)
  .then(() => {
    this.close()
  })
  }

  getInitialState() {
    return { newQuoteModal: false };
  }

  close() {
    this.setState({ newQuoteModal: false });
  }

  open() {
    this.setState({ newQuoteModal: true });
  }

  render() {
    const userId = this.props.firebase.auth().currentUser.uid;
    const { quotes } = this.props;
    const quotesNumber = Object.keys(quotes).map((id) => (
      <QuoteForm key={id} quote={quotes[id]} onSubmit={this.handleAdd} />
    ))
    if (userId === 'nqBDgLphQ1a79UqdVEqOqRTY2fj2') {
    return (
      <div>
      <button className="btn btn-primary add-quote" onClick={this.open}>Add Quote</button>
      <Modal className="modal-form" show={this.state.newQuoteModal} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Quote</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {quotesNumber}
        </Modal.Body>
        </Modal>
      </div>
    )
  }
}


};

export default NewQuoteModal;