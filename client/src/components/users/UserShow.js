import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../actions/auth";
import { fetchUser, editUser } from "../../actions/users";
import { Grid, Image, Menu, Dropdown, Form } from "semantic-ui-react";
import Header from "../Header";
import UserProfileForm from "./UserProfileForm";
import PaypalExpressBtn from "react-paypal-express-checkout";
import "../GlobalStyles.css";

export class UserShow extends React.Component {
  state = { activeItem: "Mano Informacija", time: 1 };

  componentDidMount() {
    this.props.fetchUser(this.props.match.params.id);
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  renderProfile() {
    const {
      firstname,
      lastname,
      address,
      mac,
      subscription,
      price,
      comment,
      username,
      subscriptionEnd,
    } = this.props.user;
    return (
      <div className="ui middle aligned center aligned grid">
        <Grid>
          <Grid.Row>
            <Grid.Column width={3}>
              <h4>Vardas:</h4>
              <h4>Adresas:</h4>
              <h4>MAC:</h4>
              <h4>Komentaras:</h4>
            </Grid.Column>
            <Grid.Column width={6}>
              <h4>
                {firstname} {lastname}
              </h4>
              <h4>{address}</h4>
              <h4>{mac}</h4>
              <h4>{comment}</h4>
            </Grid.Column>
            <Grid.Column width={3}>
              <h4>Slapyvardis:</h4>
              <h4>Prenumeratos Tipas:</h4>
              <h4>Kaina:</h4>
            </Grid.Column>
            <Grid.Column width={4}>
              <h4>{username}</h4>
              <h4>{subscription}</h4>
              <h4>{price} €</h4>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }

  renderSubscription() {
    const client = {
      sandbox:
        "AVb41RDIqRPItro6AwcbOkMdRgqu-PyuKfEUw8SlMrt6t5oppk5_ZqPMOhaH3GVwzDuC3KNY_mXN_bOl",
      production:
        "EGxw-yTFw6_D_BG1Px58nM8iRaTsjRRVeQFeSlW14aG2UcAJxzE2S5RVCjvpyAiohL2P-l_pAGdQi6da",
    };
    let total = parseFloat(this.props.user.price);
    const options = [
      { key: 1, text: "1", value: 1 },
      { key: 2, text: "2", value: 2 },
      { key: 3, text: "3", value: 3 },
      { key: 4, text: "4", value: 4 },
      { key: 5, text: "5", value: 5 },
      { key: 6, text: "6", value: 6 },
      { key: 7, text: "7", value: 7 },
      { key: 8, text: "8", value: 8 },
      { key: 9, text: "9", value: 9 },
      { key: 10, text: "10", value: 10 },
      { key: 11, text: "11", value: 11 },
      { key: 12, text: "12", value: 12 },
    ];
    return (
      <Form className="alignCenter">
        <Form.Field required width={4}>
          <label>Kiek laiko norite pratesti prenumeratą?</label>
          <Dropdown
            name="time"
            options={options}
            selection
            fluid
            onChange={(e, data) =>
              this.setState({ time: parseFloat(data.value) * total }),
              console.log(this.state.time)
            }
          />
        </Form.Field>
        <Form.Field width={4}>
          <h4>Prašome pasirinkti atsiskaitymo būdą</h4>
          <PaypalExpressBtn
            client={client}
            currency={"EUR"}
            total={this.state.time}
          />
        </Form.Field>
      </Form>
    );
  }

  renderSelected() {
    if (this.state.activeItem === "Mano Informacija")
      return this.renderProfile();
    else if (this.state.activeItem === "Redaguoti Informacija")
      return this.renderEdit();
    else if (this.state.activeItem === "Mano Prenumerata")
      return this.renderSubscription();
  }

  renderEdit() {
    return (
      <div className="alignCenter">
        <UserProfileForm
          initialValues={_.pick(
            this.props.user,
            "firstname",
            "lastname",
            "address",
            "mac",
            "subscription",
            "price",
            "comment"
          )}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }

  onSubmit = (formValues) => {
    console.log(formValues);
    this.props.editUser(this.props.user.id, formValues);
  };

  render() {
    if (!this.props.user) {
      return <div>Loading...</div>;
    }

    const { activeItem } = this.props.user;
    const user = JSON.parse(localStorage.getItem("user"));

    if (user.user.role != "admin") {
      return (
        <div >
          <Header />
          <Menu className="ui secondary pointing menu">
            <Menu.Item data-testid="adminView">
              <h1>Administravimo Sistema</h1>
            </Menu.Item>
            <Menu.Item
              className="right menu button"
              name="Mano Informacija"
              active={activeItem === "Mano Informacija"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="Redaguoti Informacija"
              className="item menu button"
              active={activeItem === "Redaguoti Informacija"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="Mano Prenumerata"
              className="item menu button"
              active={activeItem === "Mano Prenumerata"}
              onClick={this.handleItemClick}
            />
              <Link
                to="/login"
                className="item menu button"
                onClick={() => this.props.logout()}
              >
                Atsijungti
              </Link>
          </Menu>
          {this.renderSelected(activeItem)}
        </div>
      );
    } else
      return (
        <div data-testid="userView">
          <Header />
          <Menu pointing secondary>
            <Menu.Item
              name="Mano Informacija"
              active={activeItem === "Mano Informacija"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="Redaguoti Informacija"
              active={activeItem === "Redaguoti Informacija"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="Mano Prenumerata"
              active={activeItem === "Mano Prenumerata"}
              onClick={this.handleItemClick}
            />
          </Menu>
          {this.renderSelected(activeItem)}
        </div>
      );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { user: state.users[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchUser, editUser, logout })(UserShow);
