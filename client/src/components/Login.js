import React from 'react';
import { connect } from "react-redux";
import { fetchUsers } from "../actions/users";
import { login } from "../actions/auth";
import { Link } from "react-router-dom";
import LoginForm from './LoginForm';
import './GlobalStyles.css';

class Login extends React.Component {
    onSubmit = (formValues) => {
        this.props.login(formValues);
      };

    render() {
        if(this.props.isSignedIn == true)
        {
            window.location.href = "/";
            //return <LoginForm onSubmit={this.onSubmit}/>;
        }
        else
        return (  
            <LoginForm onSubmit={this.onSubmit}/>
        );
    };
}

const mapStateToProps = (state) => {
    return {
      isSignedIn: state.auth.isSignedIn,  
    }; 
};

export default connect(mapStateToProps, {fetchUsers, login})(Login);