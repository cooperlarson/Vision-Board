import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class QuoteForm extends Component {
  componentWillMount () {
    const { quote } = this.props;
    const newQuoteNumber = quote.number + 1;
    this.props.initialize({
      number: newQuoteNumber
     });
  }

renderField(field) {
  const { meta: { touched, error } } = field;
  const className = `form-group ${touched && error ? 'has-danger' : ''}`;

  return (
    <div className={className}>
      <label>{field.label}</label>
      <input
        className="form-control"
        type="text"
        {...field.input}
      />
      <div className="text-help">
        {touched ? error : ''}
      </div>
    </div>
  );
}

  render() {
    const { handleSubmit } = this.props

    return (
  <form id="QuoteForm" className="QuoteForm" onSubmit={handleSubmit}>
    <Field
      name="quote"
      label="Quote"
      component={this.renderField}
    />
    <Field
      name="author"
      label="Quote Author"
      component={this.renderField}
    />
    <Field
      parse={value => Number(value)}
      name="number"
      className="form-hidden"
      component="input"
      type="number"
    />
    <div className="form-group">
      <button
        type="submit"
        className="btn btn-primary"
        component="input"
        value="submit"
        form="QuoteForm"
      >Add Quote</button>
    </div>
  </form>
    )
  }
}

function validate(values) {
  const errors = {};

  if (!values.quote) {
    errors.quote = "Enter a quote";
  }
  if (!values.author) {
    errors.author = "Enter an author";
  }

  return errors;
}

export default reduxForm({
  validate,
  form: 'QuoteForm'
})(QuoteForm)