import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye'
import Alert from "../common/Alert";
import "./LoginForm.css";

/** Login form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls login function prop
 * - redirects to / route
 *
 * Routed as /login
 */

function LoginForm({ login }) {

    const navigate = useNavigate();

    const INITIAL_STATE = { username: "", password: "" };
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [formErrors, setFormErrors] = useState([]);
    const [isLogin, setIsLogin] = useState(false);
    const [tryMsg, setTryMsg] = useState(true);
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);

    setTimeout(() => { setTryMsg(false); }, 7000);

    async function handleSubmit(evt) {
        evt.preventDefault();
        let result = await login(formData);
        if (result.success) {
            setIsLogin(true);
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
        <div className="LoginForm">
            <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                <h3 className="mb-3">Log In</h3>
                {
                    tryMsg ? <Alert type="info" messages={["To try the application use testUser - password"]} /> : null
                }
                {
                    isLogin ? <Alert type="success" messages={["Successfully Login"]} /> : null
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
