import React from "react";
import { Button, Icon, Header } from "semantic-ui-react";
import { connect } from "react-redux";
import { fetchUser, editUser } from "../../actions/users";
import { Link } from "react-router-dom";
import history from "../../history";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import Modal from "../Modal";
import "../GlobalStyles.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
class UserExtendSubscription extends React.Component {
  state = { date: null };

  onSubmit = (params) => {
    var object = { subscriptionEnd: this.state.date };
    this.props.editUser(params.id, object);
    toast.success(`Vartotojo prenumerata pratesta`);
  };

  onChange = (data) => {
    this.setState({ date: data.value.getTime() });
    console.log(this.state.date);
  };

  renderActions() {
    return (
      <React.Fragment>
        <Link
          to={"/"}
          onClick={() => this.onSubmit(this.props.match.params)}
          className="ui button negative"
        >
          Patvirtinti
        </Link>
        <Link to={"/"} className="ui button">
          Atšaukti
        </Link>
      </React.Fragment>
    );
  }
  renderContent() {
    return (
      <SemanticDatepicker
        format="DD-MM-YYYY"
        id="senddate"
        name="senddate"
        label="Siuntimo Data"
        autoComplete="off"
        onChange={(e, data) => this.onChange(data)}
      />
    );
  }

  render() {
    return (
      <div className="modalSmall" style={{ maxWidth: "150px" }}>
        <Modal
          dimmer="blurring"
          title="Pratesti Prenumerata"
          content={this.renderContent()}
          actions={this.renderActions()}
          onDismiss={() => history.push("/")}
        />
      </div>
    );
  }
}

export default connect(null, { editUser })(UserExtendSubscription);
