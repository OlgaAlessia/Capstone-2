import React, { useState, useEffect } from "react";
import useLocalStorage from "./helpers/useLocalStorage";
import { jwtDecode } from "jwt-decode";

import LegoApi from "./LegoApi"
import UserContext from "./UserContext";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./routes-nav/NavBar";
import RoutesList from "./routes-nav/RoutesList";

import './App.css';

const TOKEN_NAME = "lego_token";

function App() {

    const [token, setToken] = useLocalStorage(TOKEN_NAME);
    const [currentUser, setCurrentUser] = useState({ userInfo: null, infoLoaded: false });

    useEffect(
        function loadUserInfo() {
            //console.debug("App useEffect loadUserInfo", "token: ", token);

            async function getCurrentUser() {
                if (token) {
                    try {
                        const { username } = jwtDecode(token);

                        // put the token on the Api class so it can use it to call the API.
                        LegoApi.token = token;
                        const currentUser = await LegoApi.getCurrentUser(username);
                        
                        setCurrentUser({
                            infoLoaded: true,
                            userInfo: currentUser
                        });

                    } catch (err) {
                        console.error("App loadUserInfo: problem loading", err);
                        setCurrentUser({
                            infoLoaded: true,
                            userInfo: null
                        });
                    }
                } else {
                    setCurrentUser({
                        infoLoaded: true,
                        userInfo: null
                    });
                }
            }
            getCurrentUser();
        },
        [token]
    );

    /** Handles login */
    async function login(loginData) {
        let token = await LegoApi.login(loginData);
        setToken(token);
    }

    /** Handles register */
    async function register(loginData) {
        let token = await LegoApi.register(loginData);
        setToken(token);
    }

    /** Handles logout.*/
    function logout() {
        setCurrentUser({
            infoLoaded: true,
            userInfo: null
        });
        setToken(null);
    }

    if (!currentUser.infoLoaded) return (<div className="App"><h2 className="loading"> Loading ... </h2></div>);

    return (
        <UserContext.Provider value={{ currentUser: currentUser.userInfo, setCurrentUser }}>
            <div className="App">
                <BrowserRouter>
                    <NavBar logout={logout} />
                    <RoutesList login={login} register={register} currentUser={currentUser.data} />
                </BrowserRouter>
            </div>
        </UserContext.Provider >
    );
}

export default App;
