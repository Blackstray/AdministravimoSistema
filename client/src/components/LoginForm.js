import React from "react";
import { Field, reduxForm } from "redux-form";
import GoogleAuth from './GoogleAuth';
import './GlobalStyles.css';

class LoginForm extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <div>
      <form onSubmit={this.onSubmit} className="ui form error">
        <Field
          name="username"
          component={this.renderInput}
          label="Vartotojo Vardas"
        />
        <Field
          name="password"
          component={this.renderInput}
          label="Slaptaždis"
        />
        <div className="ui secondary pointing menu btn">
            <button className="ui button primary wide">Prisijungti</button>
        </div>
      </form>
      <GoogleAuth className="wide" name="Prisijungti su Google"/>
      </div>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.title) {
    errors.title = "You must enter a title";
  }

  if (!formValues.description) {
    errors.description = "You must enter a description";
  }

  return errors;
};

export default reduxForm({
  form: "loginForm",
  validate,
})(LoginForm);