//import React, { useState } from "react";
//import { useLocation, useNavigate } from "react-router-dom";
import React from "react";
import { useLocation } from "react-router-dom";

//import Alert from "../common/Alert";
//import LegoApi from "../LegoApi"
import LegoSets from "./LegoSets"
import "./Lego.css";

/** LegoList page.
 *
 * Show the Lego Sets that are inside the list (:list_id) that the currentUser has click.
 *
 * Routed at /legolists/:list_id
 *
 * Routes -> LegoList
 */

const LegoList = () => {

    let location = useLocation();
    // const navigate = useNavigate();

    const { lists } = location.state || {};
    // const { id } = location.state || {};
    const { name } = location.state || "";
/*
    const [errors, setErrors] = useState([]);
    const [isRemoved, setIsRemoved] = useState("");

    
        async function deleteList(evt) {
            if (!id) {
                setErrors(['You can not delete this list. Please click the Go Back button']);
            }
            else {
                evt.preventDefault();
                LegoApi.deleteList(id).then(res => {
                    setIsRemoved(true);
                    setTimeout(() => { navigate("/legolists") }, 2000);
                }).catch(err => {
                    setErrors(err);
                    setIsRemoved(false);
                    setTimeout(() => { setErrors([]) }, 2000);
                });
            }
        };
    
         return (
            <>
                <h2 className="mt-4">List: {name} </h2>
                <br />
                    <div className="row-button mb-3">
                    <a href="/legolists" className="btn btn-danger">Go Back</a>
                    
                    <button className="btn remove-button" onClick={deleteList}>
                        Delete List <i className="fa-solid fa-trash"></i>
                    </button>
    
                </div>
                {
                    isRemoved ? <Alert type="success" messages={["List removed successfully"]} /> : null
                }
                {
                    errors.length ? <Alert type="danger" messages={errors} /> : null
                }
                {
    
                    !lists ?
                        <h4 className="mt-4"> You don't have any Sets in this List ... </h4>
                        :
                        <div className="LegoList" >
                            <LegoSets legoSets={lists} />
                        </div>
                }
    
            </>
        );
    */
    return (
        <>
            <h2 className="mt-4">List: {name} </h2>
            <br />
            <div className="row-button mb-3">
                <a href="/legolists" className="btn btn-danger">Go Back</a>
            </div>
            {
                !lists ?
                    <h4 className="mt-4"> You don't have any Sets in this List ... </h4>
                    :
                    <div className="LegoList" >
                        <LegoSets legoSets={lists} />
                    </div>
            }

        </>
    );

};

export default LegoList;
