import React from 'react';
import { Button, Modal, Icon } from 'semantic-ui-react';
import { connect } from "react-redux";
import { createUser } from "../../actions/users";
import UserForm from './UserForm';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../GlobalStyles.css';

toast.configure()
class UserCreate extends React.Component {
   state = { open: false }

  onSubmit = (formValues) => {
    formValues.userName = Math.random().toString(16).substr(2, 8);
    formValues.password = Math.random().toString(16).substr(2, 8);
    formValues.role = "user";
    formValues.subscriptionEnd = Date.now();
    console.log(formValues.password);
    this.props.createUser(formValues);
    this.setState({open: false});
    toast.success(`Vartotojas ${formValues.firstname} Sukurtas`);
  };
  render() {
  return (
    <div>
      <Button
        circular
        icon={"plus"}
        onClick={() => this.setState({open: true})}
      >
      </Button>

      <Modal
        size='small'
        className="modalSmall"
        dimmer='blurring'
        open={this.state.open}
        onClose={() => this.setState({open: false})}

        style={{padding: '10px'}}
      >
        <Modal.Header>Naujas Klientas</Modal.Header>
        <Modal.Content><UserForm data-testid="user-form" onSubmit={this.onSubmit} /></Modal.Content>
      </Modal>
    </div>
  )
}
}
export default connect(null, {createUser})(UserCreate);