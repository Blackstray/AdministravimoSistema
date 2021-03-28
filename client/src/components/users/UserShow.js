import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../../actions/users';

class UserShow extends React.Component {
    componentDidMount(){
        this.props.fetchUser(this.props.match.params.id);
    }

    render() {
        if(!this.props.user) {
            return <div>Loading...</div>;
        }

        const { title, description } = this.props.user;

        return (
        <div>
            <h1>{title}</h1>
            <h5>{description}</h5>
        </div>
        )
    }
};

const mapStateToProps = (state, ownProps) => {
    return { user: state.users[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchUser })(UserShow);