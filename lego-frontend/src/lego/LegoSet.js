import React, { useState, useEffect, useContext } from "react";
import Alert from "../helpers/Alert";
import UserContext from "../UserContext"
import LegoApi from "../LegoApi"
import "./Lego.css";


const LegoSet = ({ set }) => {
    const { currentUser } = useContext(UserContext);
    const [isOnMyList, setIsOnMyList] = useState(false);
    const [myListSetsNums, setMyListSetsNums] = useState([]);
    const [formErrors, setFormErrors] = useState([]);
    const [isAdded, setIsAdded] = useState(false);


    useEffect(() => {
        LegoApi.getAllLegoSetsByUser(currentUser.id).then((result) => setMyListSetsNums(result));
    }, [currentUser]);

    useEffect(() => {
        setIsOnMyList(myListSetsNums.includes(set.set_num));
    }, [myListSetsNums, set]);

    async function addToList() {

        await LegoApi.addSetToList(3, set.set_num).then(res => {
            setIsOnMyList(true);
            setIsAdded(true);

            setTimeout(() => { setIsAdded(false); }, 2000);
        }).catch(err => {
            setFormErrors(err);
            setTimeout(() => { setFormErrors([]); }, 2000);
        });
        //LegoApi.addSetToList(list_id, setNum).then(() => setIsOnMyList(true));
    };

    return (
        <div className="LegoSet" key={set.set_num}>
            {
                isAdded ? <Alert type="success" messages={["Lego Set Added successfully"]} /> : null
            }
            {
                formErrors.length ? <Alert type="danger" messages={formErrors} /> : null
            }
            <img alt={set.set_num} src={set.set_img_url} />
            <a href={`/legosets/${set.set_num}`}>{set.name}</a>
            {!isOnMyList && (
                <button className="addTolist-button" onClick={addToList}>
                    Add to List
                </button>
            )}
        </div>
    );
};

export default LegoSet;
