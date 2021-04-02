import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import UserCreate from "./users/UserCreate";
import UserEdit from "./users/UserEdit";
import UserDelete from "./users/UserDelete";
import UserShow from "./users/UserShow";
import UserList from "./users/UserList";
import MessagesPage from './messages/MessagesPage';
import MessageGroupDelete from './messages/MessageGroupDelete';
import Header from "./Header";
import history from "../history";
import UserMessageSend from "./users/UserMessageSend";
import UserExtendSubscription from "./users/UserExtendSubscription";
import Login from './Login';
import './GlobalStyles.css';

const App = (props) => {
  return (
    <div className="ui container">
      <Router history={history}>
        <Header />
        <Switch>
          <Route path="/" exact component={UserList} />
          <Route path="/users/new" exact component={UserCreate} />
          <Route path="/users/edit/:id" exact component={UserEdit} />
          <Route path="/users/delete/:id" exact component={UserDelete} />
          <Route path="/users/:id" exact component={UserShow} />
          <Route path="/users/messagesend/:id" exact component={UserMessageSend} />
          <Route path="/users/extend/:id" exact component={UserExtendSubscription} />
          <Route path="/login" exact component={Login} />
          <Route path="/messages" exact component={MessagesPage} />
          <Route path="/messages/delete/:id" exact component={MessageGroupDelete}/>
        </Switch>
      </Router>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,  
  }; 
};

export default connect(mapStateToProps)(App);
