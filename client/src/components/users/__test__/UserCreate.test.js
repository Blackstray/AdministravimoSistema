import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import ReactDOM from "react-dom";
import UserCreate from "../UserCreate";
import createStore from "redux-mock-store";
import { Provider } from "react-redux";
import UserForm from "../UserForm";
import { render, fireEvent } from "@testing-library/react";
describe("UserCreate", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    const state = {};
    const store = createStore()(state);

    ReactDOM.render(
      <Provider store={store}>
        <UserCreate
          createUser={{ username: "test", password: "test", role: "user" }}
        />
      </Provider>,
      div
    );
  });

//   it("executing onSubmit", () => {
//     const state = {};
//     const store = createStore()(state);
//     const { getByTestId } = render(
//       <Provider store={store}>
//         <UserCreate
//           createUser={{ username: "test", password: "test", role: "user" }}
//         />
//       </Provider>
//     );
//     const form = getByTestId("user-form");
//     fireEvent.submit();
//   });

  //   it("renders without crashing", () => {
  //     fireEvent.submit()
  //   });
});
