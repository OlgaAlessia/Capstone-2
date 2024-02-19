import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../helpers/Alert";
import "./LoginForm.css";

function LoginForm({ login }) {

    const INITIAL_STATE = { username: "", password: "" };
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [formErrors, setFormErrors] = useState([]);
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();


    async function handleSubmit(evt) {

        evt.preventDefault();
        try {
            await login(formData);

            setIsLogin(true);

            setTimeout(() => { navigate("/") }, 2000);

            setFormData(INITIAL_STATE);
        } catch (err) {
            setFormErrors(err);
        }
    };

    /** Update local state w/curr state of input elem */

    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(fData => ({ ...fData, [name]: value }));
    };



    return (
        <div className="LoginForm">
            <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                <h3 className="mb-3">Log In</h3>
                {
                    isLogin ? <Alert type="success" messages={["Successfully Login"]} /> : null
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

export default LoginForm;
