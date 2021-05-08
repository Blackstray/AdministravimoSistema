import React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from "../Modal";
import history from "../../history";
import { fetchUser, deleteUser } from "../../actions/users";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

toast.configure()
class UserDelete extends React.Component {
  componentDidMount() {
    this.props.fetchUser(this.props.match.params.id);
  }

  handleAction = () => {
    this.props.deleteUser(this.props.match.params.id)
    toast.success(`Vartotojas ${this.props.user.firstname} Ištrintas`);
  }

  renderActions() {
    return (
      <React.Fragment>
        <Link to={'/'} onClick={() => this.handleAction()} className="ui button negative">
          Ištrinti
        </Link>
        <Link to={'/'} className="ui button">
          Atšaukti
        </Link>
      </React.Fragment>
    );
  }

  renderContent() {
      if(!this.props.user) {
          return 'Ar tikrai norite ištrinti šį klienta?';
      }

      return `Ar tikrai norite ištrinti klienta su vardu: ${this.props.user.firstname}?`;
  }

  render() {
    return (
        <Modal
          title="Ištrinti klientą"
          content={this.renderContent()}
          actions={this.renderActions()}
          onDismiss={() => history.push("/")}
        />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
    return { user: state.users[ownProps.match.params.id] }
};

export default connect(mapStateToProps, { fetchUser, deleteUser })(UserDelete);
