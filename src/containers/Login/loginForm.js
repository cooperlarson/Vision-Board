import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class LoginForm extends Component {

  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type={field.type}
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
  <form id="loginForm" className="loginForm" onSubmit={handleSubmit}>
    <Field
      name="email"
      label="Email"
      type="text"
      component={this.renderField}
    />
    <Field
      name="password"
      label="Password"
      type="password"
      component={this.renderField}

    />
    <div className="form-group">
      <button
        type="submit"
        className="btn btn-primary"
        value="submit"
        form="loginForm"
      >Login</button>
    </div>
    </form>
    )
  }
}

function validate(values) {
  const errors = {};

  if (!values.email) {
    errors.email = "Please enter a valid email";
  }
  if (!values.password) {
    errors.password = "Please enter your password"
  }

  return errors;
}

export default reduxForm({
  validate,
  form: 'loginForm'
})(LoginForm)
