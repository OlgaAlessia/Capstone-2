//import React, { useContext } from "react";
//
import React, { useContext, useState, useEffect } from "react";
import UserContext from "../UserContext";
import LegoApi from "../LegoApi"
import "./Profile.css";

/** Profile page.
 *
 * Shows profile information.
 * Edit profile button redirects to /edit_profile
 *
 * Routed as /profile
 * Routes -> Profile
 */


function Profile() {
    const [ userInfo, setUserInfo ] = useState({})
    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        LegoApi.getCurrentUser(currentUser.username).then((result) => setUserInfo(result));
    }, [currentUser.username]);


    return (
        <div className="Profile row d-flex justify-content-center align-items-center h-100">
            <div className="col col-md-9 col-lg-7 col-xl-5">
                <div className="card">
                    <div className="card-body p-4">
                        <div className="d-flex text-black">
                            <div className="flex-shrink-0">
                                <img src={userInfo.photoUrl} alt={userInfo.photoUrl} className="cardImg img-fluid" />
                            </div>
                            <div className="flex-grow-1 ms-3">
                                <h5 className="mb-1">{userInfo.firstName} {userInfo.lastName}</h5>
                                <p className="mb-2 pb-1">{userInfo.username}</p>

                                {userInfo.bio ?
                                    <div className="d-flex justify-content-start ">
                                        <p className="font-weight-bold"><b>Bio:</b>  {userInfo.bio}</p>
                                    </div>
                                    : null
                                }
                            </div>
                        </div>
                    </div>
                    <a href="/edit_profile" className="btn btn-info mx-4 mb-4">Edit Profile</a>
                </div>
            </div>
        </div>

    );

}

export default Profile;
