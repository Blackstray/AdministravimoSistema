import React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from "../Modal";
import history from "../../history";
import { fetchMessageGroup, deleteMessageGroup } from "../../actions/messageGroups";

class MessageGroupDelete extends React.Component {
  componentDidMount() {
    this.props.fetchMessageGroup(this.props.match.params.id);
  }

  renderActions() {
    return (
      <React.Fragment>
        <Link to={'/messages'} onClick={() => this.props.deleteMessageGroup(this.props.match.params.id)} className="ui button negative">
          Ištrinti
        </Link>
        <Link to={'/messages'} className="ui button">
          Atšaukti
        </Link>
      </React.Fragment>
    );
  }

  renderContent() {
      if(!this.props.messageGroup) {
          return 'Ar tikrai norite ištrinti šia grupę?';
      }

      return `Ar tikrai norite ištrinti grupę vardu: "${this.props.messageGroup.name}?"`;
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
    return { messageGroup: state.messageGroups[ownProps.match.params.id] }
};

export default connect(mapStateToProps, { fetchMessageGroup, deleteMessageGroup })(MessageGroupDelete);