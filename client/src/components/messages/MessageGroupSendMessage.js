import React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import history from "../../history";
import { fetchUsers } from "../../actions/users";
import { fetchMessageGroup } from "../../actions/messageGroups";
import { sendEmail } from "../../actions/auth";
import { Form, Input, TextArea, Button, Modal } from 'semantic-ui-react'
import users from "../../apis/users";

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
        //var emails = [];
        for(var i = 0; i < this.props.messageGroup.members.length; i++) {
            for (var a = 0; a < this.props.users.length; a++ ) {
                //console.log(this.props.messageGroup.members[i] + " " + this.props.users[a].id);
                if(this.props.messageGroup.members[i] == this.props.users[a].id) {
                    //emails.push(this.props.users[i].email);
                    var formValues = {
                        to: this.props.users[i].email,
                        subject: this.state.subject,
                        content: this.state.content
                    }
                    this.props.sendEmail(formValues);
                }
            }
        }
        // console.log(emails);
        // var formValues = {
        //     to: emails,
        //     subject: this.state.subject,
        //     content: this.state.content
        // }
        // //console.log(formValues);
        // this.props.sendEmail(formValues);
    }

    renderContent() {
        // if(!this.props.match.params.id){
        //     return <div>Kraunam...</div>;
        // }
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
            {/* <Icon name='edit' /> */}
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
