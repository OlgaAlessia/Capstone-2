import React from "react";
import { useLocation } from "react-router-dom";
import LegoSet from "./LegoSet"
import "./Lego.css";

const LegoList = () => {
    let location = useLocation();
    const { lists } = location.state;

    if (!lists) return (<div> You don't have any Sets in This List ... </div>);

    return (
        <>
        <a href="/legolists" className="btn btn-danger mb-3">Go Back</a>  
        <div className="LegoList" >
            {lists.map((set) => 
                <LegoSet
                    key={set.set_num}
                    set={set}
                />)
            }
        </div>
        </>
    );
  };

export default LegoList;