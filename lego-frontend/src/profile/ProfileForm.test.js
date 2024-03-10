import React from "react";
import { render } from "@testing-library/react";
import Profile from "./ProfileForm";
import { UserProvider } from "../testUtils";
import { MemoryRouter } from "react-router";

// TODO: woefully under-tested!

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <Profile />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
