import React from "react";
import LegoSet from "./LegoSet"

import "./Lego.css";

/** LegoSets page.
 *
 * Renders all the LegoSets.
 *
 * Routed at /legosets
 *
 * Routes -> LegoSets
 */

const LegoSets = ({ legoSets }) => {

    if (!legoSets) return (<h2 className="notFound">Sorry, no results were found!</h2>);

    return (
        <>
            {legoSets.length ?
                (<div className="LegoSets" >
                    {
                        legoSets.map((set) =>
                            <LegoSet
                                key={set.set_num}
                                set={set}
                            />
                        )}
                </div>
                ) : (
                    <h2 className="notFound">Sorry, no results were found!</h2>
                )}
        </>
    );
};

export default LegoSets;
