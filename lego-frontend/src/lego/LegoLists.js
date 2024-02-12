import React, { useState, useEffect } from "react";
import RebrickableApi from "../RebrickableApi"
import { NavLink } from "react-router-dom";
import "./Lego.css";

function LegoLists() {
    const [myLists, setMyLists] = useState([]);

    useEffect(() => {
        RebrickableApi.fetchMyLists().then((result) => setMyLists(result.results));
    }, []);

    if (!myLists) return (<div> Loading ... </div>);

    return (
        <div className="col-md-8 offset-md-2">
            {myLists.length ?
                (<div className="LegoLists-list">
                    {myLists.map(l => (

                        <NavLink key={l.id} to={`${l.id}`}>

                            <h4 className="LegoLists-name">{l.name}</h4>
                            {(l.num_sets <= 1) ?
                                <h4><small>Num of Set: {l.num_sets}</small></h4>
                                :
                                <h4><small>Num of Sets: {l.num_sets}</small></h4>
                            }


                        </NavLink >
                    ))}
                </div>
                ) : (
                    <p>Sorry, no lists were found!</p>
                )}
        </div>
    )
};


export default LegoLists;

