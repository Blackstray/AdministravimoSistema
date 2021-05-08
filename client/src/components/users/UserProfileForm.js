import React from "react";
import { Field, reduxForm } from "redux-form";
import { Form, Button } from 'semantic-ui-react';

class UserProfileForm extends React.Component {
  state = { firstname: "", lastname: "", address: "", email: "", mac: "", comment: "", subscription: "", price: "" }

  componentDidMount() {
    if(this.props.initialValues != null){
      this.setState({firstname: this.props.initialValues.firstname, 
      lastname: this.props.initialValues.lastname, 
      address: this.props.initialValues.address,
      email: this.props.initialValues.email,
      mac:this.props.initialValues.mac,
      price: this.props.initialValues.price,
      subscription: this.props.initialValues.subscription,
      comment: this.props.initialValues.comment
      })
    }
  }

  onSubmit = () => {
    var formValues = { firstname:this.state.firstname, lastname:this.state.lastname,
     address:this.state.address, email: this.state.email, mac:this.state.mac, comment:this.state.comment,
    subscription:this.state.subscription, price:this.state.price};
    this.props.onSubmit(formValues);
  }

  onFieldChange = (e, { name, value }) => {
    this.setState({ [name]: value})
  }

  render() {
    const { firstname, lastname, address, email, mac, comment, subscription, price } = this.state;
    return (
      <Form size="small" onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Form.Group widths={1}>
          <Form.Field style={{ paddingRight: 70}}>
          <Form.Input
            label="Vardas"
            name='firstname'
            placeholder="Vardenis"
            value={firstname}
            required
            onChange={this.onFieldChange}
          />
          </Form.Field>
          <Form.Input
            label="Pavarde"
            name='lastname'
            placeholder="Pavardenis"
            value={lastname}
            required
            onChange={this.onFieldChange}
          />
          </Form.Group>
          <Form.Group>
          <Form.Field style={{ paddingRight: 70}}>
          <Form.Input
            label="Addresas"
            name='address'
            placeholder="Gatve"
            value={address}
            required
            onChange={this.onFieldChange}
          />
          </Form.Field>
          <Form.Input
            label="Paštas"
            name='email'
            placeholder="email@gmail.com"
            value={email}
            required
            onChange={this.onFieldChange}
          />
        </Form.Group>
        <Form.Field>
         <Button content="Patvirtinti" /> 
        </Form.Field>
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
})(UserProfileForm);
