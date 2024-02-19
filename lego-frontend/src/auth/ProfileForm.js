import React, { useState, useContext } from "react";
import Alert from "../helpers/Alert";
import UserContext from "../UserContext";
import LegoApi from "../LegoApi"
import { useNavigate } from "react-router-dom";

function ProfileForm() {

    const { currentUser, setCurrentUser } = useContext(UserContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: currentUser.username,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        bio: currentUser.bio
    });
    const [formErrors, setFormErrors] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);

    async function handleSubmit(evt) {
        evt.preventDefault();

        if (!formData.bio) formData.bio = ""

        const userData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            bio: formData.bio
        }

        let updatedUserData;
        try {
            updatedUserData = await LegoApi.saveProfile(formData.username, userData);
        } catch (err) {
            setFormErrors(err);
            return;
        }

        setFormData(fData => ({ ...fData }));
        setFormErrors([]);
        setIsUpdated(true);

        setCurrentUser(currentUser => ({ ...currentUser, data: updatedUserData }));

        setTimeout(() => { navigate("/profile") }, 2000);
    };


    /** Update local state w/curr state of input elem */

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(fData => ({ ...fData, [name]: value }));
        setFormErrors([]);
    };


    return (
        <div className="ProfileForm">
            <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                <h3 className="mb-3">Profile</h3>
                {
                    isUpdated ? <Alert type="success" messages={["Updated successfully"]} /> : null
                }
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="form-label">Username</label>
                                <input name="username"
                                    id="username"
                                    className="form-control"
                                    value={formData.username}
                                    onChange={handleChange}
                                    disabled
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="form-label">First Name</label>
                                <input name="firstName"
                                    id="firstName"
                                    className="form-control"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="form-label">Last Name</label>
                                <input name="lastName"
                                    id="lastName"
                                    className="form-control"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="form-label">Email</label>
                                <input name="email"
                                    id="email"
                                    className="form-control"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="form-label">Bio</label>
                                <textarea name="bio"
                                    id="bio"
                                    className="form-control"
                                    value={formData.bio}
                                    onChange={handleChange}
                                    rows="4"
                                />
                            </div>
                            {
                                formErrors.length ? <Alert type="danger" messages={formErrors} /> : null
                            }
                            <div className="d-grid">
                                <button className="btn btn-primary">Save Changes</button>
                                <a href="/profile" className="btn btn-primary mt-3">Go Back</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileForm;
