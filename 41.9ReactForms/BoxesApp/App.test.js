import React from "react";
import { render } from "@testing-library/react";
import App from "../../react-forms-boxes-todos-solution/boxes-app/src/App";

it("renders without crashing", function() {
  render(<App />);
});

it("matches snapshot", function() {
  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
});
