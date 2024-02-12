import React, { useContext } from "react";
import { Link } from 'react-router-dom'
import "./Homepage.css";
import UserContext from "./UserContext"


function Homepage() {
  const { currentUser } = useContext(UserContext);

  //console.debug("Homepage", "currentUser=", currentUser);

  return (

    <div className="Homepage">
      <div className="container text-center">
        <h1 className="mb-4 fw-bold">The Art of Lego</h1>
        {
          currentUser ?
          <>
            <h2>Welcome Back, {currentUser.username}!</h2>
            <Link className="btn btn-primary fw-bold me-3" to="/legosetsearch">Search a Lego Set</Link>
            <br/>
            <br/>
            <Link className="btn btn-primary fw-bold me-3" to="/legolists">LISTS</Link>
          </>
            :
            (

              <p>
                <Link className="btn btn-primary fw-bold me-3" to="/login">Log in</Link>
                <Link className="btn btn-primary fw-bold" to="/signup">Sign up</Link>
              </p>
            )
        }
      </div>
    </div>
  );
}

export default Homepage;
