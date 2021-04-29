import React from "react";
import { connect } from "react-redux";
import { fetchScheduledMessages } from "../../actions/scheduledMessages";
import ScheduledMessageCreate from "./ScheduledMessageCreate";
import ScheduledMessageEdit from "./ScheduledMessageEdit";
import { Button, List, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "../GlobalStyles.css";

class ScheduledMessageList extends React.Component {
  componentDidMount() {
    this.props.fetchScheduledMessages();
  }

  renderDate(scheduledMessage) {
    var date = new Date(scheduledMessage.senddate).toLocaleDateString();

    return <div>{date}</div>;
  }

  renderList() {
    return this.props.scheduledMessages.map((scheduledMessage) => {
      return (
        <div className="item ui grid list-item" key={scheduledMessage.id}>
          <List className="three wide column alignCenter" size="large">
            <List.Item>
              <List.Content>
                <List.Header as="a">{scheduledMessage.groupname}</List.Header>
              </List.Content>
            </List.Item>
          </List>
          <List className="five wide column alignCenter" size="large">
            <List.Item>
              <List.Content>{this.renderDate(scheduledMessage)}</List.Content>
            </List.Item>
          </List>
          <List className="four wide column alignCenter">
            <List.Item>
              <List.Content>
                <ScheduledMessageEdit id={scheduledMessage.id}/>
              </List.Content>
            </List.Item>
          </List>
          <List className="three wide column alignCenter">
            <List.Item>
              <List.Content>
                <Button compact circular>
                <Link style={{display: 'flex'}} to={`/messages/deleteScheduled/${scheduledMessage.id}`} className="text">
                    {/* <Icon name='edit' /> */}
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
        <h2 style={{ textAlign: "center" }}>Suplanuoti pranešimai</h2>
        <div className="item ui grid" style={{ verticalAlign: "middle" }}>
          <List
            className="three wide column important"
            size="large"
            verticalAlign="middle"
            style={{ paddingTop: "2em", textAlign: "center" }}
          >
            <List.Item>
              <List.Content>Grupės Pavadinimas</List.Content>
            </List.Item>
          </List>
          <List className="five wide column important alignCenter" size="large" verticalAlign="middle">
            <List.Item>
              <List.Content>Siuntimo data</List.Content>
            </List.Item>
          </List>
          <List className="four wide column important alignCenter" size="large" verticalAlign="middle">
            <List.Item>
              <List.Content>Veiksmai</List.Content>
            </List.Item>
          </List>
          <List className="four wide column alignCenter" size="large" verticalAlign="middle">
            <List.Item>
              <List.Content>
                <ScheduledMessageCreate />
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
    scheduledMessages: Object.values(state.scheduledMessages),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { fetchScheduledMessages })(
  ScheduledMessageList
);
