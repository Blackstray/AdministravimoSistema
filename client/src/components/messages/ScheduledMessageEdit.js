import _ from 'lodash';
import React from 'react';
import { Modal, Button, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import { fetchScheduledMessage, editScheduledMessage } from "../../actions/scheduledMessages";
import ScheduledMessageForm from "./ScheduledMessageForm";
import "../GlobalStyles.css";

class ScheduledMessageEdit extends React.Component {
    state = { open: false }

    fetchScheduledMessage() {
        this.props.fetchScheduledMessage(this.props.id);
        //console.log(this.props.scheduledMessage);
    }

    onSubmit = (formValues) => {
        //console.log(formValues);
        this.props.editScheduledMessage(this.props.id, formValues);
    }

    render() {

        return (
            <div>
                <Button 
                    icon
                    style={{color: "rgb(66, 64, 64)"}}
                    compact
                    circular
                    onClick={() => { this.setState({open: true});this.fetchScheduledMessage(); }}
                >
                    {/* <Icon name='edit' /> */}
                    Redaguoti
                </Button>
                <Modal
                    size='small'
                    className="modalSmall"
                    dimmer='blurring'
                    open={this.state.open}
                    onClose={() => this.setState({open: false})}
                    style={{padding: '10px'}}
                >
                    <h3>Redaguoti Pranešimą</h3>
                    <ScheduledMessageForm initialValues={_.pick(this.props.scheduledMessage, 'groupname', 'subject','content', 'senddate')} onSubmit={this.onSubmit} />
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { scheduledMessage: state.scheduledMessages[ownProps.id] };
  };
  
  export default connect(mapStateToProps, { fetchScheduledMessage, editScheduledMessage })(ScheduledMessageEdit);