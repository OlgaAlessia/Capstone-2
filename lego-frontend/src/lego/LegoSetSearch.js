import React, { useState, useEffect } from "react";
import LegoApi from "../LegoApi"
import LegoSets from "./LegoSets";
import SearchForm from "../common/SearchForm";


/** LegoSetSearch page.
 *
 * On mount, loads the legoSet from LegoAPI.
 * Re-loads filtered legoSet on submit from the search forms.
 *
 * This is routed to at /legosetsearch
 *
 * Routes -> LegoSetSearch
 */

import "./Lego.css";

function LegoSetSearch() {

    const [legoSets, setLegoSets] = useState([]);


    useEffect(function loadLegoSetsInfo() {
        //console.debug("LegoSetSearch useEffect loadLegoSetsInfo");
        searchByName();
    }, []);


    /** Handles searchByName */
    async function searchByName(nameLike) {
        let legoSets = await LegoApi.getSearchLegoSet(nameLike);
        setLegoSets(legoSets);
    }

    /** Handles searchBySet_num */
    async function searchByNum(num) {
        let legoSets = await LegoApi.getLegoSet(num);
        if (legoSets.detail === "Not found.")
            setLegoSets([]);
        else
            setLegoSets([legoSets]);
    }

    if (!legoSets) return (<h2 className="loading"> Loading ... </h2>);

    return (
        <div className="LegoSetSearch">
            <h5 className="searchH5">Search a Lego Set</h5>
            <SearchForm key="byName" searchValue={searchByName} term="name ex. Central Perk" />
            <br />
            <SearchForm key="byNum" searchValue={searchByNum} term="lego set number ex. 21319-1" />
            <br />
            <h3>Lego Set in the DB</h3>
            <br />
            <LegoSets legoSets={legoSets} />
            
        </div>
    );
};

export default LegoSetSearch;
