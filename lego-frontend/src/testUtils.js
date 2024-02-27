import React from "react";
import UserContext from "./UserContext";

const demoUser = {
  username: "testUser",
  first_name: "Test",
  last_name: "User",
  email: "testUser@gmail.com",
  isAdmin: true,
};

const UserProvider =
    ({ children, currentUser = demoUser, hasAppliedToJob = () => false }) => (
    <UserContext.Provider value={{ currentUser, hasAppliedToJob }}>
      {children}
    </UserContext.Provider>
);

export { UserProvider };
