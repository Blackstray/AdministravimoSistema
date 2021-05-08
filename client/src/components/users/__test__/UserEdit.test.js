import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import ReactDOM from "react-dom";
import UserEdit from "../UserEdit";
import createStore from "redux-mock-store";
import { Provider } from "react-redux";
import UserForm from "../UserForm";
import { render, fireEvent } from "@testing-library/react";

import history from "../../../history";
import { Router, Route, Switch } from "react-router-dom";

describe("UserEdit", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    const state = {};
    const store = createStore()(state);

    ReactDOM.render(
        <Router history={history}>
          <Route path="/users/edit/608d7bd4ebcee99930b05b9d" component={UserEdit} />
        </Router>,
        div
      );
  });
});