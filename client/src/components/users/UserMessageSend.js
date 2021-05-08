import React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import history from "../../history";
import Modal from "../Modal";
import { fetchUser } from "../../actions/users";
import { sendEmail } from "../../actions/auth";
import { Form, Input, TextArea, Button } from 'semantic-ui-react'

class UserMessageSend extends React.Component {
    state = { content: "", subject: "" }
    componentDidMount() {
        this.props.fetchUser(this.props.match.params.id);
    }

    onFieldChange = (e, { name, value }) => {
        this.setState({ [name]: value})
      }

    onSubmit(id) {
        var formValues = {
            to: this.props.user[id].email,
            subject: this.state.subject,
            content: this.state.content
        }
        this.props.sendEmail(formValues);
    }

    renderContent(id) {
        if(!this.props.match.params.id){
            return <div>Kraunam...</div>;
        }
        return (
            <Form onSubmit={() => this.onSubmit(id)}>
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
      <Modal
      title="Siusti Pranešimą"
      content={this.renderContent(this.props.match.params.id, this.props.user)}
      onDismiss={() => history.push("/")}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
    return { user: state.users };
};

export default connect(mapStateToProps, { fetchUser, sendEmail })(UserMessageSend);
