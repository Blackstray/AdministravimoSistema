import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { connect } from "react-redux";
import { createUser } from "../../actions/users";
import UserForm from './UserForm';

class UserCreate extends React.Component {
   state = { open: false }

  onSubmit = (formValues) => {
    formValues.username = Math.random().toString(16).substr(2, 8);
    formValues.password = Math.random().toString(16).substr(2, 8);
    formValues.subscriptionEnd = Date.now();
    console.log(formValues);
    this.props.createUser(formValues);
  };
  render() {
  return (
    <div>
      <Button
        onClick={() => this.setState({open: true})}
      >
        Naujas Klientas
      </Button>

      <Modal
        dimmer='blurring'
        open={this.state.open}
        onClose={() => this.setState({open: false})}
        style={{padding: '10px'}}
      >
        <h3>Naujas Klientas</h3>
        <UserForm onSubmit={this.onSubmit} />
      </Modal>
    </div>
  )
}
}
export default connect(null, {createUser})(UserCreate);