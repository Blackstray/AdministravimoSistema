import React from "react";
import { connect } from 'react-redux';
import { fetchUsers } from "../../actions/users";
import { fetchMessageGroup } from "../../actions/messageGroups";
import { sendEmail } from "../../actions/auth";
import { Form, Button, Modal } from 'semantic-ui-react'

class MessageGroupSendMessage extends React.Component {
    state = { content: "", subject: "", open: false }

    componentDidMount() {
        this.props.fetchUsers();
        this.props.fetchMessageGroup(this.props.id);
    }

    onFieldChange = (e, { name, value }) => {
        this.setState({ [name]: value})
      }

    onSubmit() {
        for(var i = 0; i < this.props.messageGroup.members.length; i++) {
            for (var a = 0; a < this.props.users.length; a++ ) {
                if(this.props.messageGroup.members[i] == this.props.users[a].id) {
                    var formValues = {
                        to: this.props.users[i].email,
                        subject: this.state.subject,
                        content: this.state.content
                    }
                    this.props.sendEmail(formValues);
                }
            }
        }
    }

    renderContent() {
        return (
            <Form onSubmit={() => this.onSubmit()}>
                <Form.Input
                        name='subject'
                        label='Tema'
                        placeholder='Tema'
                        required
                        onChange={this.onFieldChange}
                    />
                <Form.TextArea
                        name='content'
                        label='Turinys'
                        placeholder='Turinys'
                        required
                        onChange={this.onFieldChange}
                    />
                <Form.Field>
                    <Button type="submit">Siusti</Button>
                </Form.Field>
            </Form>
        );
    }

  render() {
    return (
        <div>
        <Button 
            icon
            style={{color: "rgb(66, 64, 64)"}}
            onClick={() => this.setState({open: true})}
            compact
            circular
        >
            Siusti
        </Button>
        <Modal
            className="modalSmall"
            dimmer='blurring'
            open={this.state.open}
            onClose={() => this.setState({open: false})}
            style={{padding: '10px'}}
        >
            <Modal.Header>Siusti Pranešimą Grupei</Modal.Header>
            <Modal.Content>
                {this.renderContent()}
            </Modal.Content>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
        users: Object.values(state.users), 
        messageGroup: state.messageGroups[ownProps.id],
    };
};

export default connect(mapStateToProps, { fetchUsers, sendEmail, fetchMessageGroup })(MessageGroupSendMessage);
