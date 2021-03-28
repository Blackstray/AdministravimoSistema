import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { connect } from "react-redux";
import { createMessageGroup } from "../../actions/messageGroups";
import MessageForm from './MessageForm';

class MessageGroupCreate extends React.Component {
    state = { open: false }

    onSubmit = (formValues) => {
        console.log(formValues);
        this.props.createMessageGroup(formValues);
    }

    render(){
        return (
            <div>
                <Button
                    onClick={() => this.setState({open: true})}
                >
                    Nauja grupė
                </Button>

                <Modal
                    dimmer='blurring'
                    open={this.state.open}
                    onClose={() => this.setState({open: false})}
                    style={{padding: '10px'}}
                >
                    <h3>Nauja Grupė</h3>
                    <MessageForm onSubmit={this.onSubmit} />
                </Modal>
            </div>
        );
    }
}

export default connect(null, { createMessageGroup })(MessageGroupCreate);