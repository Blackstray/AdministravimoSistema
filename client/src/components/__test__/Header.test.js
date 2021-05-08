import React from "react";
//import ReactTestUtils from "react-dom/test-utils";
import ReactDOM from "react-dom";
import { Router, Route, Switch } from "react-router-dom";
import history from "../../history";
import { Header } from "../Header";

// describe("Header", () => {
//   it("renders the component", () => {
//     const div = document.createElement("div");
//     ReactDOM.render(
//       <Router history={history}>
//         <Route path="/login" component={Header} />
//       </Router>,
//       div
//     );
//   });
// });

import { render, fireEvent, screen } from '../users/__test__/test-utils';
import { shallow } from 'enzyme';
import { findByTestAttr, testStore } from './../../../Utils';

const setUp = (initialState={}) => {
  const store = testStore(initialState);
  const wrapper = shallow(<Header store={store}/>);
  return wrapper;
}
describe('Header Component', () => {
//render(<Header />, { initialState: { auth: {user: {user: { firstname: "Ugnius", role: "admin" }}}, isSignedIn: true } })
  it('Renders the connected app with initialState', () => {
    
    //const component = shallow(<Header />);
    //const wrapper = component.find('.nav');
    //expect(wrapper.length).toBe(1);
    let wrapper;
    beforeEach(() => {
      const initialState = {
        user: { user: { firstname: "Ugnius"} },
        isSignedIn: true,
      }
    })
  });

});
