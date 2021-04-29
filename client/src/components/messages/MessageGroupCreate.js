import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { connect } from "react-redux";
import { createMessageGroup } from "../../actions/messageGroups";
import { fetchUsers } from "../../actions/users";
import MessageGroupForm from './MessageGroupForm';
import '../GlobalStyles.css';

class MessageGroupCreate extends React.Component {
    state = { open: false }

    componentDidMount() {
        this.props.fetchUsers();
      }

    onSubmit = (formValues) => {
        this.props.createMessageGroup(formValues);
        this.setState({open: false});
    }

    render(){
        return (
            <div>
                <Button
                    circular
                    icon={"plus"}
                    onClick={() => this.setState({open: true})}
                >
                </Button>

                <Modal
                    className="modalSmall"
                    dimmer='blurring'
                    open={this.state.open}
                    onClose={() => this.setState({open: false})}
                    style={{padding: '10px'}}
                >
                    <Modal.Header>Nauja Grupė</Modal.Header>
                    <Modal.Content>
                        <MessageGroupForm onSubmit={this.onSubmit} />
                    </Modal.Content>
                </Modal>
            </div>
        );
    }
}

export default connect(null, { createMessageGroup, fetchUsers})(MessageGroupCreate);