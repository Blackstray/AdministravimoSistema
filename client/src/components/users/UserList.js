import "./UserStyles.css";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUsers } from "../../actions/users";
import { List, Icon, Dropdown, Menu } from "semantic-ui-react";
import UserMessageSend from "./UserMessageSend";
import DropdownButton from "../DropdownButton";
import SearchBar from "../SearchBar";
import UserCreate from "./UserCreate";
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
  state = { search: "Vardenis" }
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
                <List.Header as="a">
                  <Link to={`/users/${user.id}`}>{user.firstname}</Link>
                </List.Header>
                <List.Description as="a">{user.lastname}</List.Description>
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
              <Dropdown item text="Veiksmai">
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
                      <Icon name="delete" />
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
          <div className="item ui grid" styele={{ paddingTop: "10px" }}>
            <h2 className="twelve wide column">Klientai</h2>
            <div>
              <br />
              <SearchBar />
            </div>
            {/* <Filter /> */}
          </div>
          <div className="item ui grid" style={{ verticalAlign: "middle" }}>
            <div className="two wide column important">Vardas Pavardė</div>
            <div className="two wide column important">Adresas</div>
            <div className="two wide column important">MAC</div>
            <div className="two wide column important">Prenumerata</div>
            <div className="two wide column important">
              Prenumeratos Mokestis
            </div>
            <div className="two wide column important">Prenumerata Baigsis</div>
            <div className="two wide column important">Komentaras</div>
            <div className="two wide column important">
              {this.renderCreate()}
            </div>
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
