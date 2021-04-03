import React from 'react';
import { Field, reduxForm } from "redux-form";
import { Form, Input, Button, TextArea, Dropdown } from 'semantic-ui-react';
import { connect } from "react-redux";
import SemanticDatepicker from 'react-semantic-ui-datepickers';

class ScheduledMessageForm extends React.Component {
    state = { currentDate: 112 }

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

    onChange = (event, data) => {
        this.setState({ currentDate: data.value})
        console.log(this.currentDate);
    }

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
    }

    makeOptions() {
        var options = [];
        this.props.messageGroups.map((messageGroup) => {
            var obj = {};
            obj['key'] = messageGroup.name;
            obj['text'] = messageGroup.name;
            obj['value'] = messageGroup.id;
            return options.push(obj);
        });
        console.log(options);
        return options;
    }

    render(){
        return (
            // <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
            //     <Field name="groupname" component={this.renderInput} label="Grupės pavadinimas"/>
            //     <Field name="content" component={this.renderInput} label="Pranešimo tūrinys" />
            //     {/* <Field name="senddate" component={DatePicker} label="Siuntimo Data" /> */}
            //     <SemanticDatepicker id="senddate" name="senddate" label="Siuntimo Data" onChange={this.onChange} autoComplete="off"/>
            //     <br />
            //     <button className="ui button primary">Pateikti</button>
            // </form>
            <Form size='small'  onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <Form.Group widths='equal'>
                    <Form.Field required>
                        <label>Grupė</label>
                    <Dropdown name="groupname" placeholder='Grupė' fluid selection options={this.makeOptions()} />
                    </Form.Field>
                    <Form.Field
                        id='content'
                        control={SemanticDatepicker}
                        label='Siuntimo Data'
                        placeholder='Siuntimo Data'
                        required
                    />
                    </Form.Group>
                    <Form.Field
                        id='content'
                        control={TextArea}
                        label='Turinys'
                        placeholder='Turinys'
                        required
                    />
                    <Form.Field
                        id=''
                        control={Button}
                        content='Patvirtinti'
                    />
            </Form>
        );
    }
}

const validate = (formValues) => {
    const errors = {};
    if(!formValues.title) {
        errors.title = 'You must enter a title';
    }

    if(!formValues.description) {
        errors.description = 'You must enter a description';
    }

    return errors;
};

ScheduledMessageForm = reduxForm({
    form: "scheduledMessageForm",
    validate
})(ScheduledMessageForm);

const mapStateToProps = (state) => {
    return {
        messageGroups: Object.values(state.messageGroups),
    };
};

const connectedScheduledMessageForm = connect(mapStateToProps)(ScheduledMessageForm);

export { connectedScheduledMessageForm as default };