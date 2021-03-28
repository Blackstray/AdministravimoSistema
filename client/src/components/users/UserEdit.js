import _ from 'lodash';
import React from "react";
import { Modal } from "semantic-ui-react";
import { connect } from "react-redux";
import { fetchUser, editUser } from "../../actions/users";
import UserForm from "./UserForm";

class UserEdit extends React.Component {
  state = { open: false }
  componentDidMount() {
    this.props.fetchUser(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    this.props.editUser(this.props.match.params.id, formValues);
  };

  render() {
    // if (!this.props.user) {
    //   return <div>Loading</div>;
    // }
    return (
      //<div>
      // <h3>Edit a User</h3>
      //   <UserForm initialValues={_.pick(this.props.user, 'title', 'description')}
      // onSubmit={this.onSubmit} />
      // </div>
      <div>
      {/* <Button
        onClick={() => this.setState({open: true})}
      >
        Naujas Klientas
      </Button> */}

      <Modal
        dimmer='blurring'
        open={this.state.open}
        onClose={() => this.setState({open: false})}
        style={{padding: '10px'}}
      >
        <h3>Redaguoti klientą</h3>
        <UserForm onSubmit={this.onSubmit} />
      </Modal>
    </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { user: state.users[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchUser, editUser })(UserEdit);
