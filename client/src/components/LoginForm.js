import React from "react";
import { Field, reduxForm } from "redux-form";
import GoogleAuth from './GoogleAuth';
import './GlobalStyles.css';
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from "semantic-ui-react";


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
      <div className="ui middle aligned center aligned grid">
      {/* <form onSubmit={this.onSubmit} className="ui form error">
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
      </form> */}
      <Grid textAlign="center" verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              {/* <img src="/static/images/logo.png" alt="logo" className="image" />{" "} */}
              Administravimo Sistema
            </Header>
            <Form size="large">
              <Segment stacked>
                {/* <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Paštas"
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Slaptaždis"
                  type="password"
                />
                <Button color="teal" fluid size="large">
                  Prisijungti
                </Button>
                <br /> */}
                <GoogleAuth className="wide" name="Prisijungti su Google"/>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      
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
