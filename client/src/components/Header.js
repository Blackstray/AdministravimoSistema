import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import { useDispatch } from 'react-redux';
import GoogleAuth from './GoogleAuth';
import { Menu } from 'semantic-ui-react';
import './GlobalStyles.css';

const Header = props => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));

  const renderLogout = () => {
    return (
        <Link to="login" className="item menu button" onClick={() => dispatch(logout())}>
          Atsijungti 
        </Link>  
    )
}
const renderLogin = () => {
    return (
        <Link to="/login" className="item menu button">
          Prisijungti
        </Link>  
    )
}
if(user.user.role != 'admin'){
  return <div></div>;
}
else
  return (
    <Menu className="ui secondary pointing menu nav">
      <Menu.Item>
        <Link to="/" className="item">
          <h1>Administravimo Sistema</h1>
        </Link>
      </Menu.Item>
      <Menu.Item className="right menu">
        <Link to="/" className="item menu button">
          Vartotojai
        </Link>
        <Link to="/messages" className="item">
          Pranešimai
        </Link>
        {props.isSignedIn ? renderLogout() : renderLogin()}
      </Menu.Item>
    </Menu>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    isSignedIn: state.auth.isSignedIn,  
  }; 
};

export default connect(mapStateToProps, { logout })(Header);
