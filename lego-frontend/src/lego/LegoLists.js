import React, { useState, useEffect, useContext } from "react";
import UserContext from "../UserContext"
import AddForm from "../helpers/AddForm";
import Alert from "../helpers/Alert";
import LegoApi from "../LegoApi"
import { Link } from "react-router-dom";
import "./Lego.css";

function LegoLists() {
    const [myLists, setMyLists] = useState([]);
    const { currentUser } = useContext(UserContext);
    const [formErrors, setFormErrors] = useState([]);
    const [isAdded, setIsAdded] = useState(false);

    useEffect(() => {
        LegoApi.getListByUser(currentUser.id).then((result) => setMyLists(result.lists));
    }, []);


    /** Handles addListSet 
     * json_agg and num_sets are set to null and 0
     * 
    */
    async function addListSet(nameList) {

        await LegoApi.createListSet(nameList, currentUser.id).then(listSets => {

            listSets.set.json_agg = null;
            listSets.set.num_sets = "0"
            setMyLists([...myLists, listSets.set]);

            setIsAdded(true);

            setTimeout(() => { setIsAdded(false); }, 2000);
        }).catch(err => {
            setFormErrors(err);
            setTimeout(() => { setFormErrors([]); }, 2000);
        })

    }

    if (!myLists) return (<div> Loading ... </div>);

    return (
        <div className="LegoLists col-md-8 offset-md-2">
            <br />
            <AddForm key="byName" addListName={addListSet} term="name" />
            {
                isAdded ? <Alert type="success" messages={["List Added successfully"]} /> : null
            }
            {
                formErrors.length ? <Alert type="danger" messages={formErrors} /> : null
            }
            {myLists.length ?
                (<div className="LegoLists-list" >
                    {myLists.map(l => (
                        <Link to={`${l.id}/`}
                            state={{ lists: l.json_agg }}
                            key={l.id}
                        >
                            <h4 className="LegoLists-name">{l.name}</h4>

                            {(l.num_sets <= 1) ?
                                <h4><small>Num of Set: {l.num_sets}</small></h4>
                                :
                                <h4><small>Num of Sets: {l.num_sets}</small></h4>
                            }
                        </Link >
                    ))}
                </div>
                ) : (
                    <p>Sorry, no lists were found!</p>
                )}
        </div>
    )
};

export default LegoLists;

