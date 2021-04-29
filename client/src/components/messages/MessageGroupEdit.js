import _ from 'lodash';
import React from 'react';
import { Button, Modal, Icon } from 'semantic-ui-react';
import { connect } from "react-redux";
import { editMessageGroup, fetchMessageGroup } from "../../actions/messageGroups";
import MessageGroupForm from './MessageGroupForm';
import '../GlobalStyles.css';

class MessageGroupEdit extends React.Component {
    state = { open: false }

    componentDidMount() {
        this.props.fetchMessageGroup(this.props.id);
        console.log(this.props.messageGroup)
    }

    onSubmit = (formValues) => {
        console.log(formValues);
        this.props.editMessageGroup(this.props.id, formValues);
    }

    render(){
        return (
            <div>
                <Button
                    icon
                    style={{color: "rgb(66, 64, 64)"}}
                    onClick={() => this.setState({open: true})}
                    compact
                    circular
                >
                    {/* <Icon name='edit' /> */}
                    Redaguoti
                </Button>

                <Modal
                    className="modalSmall"
                    dimmer='blurring'
                    open={this.state.open}
                    onClose={() => this.setState({open: false})}
                    style={{padding: '10px'}}
                >
                    <Modal.Header>Redaguoti Grupė</Modal.Header>
                    <Modal.Content>
                        <MessageGroupForm initialValues={_.pick(this.props.messageGroup, 'name', 'description', 'members')}
                        onSubmit={this.onSubmit} />
                    </Modal.Content>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { messageGroup: state.messageGroups[ownProps.id] };
  };

export default  connect(mapStateToProps, { editMessageGroup, fetchMessageGroup })(MessageGroupEdit);