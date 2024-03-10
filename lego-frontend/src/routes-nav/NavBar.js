import React, { useContext } from "react";

import { NavLink } from "react-router-dom";
import { Navbar } from "reactstrap";
import UserContext from "../UserContext"
import "./NavBar.css";

/** Navigation bar for site. Shows up on every page.
 *
 * When user is logged in, shows links to main areas of site. 
 * When not, shows link to Login and Register forms.
 *
 * Rendered by App.
 */

function NavBar({ logout }) {
  const { currentUser } = useContext(UserContext);

  function userLoggeIn() {
    return (
      <>
        <NavLink to="/legolists">My Lists</NavLink>
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
      <NavLink className="NavBar-brand" to="/" > The Art of Lego </NavLink>

      {!currentUser ? userNotLogged() : userLoggeIn()}

    </Navbar>
  );



}

export default NavBar;