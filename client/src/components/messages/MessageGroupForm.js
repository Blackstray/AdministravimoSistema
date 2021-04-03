import React from 'react';
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Dropdown, Form, Input, Button, TextArea } from 'semantic-ui-react';

class MessageGroupForm extends React.Component {
    renderError({ error, touched}) {
        if(touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }

    renderInput = ({ input, label, meta }) => {
        const className = `field ${meta.error && meta.touched ? 'error' : '' }`;
      return (
        <div className={className}>
            <label>{label}</label>
          <input {...input} autoComplete="off" />
          {this.renderError(meta)}
        </div>
      );
    }

    makeOptions() {
        var options = [];
        this.props.users.map((user) => {
            var obj = {};
            obj['key'] = user.firstname + " " + user.lastname;
            obj['text'] = user.firstname + " " + user.lastname;
            obj['value'] = user.id;
            return options.push(obj);
        });
        console.log(options);
        return options;
    }

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
    }

    render(){
        return (
            <Form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Form.Field 
                    id="name" 
                    control={Input} 
                    label="Grupės pavadinimas"
                    required
                />
                <Form.Field required>
                <label>Klientai</label>
                <Dropdown name="members" placeholder='Klientai' fluid multiple selection options={this.makeOptions()} />
                </Form.Field>
                <Form.Field 
                    id="members" 
                    control={TextArea} 
                    label="Grupės aprašymas" 
                />
                <br />
                <Form.Field id="" control={Button} content="Patvirtinti" />
            </Form>
        );
    }
}

const validate = (formValues) => {
    const errors = {};
    if(!formValues.name) {
        errors.title = 'Privaloma ivesti grupes pavadinima';
    }

    if(!formValues.description) {
        errors.description = 'Privaloma ivesti aprasa';
    }

    return errors;
};

MessageGroupForm = reduxForm({
    form: "messageGroupForm",
    validate
})(MessageGroupForm);

const mapStateToProps = (state) => {
    return {
      users: Object.values(state.users),
    };
  };
  

const connectedMessageGroupForm = connect(mapStateToProps)(MessageGroupForm);

export { connectedMessageGroupForm as default };
