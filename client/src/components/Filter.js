import React, { useState } from 'react';
import { Button, Dropdown } from "semantic-ui-react";
import "./GlobalStyles.css";

const Filter = () => {
 // Declaring a new state variable named "isOpen"
 const [isOpen, setIsOpen] = useState(false);
 
 return (
   <div className="filter_wrapper" >
     <Button
       onClick={() => setIsOpen(!isOpen)}
       className="filter_button"
     >
       Prenumeratu tipai
     </Button >
   </div >
 );
}

export default Filter;