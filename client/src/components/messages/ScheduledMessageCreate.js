import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { connect } from "react-redux";
import { createScheduledMessage } from "../../actions/scheduledMessages";
import ScheduledMessageForm from './ScheduledMessageForm';

class ScheduledMessageCreate extends React.Component {
    state = { open: false }

    onSubmit = (formValues) => {
        this.props.createScheduledMessage(formValues);
    }

    render(){
        return (
            <div>
                <Button
                    onClick={() => this.setState({open: true})}
                >
                    Suplanuoti pranešimą
                </Button>

                <Modal
                    dimmer='blurring'
                    open={this.state.open}
                    onClose={() => this.setState({open: false})}
                    style={{padding: '10px'}}
                >
                    <h3>Suplanuoti pranešimą</h3>
                    <ScheduledMessageForm onSubmit={this.onSubmit} />
                </Modal>
            </div>
        );
    }
}

export default connect(null, { createScheduledMessage })(ScheduledMessageCreate);