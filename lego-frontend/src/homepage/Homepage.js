import React, { useContext } from "react";
import { Link } from 'react-router-dom'
import legoWall from "./legoBackground.jpg"

import "./Homepage.css";
import UserContext from "../UserContext"

/** Homepage of site.
 *
 * Shows welcome message and Search Lego Set/Lists buttons or login/register buttons.
 *
 * Routed at /  -> Homepage
 */
function Homepage() {
  const { currentUser } = useContext(UserContext);

  //console.debug("Homepage", "currentUser=", currentUser);

  return (

    <div className="Homepage">
      <img alt="legoWall" src={legoWall} />
      <div className="artLego flex-container text-center">
        <h1 className="mb-4 fw-bold">The Art of Lego</h1>
        {
          currentUser ?
          <>
            <h2>Welcome Back, {currentUser.username}!</h2>
            <br/>
            <Link className="btn btn-primary fw-bold me-3" to="/legosetsearch">Search a Lego Set</Link>
            <Link className="btn btn-primary fw-bold m-3" to="/legolists">LISTS</Link>
          </>
            :
            (
              <p>
                <Link className="btn btn-primary fw-bold me-3" to="/login">Log in</Link>
                <Link className="btn btn-primary fw-bold m-3" to="/register">Register</Link>
              </p>
            )
        }
      </div>
    </div>
  );
}

export default Homepage;
