import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions/users';
import './GlobalStyles.css';

class GoogleAuth extends React.Component {
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({ clientId: '577340950283-ou6auuo3vegtmbh3mo052p9ud6p0uasf.apps.googleusercontent.com',
            scope: 'email'
        }).then(() => {
            this.auth = window.gapi.auth2.getAuthInstance();
            
            this.onAuthChange(this.auth.isSignedIn.get());
            this.auth.isSignedIn.listen(this.onAuthChange);
        });
        });
    }

    onAuthChange = (isSignedIn) => {
        if(isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    };

    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
            <button className="ui menu button" onClick={this.onSignOutClick}>
                <i className="google icon" />
                Atsijungti
            </button>
            );
        } else {
            return (
                <button className="ui green google button wide" onClick={this.onSignInClick}>
                    <i className="google icon" />
                    {this.props.name}
                </button>
                );
        }
    }

    render (){
        return <div>{this.renderAuthButton()}</div>;
    }
}

GoogleAuth.defaultProps = {
    name: 'Prisijungti'
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);