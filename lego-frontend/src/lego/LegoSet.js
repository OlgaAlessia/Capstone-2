import React from "react";
import "./Lego.css";

const LegoSet = ({ set }) => {


    return (
        <div className="LegoSet">
            <img alt={set.set_num} src={set.set_img_url} />
            <a href={`/legosets/${set.set_num}`}>{set.name}</a>
        </div>
    );
};

export default LegoSet;
