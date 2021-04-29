import _ from 'lodash';
import React from "react";
import { Modal, Dropdown, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import { fetchUser, editUser } from "../../actions/users";
import UserForm from "./UserForm";
import '../GlobalStyles.css';

class UserEdit extends React.Component {
  state = { open: false }

  fetchUser() {
    this.props.fetchUser(this.props.id);
  }

  onSubmit = (formValues) => {
    console.log(formValues);
    this.props.editUser(this.props.id, formValues);
  };

  render() {
    if (!this.props.user) {
      return <div>Loading</div>;
    }
    return (
      <div>
      <Dropdown.Item
        onClick={() => { this.setState({open: true}); this.fetchUser(); }}
      >
        <Icon name="edit" />
        Redaguoti
      </Dropdown.Item>

      <Modal
        size='small'
        className="modalSmall"
        dimmer='blurring'
        open={this.state.open}
        onClose={() => this.setState({open: false})}
        style={{padding: '10px'}}
      >
        <h3>Redaguoti klientą</h3>
        <UserForm initialValues={_.pick(this.props.user, 'firstname', 'lastname', 'email', "address", "mac", "subscription", "price", "comment")} onSubmit={this.onSubmit} />
      </Modal>
    </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { user: state.users[ownProps.id] };
};

export default connect(mapStateToProps, { fetchUser, editUser })(UserEdit);
