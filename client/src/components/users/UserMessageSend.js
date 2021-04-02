import "./UserStyles.css";
import React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import history from "../../history";
import Modal from "../Modal";
import { fetchUser } from "../../actions/users";
import { Form, Input, TextArea } from 'semantic-ui-react'

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
            <Form>
                <Form.Field
                        id='content'
                        control={TextArea}
                        label='Turinys'
                        placeholder='Turinys'
                        required
                    />
            </Form>
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
