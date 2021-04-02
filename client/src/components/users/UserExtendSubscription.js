import React from 'react';
import { Button, Icon, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchUser, editUser } from "../../actions/users";
import { Link } from 'react-router-dom';
import history from "../../history";
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import Modal from "../Modal";
import '../GlobalStyles.css';
class UserExtendSubscription extends React.Component {
    state = { date: null }

    onSubmit = (params, date) => {
        console.log(date);
        this.props.editUser(params.id)
    }
    
    onChange = (data) => {
        this.setState({ date: data.value })
    }
    

    renderActions() {
        return (
          <React.Fragment>
            <Link to={'/'} onClick={() => this.onSubmit(this.props.match.params, this.date)} className="ui button negative">
              Patvirtinti
            </Link>
            <Link to={'/'} className="ui button">
              Atšaukti
            </Link>
          </React.Fragment>
        );
    }
    renderContent() {
        return <SemanticDatepicker id="senddate" name="senddate" label="Siuntimo Data" autoComplete="off" onChange={this.onChange} />;
    }

    render() {
        return (
            <div className='modalSmall' style={{ maxWidth: '150px'}}>
            <Modal
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