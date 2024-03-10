import React, { useState, useEffect } from "react";
import LegoApi from "../LegoApi"
import LegoSets from "./LegoSets";
import SearchForm from "../helpers/SearchForm";


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

            <SearchForm key="byName" searchValue={searchByName} term="name" />
            <br />
            <SearchForm key="byNum" searchValue={searchByNum} term="lego set number" />
            <br />
            <LegoSets legoSets={legoSets} />
           
        </div>
    );
};

export default LegoSetSearch;
