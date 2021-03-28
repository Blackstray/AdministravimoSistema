import React from 'react';
import { connect } from "react-redux";
import { fetchScheduledMessages } from "../../actions/scheduledMessages";
import ScheduledMessageCreate from './ScheduledMessageCreate';

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
                    <div className="three wide column">{scheduledMessage.groupname}</div>
                    <div className="three wide column">{this.renderDate(scheduledMessage)}</div>
                    <div className="two wide column">Siusti Pranešimą</div>
                    <div className="two wide column">Redaguoti</div>
                    <div className="two wide column">Trinti</div>
                </div>
            );
        });
    }

    render(){
        return (
            <div className="listing">
                <h2>Suplanuoti pranešimai</h2>
                <div className="item ui grid" style={{ verticalAlign: "middle" }}>
                    <div className="three wide column">Grupės Pavadinimas</div>
                    <div className="five wide column">Siuntimo data</div>
                    <div className="four wide column">Veiksmai</div>
                    <ScheduledMessageCreate />
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