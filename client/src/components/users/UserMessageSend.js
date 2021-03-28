import "./UserStyles.css";
import React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import history from "../../history";
import Modal from "../Modal";
import { fetchUser } from "../../actions/users";

class UserMessageSend extends React.Component {
    componentDidMount() {
        this.props.fetchUser(this.props.match.params.id);
    }

    renderActions() {
        return (
        <React.Fragment>
            {/* <form method="post">
            Content: <input type="text" name="content" />
            
            
            </form> */}
            <button className="ui button negative">
                Send
            </button>
            <Link to={'/'} className="ui button">
                Cancel
            </Link>
        </React.Fragment>   
        )
    }

    renderContent() {
        if(!this.props.match.params.id){
            return <div>Loading...</div>;
        }
        return (
            <form method="post">
            Content: <input type="text" name="content" />
            
            
            </form>
        );
    }

  render() {
    return (
      <Modal
      title="Send Message"
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

export default connect(mapStateToProps, { fetchUser })(UserMessageSend);
