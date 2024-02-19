import React, { useState, useEffect } from "react";
import LegoApi from "../LegoApi"
import LegoSet from "./LegoSet";
import SearchForm from "../helpers/SearchForm";

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

    if (!legoSets) return (<div> Loading ... </div>);

    return (
        <div className="LegoSetSearch">

            <SearchForm key="byName" searchValue={searchByName} term="name" />
            <br />
            <SearchForm key="byNum" searchValue={searchByNum} term="lego set number" />

            {legoSets.length
                ? (
                    <div className="LegoSetSearch-sets" >
                        {legoSets.map((set) =>
                            <LegoSet
                                key={set.set_num}
                                set={set}
                            />)}
                    </div>
                ) : (
                    <p>Sorry, no results were found!</p>
                )}
        </div>
    );
};

export default LegoSetSearch;
