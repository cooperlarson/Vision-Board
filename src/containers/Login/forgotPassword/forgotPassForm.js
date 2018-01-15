import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class ForgotPasswordForm extends Component {
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
  <form id="ForgotPasswordForm" className="ForgotPasswordForm" onSubmit={handleSubmit}>
    <Field
      name="email"
      label="Email"
      type="text"
      component={this.renderField}
    />
    <div className="form-group">
      <button
        type="submit"
        className="btn btn-primary"
        value="submit"
        form="EmailPasswordForm"
      >Submit</button>
    </div>
  </form>
    )
  }
}

function validate(values) {
  const errors = {};

  if (!values.email) {
    errors.email = "Enter a valid email address";
  }

  return errors;
}

export default reduxForm({
  validate,
  form: 'ForgotPasswordForm'
})(ForgotPasswordForm)
