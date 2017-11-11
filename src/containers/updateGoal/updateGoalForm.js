import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';


class UpdateGoalForm extends Component {

  componentWillMount () {
    const { goal } = this.props
    this.props.initialize({
      title: goal.title,
      description: goal.description,
      imgUrl: goal.imgUrl,
      due: goal.due
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
    const { handleSubmit, goal } = this.props

    return (
  <form id="updateGoalForm" className="updateGoalForm" onSubmit={handleSubmit}>
    <Field
      name="title"
      label="Goal Title"
      value={goal.title}
      component={this.renderField}
    />
    <Field
      name="description"
      label="Description"
      defaultValue={goal.description}
      component={this.renderField}
    />
    <Field
      name="imgUrl"
      label="Image URL"
      defaultValue={goal.imgUrl}
      component={this.renderField}
    />
    <label>Due</label>
    <div className="form-group">
    <Field
      name="due"
      className="form-control"
      component="input"
      type="month"
    />
    </div>
    <div className="form-group">
      <button
        type="submit"
        className="btn btn-submit"
        value="submit"
        form="updateGoalForm"
      >Update Goal</button>
    </div>
  </form>
    )
  }
}

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = "Enter a title!";
  }
  if (!values.imgUrl) {
    errors.imgUrl = "Add an image link!";
  }

  return errors;
}

export default reduxForm({
  validate,
  form: 'updateGoalForm'
})(UpdateGoalForm)
