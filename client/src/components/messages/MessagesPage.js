import React from 'react';
import { Link } from "react-router-dom";
import MessageGroupList from './MessageGroupList';
import ScheduledMessageList from './ScheduledMessageList';
import Header from "../Header";

class MessagesPage extends React.Component {
    renderButtons() {

    }
    
    render() {
        return (
            <div>
                <Header />
                <ScheduledMessageList />
                <br />
                <br />
                <MessageGroupList />
            </div>
        );
    }
}

export default MessagesPage;