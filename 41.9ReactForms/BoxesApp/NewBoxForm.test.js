import React from "react";
import { render } from "@testing-library/react";
import NewBoxForm from "../../react-forms-boxes-todos-solution/boxes-app/src/NewBoxForm";

it("renders without crashing", function() {
  render(<NewBoxForm />);
});

it("matches snapshot", function() {
  const { asFragment } = render(<NewBoxForm />);
  expect(asFragment()).toMatchSnapshot();
});
