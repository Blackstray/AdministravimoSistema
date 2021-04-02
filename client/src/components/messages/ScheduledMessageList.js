import React from 'react';
import { connect } from "react-redux";
import { fetchScheduledMessages } from "../../actions/scheduledMessages";
import ScheduledMessageCreate from './ScheduledMessageCreate';
import { Button, List } from "semantic-ui-react";
import "../GlobalStyles.css";

class ScheduledMessageList extends React.Component {
    componentDidMount(){
        this.props.fetchScheduledMessages();
    }

    componentDidUpdate() {
        console.log("update");
    }

    renderDate(scheduledMessage) {
        var date = new Date(scheduledMessage.senddate);
    
        return <div>{new Intl.DateTimeFormat("ko-KR").format(date)}</div>;
      }

    renderList() {
        return this.props.scheduledMessages.map((scheduledMessage) => {
            return (
                <div className="item ui grid list-item" key={scheduledMessage.id}>
                    {/* <div className="three wide column">{scheduledMessage.groupname}</div>
                    <div className="three wide column">{this.renderDate(scheduledMessage)}</div>
                    <div className="two wide column">Siusti Pranešimą</div>
                    <div className="two wide column">Redaguoti</div>
                    <div className="two wide column">Išrinti</div> */}
                    <List className="three wide column" size="large">
                    <List.Item>
                    <List.Content>
                        <List.Header as="a">
                        {scheduledMessage.groupname}
                        </List.Header>
                    </List.Content>
                    </List.Item>
                    </List>
                    <List className="three wide column" size="large">
                    <List.Item>
                    <List.Content>
                        {this.renderDate(scheduledMessage)}
                    </List.Content>
                    </List.Item>
                    </List>
                    <List className="two wide column" size="large">
                    <List.Item>
                    <List.Content>
                        <Button>Siusti Pranešimą</Button>
                    </List.Content>
                    </List.Item>
                    </List>
                    <List className="two wide column" size="large">
                    <List.Item>
                    <List.Content>
                        <Button>Redaguoti</Button>
                    </List.Content>
                    </List.Item>
                    </List>
                    <List className="two wide column" size="large">
                    <List.Item>
                    <List.Content>
                        <Button>Ištrinti</Button>
                    </List.Content>
                    </List.Item>
                    </List>
                </div>
            );
        });
    }

    render(){
        return (
            <div className="listing text">
                <h2 style={{ textAlign: 'center'}}>Suplanuoti pranešimai</h2>
                <div className="item ui grid" style={{ verticalAlign: "middle" }}>
                    <List className="three wide column" size="large" style={{ paddingTop: '1em'}}>
                    <List.Item>
                    <List.Content>
                        Grupės Pavadinimas
                    </List.Content>
                    </List.Item>
                    </List>
                    <List className="five wide column" size="large">
                    <List.Item>
                    <List.Content>
                        Siuntimo data
                    </List.Content>
                    </List.Item>
                    </List>
                    <List className="five wide column" size="large">
                    <List.Item>
                    <List.Content>
                        Veiksmai
                    </List.Content>
                    </List.Item>
                    </List>
                    <List className="three wide column" size="large">
                    <List.Item>
                    <List.Content>
                        <ScheduledMessageCreate />
                    </List.Content>
                    </List.Item>
                    </List>
                </div>
                <div className="ui celled list">{this.renderList()}</div>
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

export default connect(mapStateToProps, { fetchScheduledMessages })(ScheduledMessageList);