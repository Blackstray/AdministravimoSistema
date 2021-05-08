import React from "react";
import { reduxForm } from "redux-form";
import { Form, Input, Button, TextArea, Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import SemanticDatepicker from "react-semantic-ui-datepickers";

class ScheduledMessageForm extends React.Component {
  state = { groupname: "", subject: "", content: "", senddate: "" };

  componentDidMount() {
    if(this.props.initialValues != null) {
      this.setState({groupname: this.props.initialValues.groupname, 
        subject: this.props.initialValues.subject,
        content: this.props.initialValues.content,
        senddate: new Date(this.props.initialValues.senddate)})
    }
  }

  onFieldChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  onSubmit = () => {
    var formValues = {
      groupname: this.state.groupname,
      subject: this.state.subject,
      content: this.state.content,
      senddate: this.state.senddate,
    };
    this.props.onSubmit(formValues);
  };

  makeOptions() {
    var options = [];
    this.props.messageGroups.map((messageGroup) => {
      var obj = {};
      obj["key"] = messageGroup.name;
      obj["text"] = messageGroup.name;
      obj["value"] = messageGroup.name;
      return options.push(obj);
    });
    return options;
  }

  render() {
    const { groupname, content, senddate, subject } = this.state;
    return (
      <Form size="small" onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Form.Group widths="equal">
          <Form.Field required>
            <label>Grupė</label>
            <Dropdown
              name="groupname"
              placeholder="Grupė"
              fluid
              selection
              value={groupname}
              options={this.makeOptions()}
              onChange={this.onFieldChange}
            />
          </Form.Field>
          <Form.Field
            name="senddate"
            control={SemanticDatepicker}
            label="Siuntimo Data"
            placeholder="Siuntimo Data"
            autoComplete="off"
            required
            value={senddate}
            onChange={this.onFieldChange}
          />
        </Form.Group>
        <Form.Field
          name="subject"
          control={Input}
          label="Tema"
          placeholder="Tema"
          required
          value={subject}
          onChange={this.onFieldChange}
        />
        <Form.Field
          name="content"
          control={TextArea}
          label="Turinys"
          placeholder="Turinys"
          value={content}
          onChange={this.onFieldChange}
        />
        <Form.Field id="" control={Button} content="Patvirtinti" />
      </Form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.title) {
    errors.title = "You must enter a title";
  }

  if (!formValues.description) {
    errors.description = "You must enter a description";
  }

  return errors;
};

ScheduledMessageForm = reduxForm({
  form: "scheduledMessageForm",
  validate,
})(ScheduledMessageForm);

const mapStateToProps = (state) => {
  return {
    messageGroups: Object.values(state.messageGroups),
  };
};

const connectedScheduledMessageForm = connect(mapStateToProps)(
  ScheduledMessageForm
);

export { connectedScheduledMessageForm as default };
