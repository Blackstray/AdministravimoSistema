import './UserStyles.css';
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUsers } from "../../actions/users";
import UserMessageSend from './UserMessageSend';
import DropdownButton from '../DropdownButton';
import UserCreate from './UserCreate';

const options = [
  { key: 'subscription', icon: 'calendar plus', text: 'Pratesti Prenumerata', href: `users/edit/`},
  { key: 'edit', icon: 'edit', text: 'Redaguoti', href: `users/edit/` },
  { key: 'delete', icon: 'delete', text: 'Pasalinti', href: `users/delete/` },
  { key: 'mail', icon: 'mail', text: 'Siusti Pranesima', href: `users/messagesend/` },
]

class UserList extends React.Component {
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
      return (
        <div className="item ui grid list-item" key={user.id}>
          <div className="two wide column">
            <Link to={`/users/${user.id}`}>{user.firstname + " " + user.lastname}</Link>
          </div>
          <div className="two wide column">{user.address}</div>
          <div className="two wide column">{user.comment}</div>
          <div className="two wide column" style={{wordWrap: 'break-word'}}>{user.mac}</div>
          <div className="two wide column">{user.subscription}</div>
          <div className="two wide column">{user.price}</div>
          <div className="two wide column">{this.renderDate(user)}</div>

          <div className="two wide column">
            <DropdownButton options={this.userOptions(options, user.id)} />
          </div>
        </div>
      );
    });
  }

  render() {
    if(this.props.isSignedIn == false){
      window.location.href = "/login";
    }
    else
    return (
      <div className="listing">
        <h2>Klientai</h2>
        <div className="item ui grid" style={{ verticalAlign: "middle" }}>
          <div className="two wide column">Vardas Pavardė</div>
          <div className="two wide column">Adresas</div>
          <div className="two wide column">Komentaras</div>
          <div className="two wide column">MAC</div>
          <div className="two wide column">Prenumerata</div>
          <div className="two wide column">Prenumeratos Mokestis</div>
          <div className="two wide column">Prenumerata Baigsis</div>
          <div className="two wide column">
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
