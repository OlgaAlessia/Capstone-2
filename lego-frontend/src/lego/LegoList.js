import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RebrickableApi from "../RebrickableApi"
import LegoSet from "./LegoSet"
import "./Lego.css";

function LegoList() {
    const { list_id } = useParams();

    const [myLegoSets, setMyLegoSets] = useState([]);

    useEffect(() => {
        RebrickableApi.fetchMyListSets(list_id).then((results) => setMyLegoSets(results.results));
    }, [list_id]);

    if (!myLegoSets) return (<div> Loading ... </div>);

    return (
        <div className="LegoList">
            {myLegoSets.map((set) => 
                <LegoSet
                    key={set.set_url}
                    set={set.set}
                />)}
        </div>
    );
};

export default LegoList;
