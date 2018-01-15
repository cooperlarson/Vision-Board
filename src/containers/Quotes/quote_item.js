import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

@firebaseConnect(
  ({ auth }) => ([])
)
@connect(
  ({ firebase }, { auth }) => ({})
)

class QuoteItem extends Component {

  static propTypes = {
    goal: PropTypes.object,
    id: PropTypes.string,
    firebase: PropTypes.shape({
      remove: PropTypes.func.isRequired,
      update: PropTypes.func.isRequired
    }),
    auth: PropTypes.shape({
      uid: PropTypes.string
    })
  }

  render() {
    const { quote, id } = this.props;

    return (
      <div key={id} id={id} className="quote-container">
        <h4>"{quote.quote}"</h4>
        <h5>-{quote.author}</h5>
      </div>
    )
  }
}
export default QuoteItem