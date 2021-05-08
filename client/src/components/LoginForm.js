import React from "react";
import { reduxForm } from "redux-form";
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
  state = { email: "", password: "" };

  onSubmit = () => {
    const formValues = { email:this.state.email, password: this.state.password };
    this.props.onSubmit(formValues);
  };

  onFieldChange = (e, { name, value }) => {
    this.setState({ [name]: value})
  }

  render() {
    if (this.props.isSignedIn == true) {
      window.location.href = "/";
      return <div></div>;
    } else
    return (
      <div className="ui middle aligned center aligned grid">
      <Grid  className="login" textAlign="center" verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              {/* <img src="/static/images/logo.png" alt="logo" className="image" />{" "} */}
              Klientų Administravimo Sistema
            </Header>
            <Form size="large" onSubmit={this.props.handleSubmit(this.onSubmit)}>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Paštas"
                  name="email"
                  onChange={this.onFieldChange}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Slaptaždis"
                  type="password"
                  name="password"
                  onChange={this.onFieldChange}
                />
                <Button color="teal" fluid size="large">
                    Prisijungti
                </Button>
                <br />
                {/* <GoogleAuth className="wide" name="Prisijungti su Google"/> */}
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      
      </div>
    );
  }
}

export default reduxForm({
  form: "loginForm",
})(LoginForm);
