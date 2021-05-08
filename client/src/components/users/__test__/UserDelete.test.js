import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import ReactDOM from "react-dom";
import { Router, Route, Switch } from "react-router-dom";
import history from "../../../history";
import UserDelete from "../UserDelete";

describe("UserDelete", () => {
  it("renders the component", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Router history={history}>
        <Route path="/users/delete/608d7bd4ebcee99930b05b9d" component={UserDelete} />
      </Router>,
      div
    );
  });
});
