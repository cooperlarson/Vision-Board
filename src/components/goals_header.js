import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS, isLoaded, isEmpty } from 'react-redux-firebase';
import QuoteItem from '../containers/Quotes/quote_item';

const numberOfQuotes = 15;
const randomIndex = Math.floor(Math.random() * numberOfQuotes);

@firebaseConnect([
  {type: 'once', path:'/quotes', queryParams: ['orderByChild=number', `startAt=${randomIndex}`, `endAt=${randomIndex}`]}
])
@connect(({ firebase }) => ({
  quotes: dataToJS(firebase, 'quotes')
}))

export default class GoalsHeader extends Component {
  static propTypes = {
    quotes: PropTypes.object
  }

  render() {
    const { quotes } = this.props;
    
    const quotesList = !isLoaded(quotes)
      ? 'Loading'
      : isEmpty(quotes)
        ? 'No Quote'
        : Object.keys(quotes).map((id) => (
          <QuoteItem auth={this.props.auth} key={id} id={id} quote={quotes[id]} />
        ))
    return (
      <section className="content-header">
        <div className="col-xs-10 col-xs-offset-1 col-md-8 col-md-offset-2">
          {quotesList}
        </div>
      </section>
    )
  }
}
