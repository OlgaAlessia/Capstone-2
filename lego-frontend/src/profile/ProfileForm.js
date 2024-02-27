import React, { useState, useContext } from "react";
import Alert from "../helpers/Alert";
import UserContext from "../UserContext";
import LegoApi from "../LegoApi"
import { useNavigate } from "react-router-dom";

/** Profile editing form.
 *
 * Displays profile form and handles changes to local form state.
 * Submitting the form calls the API to save, and triggers user reloading
 * throughout the site.
 *
 * Confirmation of a successful save and show with <Alert>
 *
 * Routed as /edit_profile
 * Routes -> ProfileForm
 */

function ProfileForm() {

    const navigate = useNavigate();

    const {currentUser, setCurrentUser} = useContext(UserContext);

    const [formData, setFormData] = useState({
        username: currentUser.username,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        photoUrl: currentUser.photoUrl,
        bio: currentUser.bio
    });

    const [formErrors, setFormErrors] = useState([]);
    const [updatedConfirmed, setUpdatedConfirmed] = useState(false);

    /** handleSubmit:
     * - Save profile user data to backend & report any errors
     * - if successful
     *   - clear previous error messages
     *   - show save-confirmed message
     *   - set current user info throughout the site
     */
    async function handleSubmit(evt) {
        evt.preventDefault();

        console.debug(currentUser);

        if (!formData.bio) formData.bio = ""

        const userData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            photoUrl: formData.photoUrl,
            bio: formData.bio
        }

        let username = formData.username;
        let updatedUserData;

        try {
            updatedUserData = await LegoApi.saveProfile(username, userData);
        } catch (err) {
            setFormErrors(err);
            return;
        }

        setFormData(fData => ({ ...fData }));
        setFormErrors([]);
        setUpdatedConfirmed(true);

        // trigger reloading of user information throughout the site
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
                    updatedConfirmed ? <Alert type="success" messages={["Updated successfully"]} /> : null
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
                                <label htmlFor="form-label">Url Photo</label>
                                <input name="photoUrl"
                                    id="photoUrl"
                                    className="form-control"
                                    value={formData.photoUrl == null ? '' : formData.photoUrl}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="form-label">Bio</label>
                                <textarea name="bio"
                                    id="bio"
                                    className="form-control"
                                    value={formData.bio == null ? '' : formData.bio}
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
