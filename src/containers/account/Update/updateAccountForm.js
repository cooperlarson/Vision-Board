import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';


class UpdateAccountForm extends Component {

  componentWillMount () {
    const { user } = this.props
    this.props.initialize({
      email: user.email,
      username: user.username,
      displayName: user.displayName
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
  <form id="updateAccountForm" className="updateAccountForm" onSubmit={handleSubmit}>
    <Field
      name="email"
      label="Email"
      component={this.renderField}
    />
    <Field
      name="username"
      label="Username"
      component={this.renderField}
    />
    <Field
      name="displayName"
      label="Display Name"
      component={this.renderField}
    />
    <div className="form-group">
      <button
        type="submit"
        className="btn btn-primary"
        value="submit"
        form="updateAccountForm"
      >Update Account</button>
    </div>
  </form>
    )
  }
}

function validate(values) {
  const errors = {};

  if (!values.email) {
    errors.email = "Enter a valid email";
  }
  if (!values.username && !values.displayName) {
    errors.username = "You must enter either a valid Username or Display Name";
    errors.displayName = "You must enter either a valid Username or Display Name";
  }

  return errors;
}

export default reduxForm({
  validate,
  form: 'updateAccountForm'
})(UpdateAccountForm)
