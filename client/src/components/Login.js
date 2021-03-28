import React from 'react';
import { connect } from "react-redux";
import { fetchUsers } from "../actions/users";
import { Link } from "react-router-dom";
import LoginForm from './LoginForm';
import './GlobalStyles.css';

class Login extends React.Component {
    onSubmit = (formValues) => {
        console.log(formValues);
      };

    render() {
        if(this.props.isSignedIn == true)
        {
            window.location.href = "/";
        }
        else
        return (
            <div className='box'>
                <h1>Administravimo sistema</h1>
                <div>           
                    <LoginForm onSubmit={this.onSubmit} />
                </div>
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
      isSignedIn: state.auth.isSignedIn,  
    }; 
};

export default connect(mapStateToProps, {fetchUsers})(Login);