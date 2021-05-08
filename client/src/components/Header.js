import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import { useDispatch } from "react-redux";
import { Menu, Container, Icon } from "semantic-ui-react";
import "./GlobalStyles.css";

export const Header = (props) => {
  const dispatch = useDispatch();

  const renderLogout = () => {
    return (
      <Link
        to="/login"
        style={{ color: "white" }}
        onClick={() => dispatch(logout())}
      >
        Atsijungti
      </Link>
    );
  };
  const renderLogin = () => {
    return (
      <Link to="/login" className="item menu button" style={{ color: "white" }}>
        Prisijungti
      </Link>
    );
  };
  if (props.user.role != "admin") {
    return <div></div>;
  } else
    return (
      <Menu
        className="nav"
        style={{ borderRadius: "0px", marginBottom: "20px", opacity: 0.9 }}
      >
        <Container>
          <Menu.Item as="a" header>
            <Link to="/" style={{ color: "white" }}>
              <Icon name="clipboard outline" />
              Klientų Administravimo Sistema
            </Link>
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item as="a">Sveiki: {props.user.firstname}</Menu.Item>
            <Menu.Item as="a">
              <Link to="/" style={{ color: "white" }}>
                Vartotojai
              </Link>
            </Menu.Item>
            <Menu.Item as="a">
              <Link to="/messages" style={{ color: "white" }}>
                Pranešimai
              </Link>
            </Menu.Item>
            <Menu.Item as="a">
              {props.isSignedIn ? renderLogout() : renderLogin()}
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>
    );
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.auth.user.user,
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { logout })(Header);
