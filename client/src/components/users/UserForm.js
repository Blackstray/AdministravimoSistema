import React from "react";
import { Field, reduxForm } from "redux-form";

class UserForm extends React.Component {
    renderError({ error, touched}) {
        if(touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }

  renderInput = ({ input, label, meta }) => {
      const className = `field ${meta.error && meta.touched ? 'error' : '' }`;
    return (
      <div className={className}>
          <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  }

  onSubmit = (formValues) => {
      this.props.onSubmit(formValues);
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
        <Field name="firstname" component={this.renderInput} label="Vardas"/>
        <Field name="lastname" component={this.renderInput} label="Pavarde" />
        <Field name="address" component={this.renderInput} label="Adresas" />
        <Field name="comment" component={this.renderInput} label="Komentaras" />
        <Field name="mac" component={this.renderInput} label="MAC adresas" />
        <Field name="subscription" component={this.renderInput} label="Prenumerata" />
        <Field name="price" component={this.renderInput} label="Kaina" />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = (formValues) => {
    const errors = {};
    if(!formValues.title) {
        errors.title = 'You must enter a title';
    }

    if(!formValues.description) {
        errors.description = 'You must enter a description';
    }

    return errors;
};

export default reduxForm({
    form: "userForm",
    validate 
  })(UserForm);

