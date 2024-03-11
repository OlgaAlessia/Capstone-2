import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye'
import Alert from "../common/Alert";
import "./RegisterForm.css";

/** Register form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls register function prop
 * - redirects to / route
 *
 * Routed as /register
 */
function RegisterForm({ register }) {

    const INITIAL_STATE = { username: "", password: "", firstName: "", lastName: "", email: "" };
    const navigate = useNavigate();
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [formErrors, setFormErrors] = useState([]);
    const [isRegister, setIsRegister] = useState(false);
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);

    async function handleSubmit(evt) {
        evt.preventDefault();
        let result = await register(formData);
        if (result.success) {
            setIsRegister(true);
            setTimeout(() => { navigate("/") }, 2000);
            setFormData(INITIAL_STATE);
        } else {
            setFormErrors(result.errors);
            setTimeout(() => { setFormErrors([]); }, 2000);
        }
    }


    const handleToggle = () => {
        if (type==='password'){
           setIcon(eye);
           setType('text')
        } else {
           setIcon(eyeOff)
           setType('password')
        }
     }

    /** Update local state w/curr state of input elem */

    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(fData => ({ ...fData, [name]: value }));
    };

    return (
        <div className="RegisterForm">
            <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                <h3 className="mb-4">Register</h3>
                {
                    isRegister ? <Alert type="success" messages={["Successfully Register"]} /> : null
                }
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
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
                            <label htmlFor="form-label">Password</label>
                            <div className="mb-4 d-flex">
                                <input type={type}
                                    id="password"
                                    name="password"
                                    className="form-control"
                                    value={formData.password}
                                    onChange={handleChange}
                                    autoComplete="password"
                                    required
                                />
                                <Icon className="iconEye" icon={icon} size={25} onClick={handleToggle}/>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="form-label">First Name</label>
                                <input name="firstName"
                                    id="firstName"
                                    className="form-control"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="form-label">Last Name</label>
                                <input name="lastName"
                                    id="lastName"
                                    className="form-control"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-4">
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
