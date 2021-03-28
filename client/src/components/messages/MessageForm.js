import React from 'react';
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Dropdown } from 'semantic-ui-react';

class MessageForm extends React.Component {
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
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field name="name" component={this.renderInput} label="Grupės pavadinimas"/>
                <Field name="description" component={this.renderInput} label="Grupės aprašymas" />
                <Dropdown name="members" placeholder='Klientai' fluid multiple selection options={this.makeOptions()} />
                <br />
                <button className="ui button primary">Submit</button>
            </form>
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

MessageForm = reduxForm({
    form: "messageForm",
    validate
})(MessageForm);

const mapStateToProps = (state) => {
    return {
      users: Object.values(state.users),
    };
  };
  

const connectedMessageForm = connect(mapStateToProps)(MessageForm);

export { connectedMessageForm as default };
