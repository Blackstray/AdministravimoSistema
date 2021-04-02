import React from 'react';
import { connect } from "react-redux";
import { fetchMessageGroups } from "../../actions/messageGroups";
import MessageGroupCreate from './MessageGroupCreate';
import { Link } from "react-router-dom";
import { Button, List } from "semantic-ui-react";
import "../GlobalStyles.css";

class MessageGroupList extends React.Component {
    componentDidMount(){
        this.props.fetchMessageGroups();
    }

    componentDidUpdate() {
        console.log("update");
    }

    renderList() {
        return this.props.messageGroups.map((messageGroup) => {
            return (
                <div className="item ui grid list-item" key={messageGroup.id}>
                    <List className="three wide column" size="large">
                    <List.Item>
                    <List.Content>
                        <List.Header as="a">
                        {messageGroup.name}
                        </List.Header>
                    </List.Content>
                    </List.Item>
                    </List>
                    <List className="three wide column" size="large">
                    <List.Item>
                    <List.Content>
                        {messageGroup.description}
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
                        <Button>
                            <Link to={`/messages/delete/${messageGroup.id}`}>Ištrinti</Link>
                        </Button>
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
                <h2 style={{ textAlign: 'center'}}>Pranešimų grupės</h2>
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
                        Aprašymas
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
                        <MessageGroupCreate />
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
        messageGroups: Object.values(state.messageGroups),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn,
    };
};

export default connect(mapStateToProps, { fetchMessageGroups })(MessageGroupList);