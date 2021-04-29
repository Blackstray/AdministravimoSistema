import React from "react";
import history from "../../history";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Dropdown, Form, Input, Button, TextArea } from "semantic-ui-react";

class MessageGroupForm extends React.Component {
  state = { name: "", description: "", members: [] };

  componentDidMount() {
    if(this.props.initialValues != null) {
      this.setState({name: this.props.initialValues.name, 
      description: this.props.initialValues.description,
      members: this.props.initialValues.members})
    }
  }

  makeOptions() {
    var options = [];
    this.props.users.map((user) => {
      var obj = {};
      obj["key"] = user.firstname + " " + user.lastname;
      obj["text"] = user.firstname + " " + user.lastname + " | " + user.subscription;
      obj["value"] = user.id;
      return options.push(obj);
    });
    return options;
  }

  onSubmit = () => {
    var formValues = {
      name: this.state.name,
      description: this.state.description,
      members: this.state.members,
    };
    this.props.onSubmit(formValues);
  };

  onFieldChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  render() {
    const { name, description, members } = this.state;
    return (
      <Form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form"
      >
        <Form.Field
          control={Input}
          name="name"
          label="Grupės pavadinimas"
          value={name}
          required
          onChange={this.onFieldChange}
        />
        <Form.Field required>
          <label>Klientai</label>
          <Dropdown
            name="members"
            placeholder="Klientai"
            value={members}
            fluid
            multiple
            selection
            options={this.makeOptions()}
            onChange={this.onFieldChange}
          />
        </Form.Field>
        <Form.Field
          name="description"
          value={description}
          control={TextArea}
          label="Grupės aprašymas"
          onChange={this.onFieldChange}
        />
        <br />
        <Form.Field>
          <Button type="submit">Patvirtinti</Button>
        </Form.Field>
      </Form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.name) {
    errors.title = "Privaloma ivesti grupes pavadinima";
  }

  if (!formValues.description) {
    errors.description = "Privaloma ivesti aprasa";
  }

  return errors;
};

MessageGroupForm = reduxForm({
  form: "messageGroupForm",
  validate,
})(MessageGroupForm);

const mapStateToProps = (state) => {
  return {
    users: Object.values(state.users),
  };
};

const connectedMessageGroupForm = connect(mapStateToProps)(MessageGroupForm);

export { connectedMessageGroupForm as default };
