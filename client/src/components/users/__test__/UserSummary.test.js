import React from 'react';
import ReactDOM from 'react-dom';
import UserSummary from '../UserSummary';

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<UserSummary />, div)
})

//prop test

//important snapshot is 
