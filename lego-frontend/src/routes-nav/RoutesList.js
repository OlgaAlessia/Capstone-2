import React from "react";
import { Route, Routes } from "react-router-dom";

import Homepage from "../homepage/Homepage";
import LegoList from "../lego/LegoList";
import LegoLists from "../lego/LegoLists";
import LegoSetDetails from "../lego/LegoSetDetails";
import LegoSetSearch from "../lego/LegoSetSearch";
import LoginForm from "../auth/LoginForm";
import Profile from "../profile/Profile";
import ProfileForm from "../profile/ProfileForm";
import RegisterForm from "../auth/RegisterForm";

/** Site-wide routes.
 *
 * Parts of site should only be visitable when logged in. Those routes are
 * wrapped by <PrivateRoute>, which is an authorization component.
 *
 * Visiting a non-existant route redirects to the homepage.
 */


function RoutesList({ login, register })  
{
  return (
    <main className="container-fluid pt-3">

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/legolists/:list_id" element={<LegoList />} />
          <Route path="/legolists" element={<LegoLists />} />
          <Route path="/legosets/:set_num" element={<LegoSetDetails />} />
          <Route path="/legosetsearch" element={<LegoSetSearch />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit_profile" element={<ProfileForm />} />
          <Route path="/login" element={<LoginForm login={login} />} />
          <Route path="/register" element={<RegisterForm register={register} />} />
        </Routes>
    </main>
  );
}


export default RoutesList;



