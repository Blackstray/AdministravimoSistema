import React, {useState, useEffect, useRef} from "react";
import { Button, Dropdown } from 'semantic-ui-react';
import "./users/UserStyles.css";

const DropdownButton = (props) => {
  //console.log(props.options);
    return (
        <Button.Group color='teal'>
        <Dropdown
          className='button icon'
          floating
          options={props.options}
          trigger={<></>}
        />
      </Button.Group>
    );
  }

export default DropdownButton;
