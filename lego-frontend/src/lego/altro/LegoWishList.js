import React, { useState, useEffect } from "react";
import RebrickableApi from "../../RebrickableApi";
import LegoSet from "../LegoSet"

function LegoList({ legoList, list_id }) {
    const [wishListSets, setWishListSets] = useState([]);
    const [wishListSetNums, setWishListSetNums] = useState([]);

    useEffect(() => {
        RebrickableApi.fetchWishlist(list_id).then( (result) => setWishListSets(result) );
    }, []);

    useEffect(() => {
        setWishListSetNums(wishListSets?.map(({ set }) => set.set_num));
      }, [wishListSets]);

    if (!wishListSets) return (<div> Loading ... </div>);

    return (
        <div className="lego-list">
        {legoList.map((set) => (
          <LegoSet
            key={set.set_url}
            set={set}
            wishListSetNums={wishListSetNums}
          />
        ))}
      </div>
    );
};

export default LegoList;
