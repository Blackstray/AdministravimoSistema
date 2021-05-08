import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import ReactDOM from "react-dom";
import { Router, Route, Switch } from "react-router-dom";
import history from "../../../history";
import UserList from "../UserList";

describe("UserList", () => {
  it("renders the component", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Router history={history}>
        <Route path="/users" component={UserList} />
      </Router>,
      div
    );
  });
});