import React, { useContext } from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { Navbar } from "reactstrap";
import UserContext from "./UserContext"


function NavBar({ logout }) {
  const { currentUser } = useContext(UserContext);

  function userLoggeIn() {
    return (
      <>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/" onClick={logout}>Log out {currentUser.username}</NavLink>
      </>
    );
  }

  function userNotLogged() {
    return (
      <>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
      </>
    );
  }

  return (
    <Navbar className="NavBar">
      <NavLink className="NavBar-brand" exact to="/" > The Art of Lego </NavLink>

      {!currentUser ? userNotLogged() : userLoggeIn()}

    </Navbar>
  );



}

export default NavBar;