import React from "react";
import { Segment } from 'semantic-ui-react'
import "../GlobalStyles.css";

const UserSummary = (props) => {
    return (
        <Segment.Group horizontal>
            <Segment className="important">Klientai: {props.count}</Segment>
            <Segment className="important">Prenumeratų Pajamos: {props.income} €</Segment>
        </Segment.Group>
    )
}

export default UserSummary;