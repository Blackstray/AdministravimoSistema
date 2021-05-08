import React from "react";
import { connect } from "react-redux";
import { fetchMessageGroups } from "../../actions/messageGroups";
import MessageGroupCreate from "./MessageGroupCreate";
import MessageGroupEdit from "./MessageGroupEdit";
import MessageGroupSendMessage from "./MessageGroupSendMessage";
import { Link } from "react-router-dom";
import { Button, List, Popup } from "semantic-ui-react";
import "../GlobalStyles.css";

class MessageGroupList extends React.Component {
  componentDidMount() {
    this.props.fetchMessageGroups();
  }

  renderList() {
    return this.props.messageGroups.map((messageGroup) => {
      if(messageGroup.id!=null)
      return (
        <div className="item ui grid list-item" key={messageGroup.id}>
          <List className="three wide column alignCenter" size="large">
            <List.Item>
              <List.Content>
                <List.Header as="a">{messageGroup.name}</List.Header>
              </List.Content>
            </List.Item>
          </List>
          <List className="five wide column alignCenter" size="large">
            <List.Item>
              <List.Content>
                <Popup
                    content={messageGroup.description}
                    trigger={<p className="comment">{messageGroup.description}</p>}
                    />
              </List.Content>
            </List.Item>
          </List>
          <List className="two wide column alignCenter" size="large">
            <List.Item>
              <List.Content>
                <MessageGroupSendMessage id={messageGroup.id}/>
              </List.Content>
            </List.Item>
          </List>
          <List className="three wide column alignCenter" size="large">
            <List.Item>
              <List.Content>
                <MessageGroupEdit id={messageGroup.id}/>
              </List.Content>
            </List.Item>
          </List>
          <List className="three wide column" size="large">
            <List.Item>
              <List.Content>
                <Button compact circular>
                  <Link to={`/messages/deleteGroup/${messageGroup.id}`} className="text">
                    Ištrinti
                  </Link>
                </Button>
              </List.Content>
            </List.Item>
          </List>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="listing text">
        <h2 style={{ textAlign: "center" }}>Pranešimų grupės</h2>
        <div className="item ui grid alignCenter" style={{ verticalAlign: "middle" }}>
          <List
            className="three wide column important"
            size="large"
            style={{ paddingTop: "2em", textAlign: "center", left: "5px"  }}
            verticalAlign="middle"
          >
            <List.Item>
              <List.Content>Grupės Pavadinimas</List.Content>
            </List.Item>
          </List>
          <List className="five wide column important" size="large" verticalAlign="middle">
            <List.Item>
              <List.Content>Aprašymas</List.Content>
            </List.Item>
          </List>
          <List className="four wide column important" size="large" verticalAlign="middle" style={{left: "20px"}}> 
            <List.Item>
              <List.Content>Veiksmai</List.Content>
            </List.Item>
          </List>
          <List className="four wide column" size="large" verticalAlign="middle">
            <List.Item>
              <List.Content>
                <MessageGroupCreate />
              </List.Content>
            </List.Item>
          </List>
        </div>
        <div className="ui celled list list-scroll">{this.renderList()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messageGroups: Object.values(state.messageGroups),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { fetchMessageGroups })(
  MessageGroupList
);
