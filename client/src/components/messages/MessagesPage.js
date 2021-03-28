import React from 'react';
import { Link } from "react-router-dom";
import MessageGroupList from './MessageGroupList';
import ScheduledMessageList from './ScheduledMessageList';

class MessagesPage extends React.Component {
    renderButtons() {

    }
    
    render() {
        return (
            <div>
                <ScheduledMessageList />
                <MessageGroupList />
            </div>
        );
    }
}

export default MessagesPage;