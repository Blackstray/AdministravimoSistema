// import React from 'react';
// import { createStore } from 'redux';
// import { Provider } from "react-redux";
// import { render, fireEvent, cleanup } from "@testing-library/react";
// import UserShow from '../UserShow';

// afterEach(cleanup);

// const startingState = { user: null }
// function reducer(state = startingState, action) {
//     switch (action.type) {
//         case "FETCH_USERS":
//             return state;
//     }
// }

// function renderWithRedux(
//     component,
//     { initialState, store = createStore(reducer, initialState) } = {}
// ) {
//     return {
//         ...render(
//             <Provider store={store}>{component}</Provider>)
//     }
// }

// it("renders with redux", () => {
//     const { getByTestId } = renderWithRedux(<UserShow />);
//     expect(getByTestId('adminView')).toHaveTextContent("Administravimo Sistema");
// })

// import React from 'react'
// import { render, fireEvent, screen } from './test-utils'
// import UserShow from '../UserShow'

// it('Renders the connected UserShow with initialState', () => {
//   render(<UserShow />, { initialState: { user: null} })

//   expect(screen.getByText(/redux user/i)).toBeInTheDocument()
// })

import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import { UserShow } from '../UserShow';

describe('UserShow', () => {
    it('renders the component', () => {
        const div = document.createElement("div");
        ReactDOM.render(<UserShow/>, div)
    })
})