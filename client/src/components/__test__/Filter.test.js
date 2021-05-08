import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import ReactDOM from "react-dom";
import { Router, Route, Switch } from "react-router-dom";
import history from "../../history";
import Filter from "../Filter";

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Filter />, div)
})