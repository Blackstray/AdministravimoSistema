import React from 'react';
import { Grid, Container } from "semantic-ui-react";
import { connect } from "react-redux";
import MessageGroupList from './MessageGroupList';
import ScheduledMessageList from './ScheduledMessageList';
import Header from "../Header";

class MessagesPage extends React.Component {
    render() {
        if (this.props.isSignedIn == false) {
            window.location.href = "/login";
            return <div></div>;
          } else
        return (
            <Container fluid>
                <Header />
                <Container>
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={8}>
                      <MessageGroupList />
                    </Grid.Column>
                    <Grid.Column width={8}>
                      <ScheduledMessageList />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                </Container>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      isSignedIn: state.auth.isSignedIn,
    };
  };

export default connect(mapStateToProps)(MessagesPage);