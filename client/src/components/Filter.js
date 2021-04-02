import React, { useState } from 'react';
import "./GlobalStyles.css"

function Filter() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div classname="filter">
        <button onclick={() => setIsOpen(!isOpen)} className="filter_button"></button>
        </div>
    )
}

export default Filter;
