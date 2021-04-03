import "./UserStyles.css";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUsers } from "../../actions/users";
import { List, Icon, Dropdown, Menu, Search } from "semantic-ui-react";
import UserMessageSend from "./UserMessageSend";
import DropdownButton from "../DropdownButton";
import SearchBar from "../SearchBar";
import UserCreate from "./UserCreate";
import Header from "../Header";
import Filter from "../Filter";
import "../GlobalStyles.css";

const options = [
  {
    key: "subscription",
    icon: "calendar plus",
    text: "Pratesti Prenumerata",
    href: `users/extend/`,
  },
  { key: "edit", icon: "edit", text: "Redaguoti", href: `users/edit/` },
  { key: "delete", icon: "delete", text: "Pašalinti", href: `users/delete/` },
  {
    key: "mail",
    icon: "mail",
    text: "Siusti Pranesima",
    href: `users/messagesend/`,
  },
];
class UserList extends React.Component {
  state = { search: "Vardenis" };
  componentDidMount() {
    this.props.fetchUsers();
  }

  componentDidUpdate() {
    console.log("update");
  }

  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <div className={{ textAlign: "right" }}>
          <UserCreate />
        </div>
      );
    }
  }

  renderDate(user) {
    var date = new Date(user.subscriptionEnd);

    return <div>{new Intl.DateTimeFormat("ko-KR").format(date)}</div>;
  }

  userOptions(options, userId) {
    const newOptions = options.map((option) => {
      const newOption = Object.assign({}, option);
      newOption.href = option.href + userId;
      return newOption;
    });
    return newOptions;
  }

  renderList() {
    return this.props.users.map((user) => {
      //console.log(this.search);
      //if(user.firstname.includes(this.search))
      return (
        <div className="item ui grid list-item" key={user.id}>
          <List className="two wide column" size="large">
            <List.Item>
              <List.Content>
                <List.Header>
                  <Link to={`/users/${user.id}`}>{user.firstname}</Link>
                </List.Header>
                <List.Description>{user.lastname}</List.Description>
              </List.Content>
            </List.Item>
          </List>
          <List className="two wide column" size="large">
            <List.Item>
              <List.Content>{user.address}</List.Content>
            </List.Item>
          </List>
          <List className="two wide column" size="large">
            <List.Item>
              <List.Content style={{ wordWrap: "break-word" }}>
                {user.mac}
              </List.Content>
            </List.Item>
          </List>
          <List className="two wide column" size="large">
            <List.Item>
              <List.Content>{user.subscription}</List.Content>
            </List.Item>
          </List>
          <List className="two wide column" size="large">
            <List.Item>
              <List.Content>{user.price} €</List.Content>
            </List.Item>
          </List>
          <List className="two wide column" size="large">
            <List.Item>
              <List.Content>{this.renderDate(user)}</List.Content>
            </List.Item>
          </List>
          <List className="two wide column" size="large">
            <List.Item>
              <List.Content>{user.comment}</List.Content>
            </List.Item>
          </List>
          <div className="two wide column" size="large">
            {/* <DropdownButton options={this.userOptions(options, user.id)} /> */}
            <Menu fluid vertical className="column" size="mini">
              <Dropdown item icon="cog" text="Veiksmai">
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <Link className="text" to={`/users/extend/${user.id}`}>
                      <Icon name="calendar plus" />
                      Pratesti Prenumerata
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link className="text" to={`/users/edit/${user.id}`}>
                      <Icon name="edit" />
                      Redaguoti
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link className="text" to={`/users/delete/${user.id}`}>
                      <Icon name="trash" />
                      Ištrinti
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link className="text" to={`/users/messagesend/${user.id}`}>
                      <Icon name="mail" />
                      Siusti Pranesima
                    </Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu>
          </div>
        </div>
      );
    });
  }

  render() {
    if (this.props.isSignedIn == false) {
      window.location.href = "/login";
      return <div></div>;
    } else
      return (
        <div className="listing text">
          <Header />
          <div className="item ui grid" styele={{ paddingTop: "10px" }}>
            <div>
              <br />
              <Search />
            </div>
            {/* <Filter /> */}
          </div>
          <div className="item ui grid" style={{ verticalAlign: "middle" }}>
            <List
              className="two wide column important"
              size="large"
              style={{ paddingTop: "2em" }}
            >
              <List.Item>
                <List.Content>Vardas Pavardė</List.Content>
              </List.Item>
            </List>
            <List
              className="two wide column important"
              size="large"
              style={{ paddingTop: "1em" }}
            >
              <List.Item>
                <List.Content>Adresas</List.Content>
              </List.Item>
            </List>
            <List
              className="two wide column important"
              size="large"
              style={{ paddingTop: "1em" }}
            >
              <List.Item>
                <List.Content>MAC</List.Content>
              </List.Item>
            </List>
            <List
              className="two wide column important"
              size="large"
              style={{ paddingTop: "1em" }}
            >
              <List.Item>
                <List.Content>Prenumerata</List.Content>
              </List.Item>
            </List>
            <List
              className="two wide column important"
              size="large"
              style={{ paddingTop: "1em" }}
            >
              <List.Item>
                <List.Content>Prenumeratos Mokestis</List.Content>
              </List.Item>
            </List>
            <List
              className="two wide column important"
              size="large"
              style={{ paddingTop: "1em" }}
            >
              <List.Item>
                <List.Content>Prenumerata Baigsis</List.Content>
              </List.Item>
            </List>
            <List
              className="two wide column important"
              size="large"
              style={{ paddingTop: "1em" }}
            >
              <List.Item>
                <List.Content>Komentaras</List.Content>
              </List.Item>
            </List>
            <List
              className="two wide column important"
              size="large"
              style={{ paddingTop: "1em" }}
            >
              <List.Item>
                <List.Content>{this.renderCreate()}</List.Content>
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
    users: Object.values(state.users),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { fetchUsers })(UserList);
