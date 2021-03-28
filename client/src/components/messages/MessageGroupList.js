import React from 'react';
import { connect } from "react-redux";
import { fetchMessageGroups } from "../../actions/messageGroups";
import MessageGroupCreate from './MessageGroupCreate';
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";

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
                    <div className="three wide column">{messageGroup.name}</div>
                    <div className="three wide column">{messageGroup.description}</div>
                    <Button className="two wide column">Siusti Pranešimą</Button>
                    <Button className="two wide column">Redaguoti</Button>
                    <Button className="two wide column">
                    <Link to={`/messages/delete/${messageGroup.id}`}>Ištrinti</Link>
                    </Button>
                </div>
            );
        });
    }

    render(){
        return (
            <div className="listing">
                <h2>Pranešimų grupės</h2>
                <div className="item ui grid" style={{ verticalAlign: "middle" }}>
                    <div className="three wide column">Grupės Pavadinimas</div>
                    <div className="five wide column">Aprašymas</div>
                    <div className="four wide column">Veiksmai</div>
                    <MessageGroupCreate />
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