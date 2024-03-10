import React, { useState, useEffect, useContext } from "react";
import UserContext from "../UserContext"
import LegoApi from "../LegoApi"
import { Link } from "react-router-dom";
import "./Lego.css";

/** LegoSet page.
 *
 * Renders information about the LegoSet.
 * Gets the list of LegoSets that the users has so if the particolar set is shown, the button Add to list will not show. 
 */

const LegoSet = ({ set }) => {
    const { currentUser } = useContext(UserContext);
    const [isOnMyList, setIsOnMyList] = useState(false);
    const [myListSetsNums, setMyListSetsNums] = useState([]);


    useEffect(() => {
        LegoApi.getAllLegoSetsByUser(currentUser.id).then((result) => setMyListSetsNums(result));
    }, [currentUser]);

    useEffect(() => {
        setIsOnMyList(myListSetsNums.includes(set.set_num));
    }, [myListSetsNums, set]);

    return (
        <div className="LegoSet" key={set.set_num}>

            <img alt={set.set_num} src={set.set_img_url} />

            <Link to={`/legosets/${set.set_num}`}>{set.name}</Link>

            {!isOnMyList && (

                <Link to='/list' state={{ setNum: set.set_num}} className="btn addTolist-button"> Add to List </Link>
            )}
        </div>
    );
};

export default LegoSet;
