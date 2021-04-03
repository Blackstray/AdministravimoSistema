import React from "react";
import { connect } from "react-redux";
import { fetchUser } from "../../actions/users";
import { Grid, Image } from "semantic-ui-react";
import Header from "../Header";

class UserShow extends React.Component {
  componentDidMount() {
    this.props.fetchUser(this.props.match.params.id);
  }

  render() {
    if (!this.props.user) {
      return <div>Loading...</div>;
    }

    const { firstname, lastname, address, mac, subscription, price, comment, username, subscriptionEnd } = this.props.user;

    return (
      <div>
        <Header />
        <div className="ui middle aligned center aligned grid">
        <Grid celled>
          <Grid.Row>
            <Grid.Column width={4}>
              <Image src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fclipartart.com%2Fimages%2Fclipart-profile-4.jpg&f=1&nofb=1" />
            </Grid.Column>
            <Grid.Column width={2}>
              <h4>
                Vardas:
              </h4>
              <h4>
                Adresas:
              </h4>
              <h4>
                MAC:
              </h4>
              <h4>
                Komentaras:
              </h4>
            </Grid.Column>
            <Grid.Column width={4}>
              <h4>
                {firstname} {lastname}
              </h4>
              <h4>
                {address}
              </h4>
              <h4>
                {mac}
              </h4>
              <h4>
                {comment}
              </h4>
            </Grid.Column>
            <Grid.Column width={2}>
              <h4>
                Slapyvardis:
              </h4>
              <h4>
                Prenumeratos Tipas:
              </h4>
              <h4>
                Kaina:
              </h4>
            </Grid.Column>
            <Grid.Column width={4}>
              <h4>
                {username}
              </h4>
              <h4>
                {subscription}
              </h4>
              <h4>
                {price} €
              </h4>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { user: state.users[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchUser })(UserShow);
