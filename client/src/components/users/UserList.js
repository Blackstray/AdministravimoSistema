import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUsers } from "../../actions/users";
import { refreshTokens } from '../../actions/auth';
import {
  List,
  Icon,
  Dropdown,
  Search,
  Grid,
  Container, 
  Popup
} from "semantic-ui-react";
import UserCreate from "./UserCreate";
import Header from "../Header";
import UserSummary from "./UserSummary";
import UserEdit from "./UserEdit";
import "../GlobalStyles.css";

class UserList extends React.Component {
  state = { search: "", filter: "date" };
  
  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    //console.log(user.tokens.refresh.token);
    var refreshToken = { refreshToken: user.tokens.refresh.token};
    this.props.refreshTokens(refreshToken);
    this.props.fetchUsers();
  }

  componentDidUpdate() {
    //console.log(this.state.search);
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
    var date = new Date(user.subscriptionEnd).toLocaleDateString(); //buvo *1000

    return <div>{date}</div>;
  }

  //Apskaiciuoja skirtuma dienomis
  calculateDifferance(date) {
    var currentDate = new Date();
    var diff = Math.floor((date - currentDate) / 86400000);
    return diff;
  }

  setColor(user) {
    var date = new Date(user.subscriptionEnd);
    var dif = this.calculateDifferance(date);
    if (dif < 7 && dif > 0) {
      return "yellow";
    } else if (dif < 0) {
      return "red";
    } else {
      return "green";
    }
  }

  renderSummery(users) {
    var expiringCount = 0;
    var expiredCount = 0;
    var income = 0;
    var date;
    var dif;
    for (var i = 0; i < users.length; i++) {
      income = income + parseFloat(users[i].price);
      date = new Date(users[i].subscriptionEnd);
      dif = this.calculateDifferance(date);
      if (dif < 7 && dif > 0) {
        expiringCount = expiringCount + 1;
      }
      if (dif < 0) {
        expiredCount = expiredCount + 1;
      }
    }
    return (
      <UserSummary
        count={users.length}
        income={income.toFixed(2)}
        expiring={expiringCount}
        expired={expiredCount}
      />
    );
  }

  sortList(users) {
    var currentArr = [...users];
    var newArr;
    if (this.state.filter === "date") {
      newArr = users.sort(function (a, b) {
        return new Date(b.subscriptionEnd) - new Date(a.subscriptionEnd);
      });
      if(JSON.stringify(newArr) == JSON.stringify(currentArr)) {
        return newArr.reverse();
      } else {
        return newArr;
      }
    }
    else if (this.state.filter === "price") {
      newArr = users.sort(function (a, b) {
        return b.price - a.price;
      });
      if(JSON.stringify(newArr) == JSON.stringify(currentArr)) {
        return newArr.reverse();
      } else {
        return newArr;
      }
    }
    else
    return users;
  }

  userOptions(options, userId) {
    const newOptions = options.map((option) => {
      const newOption = Object.assign({}, option);
      newOption.href = option.href + userId;
      return newOption;
    });
    return newOptions;
  }

  renderList(users) {
    return users.map((user) => {
      if (
        user.firstname
          .toLowerCase()
          .includes(this.state.search.toLowerCase()) ||
        user.lastname.toLowerCase().includes(this.state.search.toLowerCase()) ||
        user.mac.toLowerCase().includes(this.state.search.toLowerCase()) ||
        user.subscription
          .toLowerCase()
          .includes(this.state.search.toLowerCase()) ||
        user.price.toString().includes(this.state.search.toString())
      )
        return (
          <div className="item ui grid list-items alignCenter" key={user.id}>
            <List
              className="two wide column"
              size="large"
              verticalAlign="left"
            >
              <List.Item>
                <List.Icon
                  verticalAlign="middle"
                  className={`circle ${this.setColor(user)}`}
                />
                <List.Content>
                  <List.Header>
                    <Link to={`/users/${user.id}`}>{user.firstname}</Link>
                  </List.Header>
                  <List.Description>{user.lastname}</List.Description>
                </List.Content>
              </List.Item>
            </List>
            <List
              className="two wide column"
              size="large"
              verticalAlign="middle"
            >
              <List.Item>
                <List.Content>{user.address}</List.Content>
              </List.Item>
            </List>
            <List
              className="two wide column"
              size="large"
              verticalAlign="middle"
            >
              <List.Item>
                <List.Content style={{ wordWrap: "break-word", fontSize: "13px" }}>
                  {user.mac}
                </List.Content>
              </List.Item>
            </List>
            <List
              className="two wide column"
              size="large"
              verticalAlign="middle"
            >
              <List.Item>
                <List.Content>{user.subscription}</List.Content>
              </List.Item>
            </List>
            <List
              className="two wide column"
              size="large"
              verticalAlign="middle"
            >
              <List.Item>
                <List.Content>{user.price} €</List.Content>
              </List.Item>
            </List>
            <List
              className="two wide column"
              size="large"
              verticalAlign="middle"
            >
              <List.Item>
                <List.Content>{this.renderDate(user)}</List.Content>
              </List.Item>
            </List>
            <List
              className="two wide column"
              size="large"
              verticalAlign="middle"
            >
              <List.Item>
                <List.Content>
                  <Popup
                  content={user.comment}
                  trigger={<p className="comment">{user.comment}</p>}
                  />
                  </List.Content>
              </List.Item>
            </List>
            <Container className="two wide column" textAlign="center">
              <Dropdown compact button icon="cog" style={{left:"5px",width: "40px", textAlign: "center"}}>
                <Dropdown.Menu direction="left">
                  <Dropdown.Item>
                    <Link className="text" to={`/users/extend/${user.id}`}>
                      <Icon name="calendar plus" />
                      Pratesti Prenumerata
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <UserEdit id={user.id} />
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
            </Container>
          </div>
        );
    });
  }

  render() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (this.props.isSignedIn == false) {
      window.location.href = "/login";
      return <div></div>;
    } 
    else if(user.user.role != 'admin') {
      window.location.href = `/users/${user.user.id}`;
      return <div></div>;
    }
    else
      return (
        <div className="listing text">
          <Header isSignedIn={this.props.isSignedIn}/>
          <div className="item ui grid" style={{ paddingTop: "10px", width: "80%" }}>
            <Grid container style={{ height: "60px" }}>
              <Grid.Column width={12} floated="left" className="alignRight">
                {this.renderSummery(this.props.users)}
              </Grid.Column>
              <Grid.Column width={4} floated="right" verticalAlign="middle">
                <Search
                  showNoResults={false}
                  onSearchChange={(e) =>
                    this.setState({ search: e.target.value })
                  }
                />
              </Grid.Column>
            </Grid>
          </div>
          <div className="item ui grid alignCenter main-list" style={{ verticalAlign: "middle", width: "80%" }}>
            <List
              className="two wide column important"
              size="large"
              style={{ paddingTop: "2em", left:"15px" }}
              verticalAlign="middle"
            >
              <List.Item>
                <List.Content>Vardas Pavardė</List.Content>
              </List.Item>
            </List>
            <List
              className="two wide column important"
              size="large"
              style={{ paddingTop: "1em" }}
              verticalAlign="middle"
            >
              <List.Item>
                <List.Content>Adresas</List.Content>
              </List.Item>
            </List>
            <List
              className="two wide column important"
              size="large"
              style={{ paddingTop: "1em" }}
              verticalAlign="middle"
            >
              <List.Item>
                <List.Content>MAC</List.Content>
              </List.Item>
            </List>
            <List
              className="two wide column important"
              size="large"
              style={{ paddingTop: "1em" }}
              verticalAlign="middle"
            >
              <List.Item>
                <List.Content>Prenumerata</List.Content>
              </List.Item>
            </List>
            <List
              className="two wide column important"
              size="large"
              style={{ paddingTop: "1em" }}
              verticalAlign="middle"
            >
              <List.Item onClick={() => this.setState({ filter: "price" })}>
                <List.Content>Prenumeratos Mokestis</List.Content>
              </List.Item>
            </List>
            <List
              className="two wide column important"
              size="large"
              style={{ paddingTop: "1em" }}
              verticalAlign="middle"
            >
              <List.Item onClick={() => this.setState({ filter: "date" })}>
                <List.Content>Prenumerata Baigsis</List.Content>
              </List.Item>
            </List>
            <List
              className="two wide column important"
              size="large"
              style={{ paddingTop: "1em" }}
              verticalAlign="middle"
            >
              <List.Item>
                <List.Content>Komentaras</List.Content>
              </List.Item>
            </List>
            <List
              className="two wide column important"
              size="large"
              style={{ paddingTop: "1em" }}
              verticalAlign="middle"
              style={{margin: "auto", textAlign: "center"}}
            >
              <List.Item>
                <List.Content>{this.renderCreate()}</List.Content>
              </List.Item>
            </List>
          </div>
          <div className="ui celled list list-scroll main-list" style={{ verticalAlign: "middle", width: "80%", align: "middle" }}>
            {this.renderList(this.sortList(this.props.users))}
          </div>
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

export default connect(mapStateToProps, { fetchUsers, refreshTokens })(UserList);
