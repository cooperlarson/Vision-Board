import React from 'react';
import PropTypes from 'prop-types';
import { required, validateEmail } from '../../utils/form';
import { Field, reduxForm } from 'redux-form';

let FormSignup = ({ pristine, submitting, handleSubmit }) => (
<form id="signupForm" className="signupForm" onSubmit={handleSubmit}>
                 <div className="form-group">
                 <label>Username</label>
                  <Field
                  name="username"
                  component="input"
                  className="form-control"
                  type="text"
                  validate={required}
                />
                </div>
                <div className="form-group">
                <label>Email</label>
                <Field
                  name="email"
                  component="input"
                  className="form-control"
                  type="text"
                  validate={[required, validateEmail]}
                />
                </div>
                <div className="form-group">
                <label>Password</label>
                <Field
                  name="password"
                  component="input"
                  className="form-control"
                  type="password"
                  validate={required}
                />
                </div>
                <button
                className="btn btn-primary"
                type="submit"
                form="signupForm"
                value="Submit">Sign Up</button>
  </form>
)

FormSignup.propTypes = {
  pristine: PropTypes.bool.isRequired, // added by redux-form
  submitting: PropTypes.bool.isRequired, // added by redux-form
  handleSubmit: PropTypes.func.isRequired // added by redux-form
}

FormSignup = reduxForm({
  form: 'signupForm'
})(FormSignup)

export default FormSignup;
