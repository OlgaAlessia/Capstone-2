import React, { useState, useEffect, useContext } from "react";
import UserContext from "../UserContext"
import AddForm from "../helpers/AddForm";
import Alert from "../helpers/Alert";
import LegoApi from "../LegoApi"
import { Link } from "react-router-dom";
import "./Lego.css";

/** LegoLists page.
 *
 * On mount, loads from LegoAPI the list that the currentUser has .
 *
 * Routed at /legolists
 *
 * Routes -> LegoLists
 */
function LegoLists() {
    const [myLists, setMyLists] = useState([]);
    const { currentUser } = useContext(UserContext);
    const [errors, setErrors] = useState([]);
    const [isAdded, setIsAdded] = useState(false);

    useEffect(() => {
        LegoApi.getListByUser(currentUser.id).then((result) => setMyLists(result.lists));
    }, [currentUser.id]);


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
            setErrors(err);
            setTimeout(() => { setErrors([]); }, 2000);
        })
    }

    if (!myLists) return (<h2 className="loading"> Loading ... </h2>);

    return (
        <div className="LegoLists ">
            <br />
            <AddForm key="byName" addListName={addListSet} term="name" />
            {
                isAdded ? <Alert type="success" messages={["List Added successfully"]} /> : null
            }
            {
                errors.length ? <Alert type="danger" messages={errors} /> : null
            }
            {myLists.length ?
                (<div className="LegoLists-list" >
                    {myLists.map(l => (
                        <Link to={`${l.id}/`}
                            state={{ lists: l.json_agg, id: l.id, name: l.name }}
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
                    <h2 className="notFound">Sorry, no lists were found!</h2>
                )}
        </div>
    )
};

export default LegoLists;

