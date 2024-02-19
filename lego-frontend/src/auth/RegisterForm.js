import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../helpers/Alert";
import "./RegisterForm.css";


function RegisterForm({ register }) {

    const INITIAL_STATE = { username: "", password: "", firstName: "", lastName: "", email: "" };
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [formErrors, setFormErrors] = useState([]);
    const [isRegister, setIsRegister] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(evt) {
        evt.preventDefault();
        try {

            console.debug("RegisterForm", formData);
            await register(formData);
            setIsRegister(true);

            setTimeout(() => { navigate("/") }, 2000)

        } catch (err) {
            setFormErrors(err);
            return;
        }

        setFormErrors([]);
        setFormData(INITIAL_STATE);

    };

    /** Update local state w/curr state of input elem */

    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(fData => ({ ...fData, [name]: value }));
    };

    return (
        <div className="RegisterForm">
            <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                <h3 className="mb-3">Register</h3>
                {
                    isRegister ? <Alert type="success" messages={["Successfully Register"]} /> : null
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
                                    autoComplete="username"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="form-label">Password</label>
                                <input type="password"
                                    id="password"
                                    name="password"
                                    className="form-control"
                                    value={formData.password}
                                    onChange={handleChange}
                                    autoComplete="password"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="form-label">First Name</label>
                                <input name="firstName"
                                    id="firstName"
                                    className="form-control"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="form-label">Last Name</label>
                                <input name="lastName"
                                    id="lastName"
                                    className="form-control"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="form-label">Email</label>
                                <input name="email"
                                    id="email"
                                    className="form-control"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            {
                                formErrors.length ? <Alert type="danger" messages={formErrors} /> : null
                            }
                            <div className="d-grid">
                                <button className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterForm;
