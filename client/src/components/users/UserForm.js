import React from "react";
import { Field, reduxForm } from "redux-form";
import { Form, Input, Button, TextArea } from 'semantic-ui-react';

class UserForm extends React.Component {
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
      // <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
      //   <Field name="firstname" component={this.renderInput} label="Vardas"/>
      //   <Field name="lastname" component={this.renderInput} label="Pavarde" />
      //   <Field name="address" component={this.renderInput} label="Adresas" />
      //   <Field name="comment" component={this.renderInput} label="Komentaras" />
      //   <Field name="mac" component={this.renderInput} label="MAC adresas" />
      //   <Field name="subscription" component={this.renderInput} label="Prenumerata" />
      //   <Field name="price" component={this.renderInput} label="Kaina" />
      //   <button className="ui button primary">Submit</button>
      // </form>
      <Form size="small" onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Form.Group>
          <Form.Field
            id="firstname"
            control={Input}
            label="Vardas"
            placeholder="Vardenis"
            required
          />
          <Form.Field
            id="lastname"
            control={Input}
            label="Pavardė"
            placeholder="Pavardenis"
            required
          />
          <Form.Field
            id="address"
            control={Input}
            label="Adresas"
            placeholder="Gatvė"
            required
          />
        </Form.Group>
        <Form.Group>
        <Form.Field
          id="mac"
          control={Input}
          label="MAC"
          placeholder="XX:XX:XX:XX"
          required
        />
        <Form.Field
          id="subscription"
          control={Input}
          label="Prenumerata"
          placeholder="Prenumerata"
          required
        />
        <Form.Field
          id="price"
          control={Input}
          label="Kaina"
          placeholder="00.00"
          required
        />
        </Form.Group>
        <Form.Field
          id="comment"
          control={TextArea}
          label="Komentaras"
          placeholder=""
          required
        />
        <Form.Field id="" control={Button} content="Patvirtinti" />
      </Form>
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
  form: "userForm",
  validate,
})(UserForm);
