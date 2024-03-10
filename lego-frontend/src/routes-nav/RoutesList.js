import React from "react";
import { Route, Routes } from "react-router-dom";

import Homepage from "../homepage/Homepage";
import LegoList from "../lego/LegoList";
import LegoLists from "../lego/LegoLists";
import LegoSetDetails from "../lego/LegoSetDetails";
import LegoSets from "../lego/LegoSets";
import LegoSetSearch from "../lego/LegoSetSearch";
import LoginForm from "../auth/LoginForm";
import AddToList from "../lego/AddToList";
import Profile from "../profile/Profile";
import ProfileForm from "../profile/ProfileForm";
import RegisterForm from "../auth/RegisterForm";
import NotFound from '../NotFound';

/** Site-wide routes.
 *
 * Visiting a non-existant route redirects to the homepage.
 */


/** Site-wide routes.
 *
 * Parts of site should only be visitable when logged in. Those routes are
 * wrapped by <PrivateRoute>, which is an authorization component.
 *
 * Visiting a non-existant route redirects to the homepage.
 */

function RoutesList({ login, register }) {
  return (
    <main className="container pt-3">
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/edit_profile" element={<ProfileForm />} />
        <Route path="/legolists" element={<LegoLists />} />
        <Route path="/legolists/:list_id" element={<LegoList />} />
        <Route path="/legosets" element={<LegoSets />} />
        <Route path="/legosets/:set_num" element={<LegoSetDetails />} />
        <Route path="/legosetsearch" element={<LegoSetSearch />} />
        <Route path="/list" element={<AddToList />} />
        <Route path="/login" element={<LoginForm login={login} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<RegisterForm register={register} />} />

        {/* Error route */}
        <Route path="*" element={<NotFound />} />
      </Routes>

    </main>
  );
}


export default RoutesList;



