import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { connect } from "react-redux";
import { createMessageGroup } from "../../actions/messageGroups";
import MessageGroupForm from './MessageGroupForm';
import '../GlobalStyles.css';

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
                    className="modalSmall"
                    dimmer='blurring'
                    open={this.state.open}
                    onClose={() => this.setState({open: false})}
                    style={{padding: '10px'}}
                >
                    <Modal.Header>Nauja Grupė</Modal.Header>
                    <Modal.Content><MessageGroupForm onSubmit={this.onSubmit} /></Modal.Content>
                </Modal>
            </div>
        );
    }
}

export default connect(null, { createMessageGroup })(MessageGroupCreate);