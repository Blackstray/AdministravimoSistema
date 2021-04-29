import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { connect } from "react-redux";
import { createScheduledMessage } from "../../actions/scheduledMessages";
import ScheduledMessageForm from './ScheduledMessageForm';
import "../GlobalStyles.css";

class ScheduledMessageCreate extends React.Component {
    state = { open: false }

    onSubmit = (formValues) => {
        this.props.createScheduledMessage(formValues);
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
                    <Modal.Header>Suplanuoti pranešimą</Modal.Header>
                    <Modal.Content><ScheduledMessageForm onSubmit={this.onSubmit} /></Modal.Content>
                </Modal>
            </div>
        );
    }
}

export default connect(null, { createScheduledMessage })(ScheduledMessageCreate);