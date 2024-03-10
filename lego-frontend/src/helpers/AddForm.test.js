import React from "react";
import { render } from "@testing-library/react";
import AddForm from "./AddForm";

// snapshot test
it("matches snapshot", function () {
  const { asFragment } = render(<AddForm />);
  expect(asFragment()).toMatchSnapshot();
});
