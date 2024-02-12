import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LegoApi from "../LegoApi"
import RebrickableApi from "../RebrickableApi";
import LegoAlterates from "./LegoAlterates"

import "./Lego.css";

function LegoSetDetails() {
    const { set_num } = useParams();

    const [legoSet, setLegoSet] = useState([]);
    const [legoAlterates, setlegoAlterates] = useState([]);
    const [title, setTitle] = useState("");

    useEffect(() => {
        async function fetchData() {
            //console.debug("LegoSets useEffect loadLegoSetsInfo");

            let result = await LegoApi.getLegoSet(set_num);
            if (result.detail === "Not found.")
                setLegoSet([]);
            else {
                setLegoSet(result);
                setTitle(`LEGO SET ${result.set_num} - ${result.name}`)
            }

            RebrickableApi.getAlternates(result.set_num).then((result) => setlegoAlterates(result.results));

        }
        fetchData();
    }, [set_num]);

    return (
        <section className="container">
            <div id="page_header" className="hidden-xs page-header page-header-xxs page-header-bg-yellow">
                <div className="row">
                    <h2>{title}</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-md-9 col-sm-9">
                    <img className="img-responsive" title={title}
                        alt={title}
                        src={legoSet.set_img_url}
                        width="500" draggable="false" />
                </div>
                <div className="col-md-3 col-sm-3 sidebar-wrapper hidden-xs">
                    <table className="table table-wrap">
                        <tbody>
                            <tr>
                                <td className="min-width-80">Name</td>
                                <td>{legoSet.name}</td>
                            </tr>
                            <tr>
                                <td>Released</td>
                                <td>{legoSet.year}</td>
                            </tr>
                            <tr>
                                <td>Inventory</td>
                                <td>{legoSet.num_parts}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row LegoAlterates-row">
                <h3 className="LegoAlterates-title">Alternate Builds (MOCs)</h3>
                {legoAlterates.map(moc => (
                    <LegoAlterates
                        alterate={moc}
                    />))}
            </div>
        </section>
    )
}

export default LegoSetDetails;