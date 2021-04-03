import React from "react";
import { Link } from "react-router-dom";
//import { connect } from "react-redux";
import GoogleAuth from './GoogleAuth';
import { Menu } from 'semantic-ui-react';
import './GlobalStyles.css';

const Header = () => {
  // if(props.isSignedIn == false)
  //   return <div></div>;
  // else
  return (
    // <div className="ui secondary pointing menu">
    //   <Link to="/" className="item">
    //     <h1>Administravimo Sistema</h1>
    //   </Link>
    //   <div className="right menu">
    //     <Link to="/" className="item">
    //       Vartotojai
    //     </Link>
    //     <Link to="/messages" className="item">
    //       Pranešimai
    //     </Link>
    //     <GoogleAuth />
    //   </div>
    // </div>
    <Menu className="ui secondary pointing menu">
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
        <GoogleAuth />
      </Menu.Item>
    </Menu>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     isSignedIn: state.auth.isSignedIn,  
//   }; 
// };

export default Header;
