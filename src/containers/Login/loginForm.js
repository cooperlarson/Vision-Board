import React from 'react';
import PropTypes from 'prop-types';
import { required, validateEmail } from '../../utils/form';
import { Field, reduxForm } from 'redux-form';
import { Checkbox } from 'react-bootstrap';

const FormLogin = ({ pristine, submitting, handleSubmit }) => (
  <form id="loginForm" className="loginForm" onSubmit={handleSubmit}>
    <div className="form-group">
    <Field
      name="email"
      className="form-control"
      component="input"
      validate={[required, validateEmail]}
    />
    </div>
    <div className="form-group">
    <Field
      name="password"
      className="form-control"
      component="input"
      type="password"
      validate={required}
    />
    </div>
    <div className="form-group">
      <button
        primary
        type="submit"
        className="btn btn-submit"
        value="submit"
        form="loginForm"
        disabled={pristine || submitting}
      >{submitting ? 'Loading' : 'Login'}</button>
    </div>
    <div>
      <div>
        <Checkbox>
        Remember?
        </Checkbox>
      </div>
      <div>
        Forgot Password?
      </div>
    </div>
  </form>
)

FormLogin.propTypes = {
  pristine: PropTypes.bool.isRequired, // added by redux-form
  submitting: PropTypes.bool.isRequired, // added by redux-form
  handleSubmit: PropTypes.func.isRequired // added by redux-form
}

export default reduxForm({
  form: 'loginForm'
})(FormLogin)
