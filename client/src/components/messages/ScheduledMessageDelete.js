import React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from "../Modal";
import history from "../../history";
import { fetchScheduledMessage, deleteScheduledMessage } from "../../actions/scheduledMessages";

class ScheduledMessageDelete extends React.Component {
  componentDidMount() {
    this.props.fetchScheduledMessage(this.props.match.params.id);
  }

  renderActions() {
    return (
      <React.Fragment>
        <Link to={'/messages'} onClick={() => this.props.deleteScheduledMessage(this.props.match.params.id)} className="ui button negative">
          Ištrinti
        </Link>
        <Link to={'/messages'} className="ui button">
          Atšaukti
        </Link>
      </React.Fragment>
    );
  }

  renderContent() {
      if(!this.props.scheduledMessage) {
          return 'Ar tikrai norite ištrinti šia grupę?';
      }

      return `Ar tikrai norite ištrinti suplanuotą pranešimą grupei: "${this.props.scheduledMessage.groupname}"?`;
  }

  render() {
    return (
        <Modal
          title="Ištrinti grupę"
          content={this.renderContent()}
          actions={this.renderActions()}
          onDismiss={() => history.push("/messages")}
        />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
    return { scheduledMessage: state.scheduledMessages[ownProps.match.params.id] }
};

export default connect(mapStateToProps, { fetchScheduledMessage, deleteScheduledMessage })(ScheduledMessageDelete);