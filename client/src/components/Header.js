import React from "react";
import { Link } from "react-router-dom";
//import { connect } from "react-redux";
import GoogleAuth from './GoogleAuth';
import './GlobalStyles.css';

const Header = () => {
  // if(props.isSignedIn == false)
  //   return <div></div>;
  // else
  return (
    <div className="ui secondary pointing menu">
      <Link to="/" className="item">
        Administravimo Sistema
      </Link>
      <div className="right menu">
        <Link to="/" className="item">
          Vartotojai
        </Link>
        <Link to="/messages" className="item">
          Pranešimai
        </Link>
        <GoogleAuth />
      </div>
    </div>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     isSignedIn: state.auth.isSignedIn,  
//   }; 
// };

export default Header;
