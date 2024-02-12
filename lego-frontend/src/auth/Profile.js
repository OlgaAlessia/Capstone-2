import React, { useContext } from "react";
import UserContext from "../UserContext";
import "./Profile.css";


function Profile() {

    const { currentUser } = useContext(UserContext);

    return (
        <div className="Profile row d-flex justify-content-center align-items-center h-100">
            <div className="col col-md-9 col-lg-7 col-xl-5">
                <div className="card">
                    <div className="card-body p-4">
                        <div className="d-flex text-black">
                            <div className="flex-shrink-0">
                                <img src={currentUser.photo_url} alt="Photo" className="cardImg img-fluid" />
                            </div>
                            <div className="flex-grow-1 ms-3">
                                <h5 className="mb-1">{currentUser.firstName} {currentUser.lastName}</h5>
                                <p className="mb-2 pb-1">{currentUser.username}</p>
                                <div className="d-flex lightblue justify-content-start ">

                                    {currentUser.bio ?
                                        <div className="mt-2">
                                            <p className="mb-1 colorGreen">Bio</p>
                                            <p className="small mb-0">{currentUser.bio}</p>
                                            <br />
                                        </div>
                                        : null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <a href="/edit_profile" className="btn btn-info mx-4 mb-4">Edit Profile</a>
                </div>

            </div>
        </div>
    )

}

export default Profile;
