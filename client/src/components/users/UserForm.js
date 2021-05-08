import React from "react";
import { Field, reduxForm } from "redux-form";
import { Form, Input, Button, TextArea } from 'semantic-ui-react';
import history from "../../history";
import "../GlobalStyles.css";

// $(`.ui form`)
//   .form({
//     fields: {
//       field1: {
//         rules: [
//           {
//             type: 'empty',
//             prompt: 'Prasome'
//           }
//         ]
//       }
//     }
//   })

class UserForm extends React.Component {
  state = { firstname: "", lastname: "", email: "", address: "", 
            mac: "", comment: "", subscription: "", price: "", firstnameError: false }

  componentDidMount() {
    if(this.props.initialValues != null){
      this.setState({firstname: this.props.initialValues.firstname, 
        lastname: this.props.initialValues.lastname, 
        email: this.props.initialValues.email,
        address: this.props.initialValues.address, 
        mac: this.props.initialValues.mac, 
        comment: this.props.initialValues.comment, 
        subscription: this.props.initialValues.subscription, 
        price: this.props.initialValues.price})
    }
  }
  
  onSubmit = (e) => {
    e.preventDefault();
    let error = false;

    if(this.state.firstname === '') {
      this.setState({ firstnameError: true })
      error = true;
    } else {
      this.setState({ firstnameError: false })
    }

    if(error){
      return;
    }

    var formValues = { firstname:this.state.firstname, lastname:this.state.lastname,
    email:this.state.email, address:this.state.address, mac:this.state.mac, comment:this.state.comment,
    subscription:this.state.subscription, price:this.state.price};
    this.props.onSubmit(formValues);
  }

  onFieldChange = (e, { name, value }) => {
    this.setState({ [name]: value})
  }

  render() {
    const { firstname, lastname, email, address, mac, comment, subscription, price } = this.state;

    return (
      <Form size="small" onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Form.Group error={"Vardas"}>
          <Form.Input
            label="Vardas"
            name='firstname'
            placeholder="Vardenis"
            value={firstname}
            onChange={this.onFieldChange}
            error={this.state.firstnameError}
          />
          <Form.Input
            label="Pavarde"
            name='lastname'
            placeholder="Pavardenis"
            value={lastname}
            required
            onChange={this.onFieldChange}
          />
          <Form.Input
            label="Paštas"
            name='email'
            placeholder="vardenis@paštas.com"
            value={email}
            required
            onChange={this.onFieldChange}
          />
        </Form.Group>
        <Form.Group>
        <Form.Input
            label="Addresas"
            name='address'
            placeholder="Gatve"
            value={address}
            required
            onChange={this.onFieldChange}
          />
        <Form.Input
          label="MAC"
          name='mac'
          placeholder="XX:XX:XX:XX"
          value={mac}
          required
          onChange={this.onFieldChange}
        />
        <Form.Field width={6}>
        <Form.Input
          label="Prenumerata"
          name='subscription'
          placeholder="viasat"
          value={subscription}
          required
          onChange={this.onFieldChange}
        />
        </Form.Field>
        <Form.Field width={6}>
          <Form.Input
            label="Kaina"
            name='price'
            placeholder="00.00"
            value={price}
            required
            onChange={this.onFieldChange}
          />
        </Form.Field>
        </Form.Group>
        <Form.TextArea
          label="Komentaras"
          name='comment'
          placeholder=""
          value={comment}
          onChange={this.onFieldChange}
        />
        <Form.Button 
        content="Patvirtinti" 
        onClick={() => history.push("/")}
        //disabled={!this.state.firstname}
        />
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
