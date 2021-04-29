import React from "react";
import { Field, reduxForm } from "redux-form";
import { Form, Input, Button, TextArea } from 'semantic-ui-react';
import history from "../../history";

class UserProfileForm extends React.Component {
  state = { firstname: "", lastname: "", address: "", mac: "", comment: "", subscription: "", price: "" }

  componentDidMount() {
    if(this.props.initialValues != null){
      this.setState({firstname: this.props.initialValues.firstname, 
      lastname: this.props.initialValues.lastname, 
      address: this.props.initialValues.address,
      mac:this.props.initialValues.mac,
      price: this.props.initialValues.price,
      subscription: this.props.initialValues.subscription,
      comment: this.props.initialValues.comment
      })
    }
  }

  onSubmit = () => {
    var formValues = { firstname:this.state.firstname, lastname:this.state.lastname,
     address:this.state.address, mac:this.state.mac, comment:this.state.comment,
    subscription:this.state.subscription, price:this.state.price};
    //console.log(formValues);
    this.props.onSubmit(formValues);
  }

  onFieldChange = (e, { name, value }) => {
    this.setState({ [name]: value})
  }

  render() {
    const { firstname, lastname, address, mac, comment, subscription, price } = this.state;
    //this.setState({firstname: this.props.initialValues.firstname});
    //{this.props.handleSubmit(this.onSubmit)}
    return (
      <Form size="small" onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Form.Group>
          <Form.Input
            label="Vardas"
            name='firstname'
            placeholder="Vardenis"
            value={firstname}
            required
            onChange={this.onFieldChange}
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
            label="Addresas"
            name='address'
            placeholder="Gatve"
            value={address}
            required
            onChange={this.onFieldChange}
          />
        </Form.Group>
        <Button content="Patvirtinti" />
        {/* <Form.Field control={Button} content="Patvirtinti" onClick={() => history.push("/")} /> */}
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
