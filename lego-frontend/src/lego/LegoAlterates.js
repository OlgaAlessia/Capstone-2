import React from "react";
import "./Lego.css";

/** LegoAlterates .
 *
 * Show the information of the the alternative MOC Lego Sets 
 * that is pass.
 *
 */

const LegoAlterates = ({ alterate }) => {

    return (
        <div className="LegoAlterates-col col-xs-6 col-sm-4 col-md-3 col-lg-2" key={alterate.set_num}>
            <div className="LegoAlterates-set" data-set_id={alterate.set_num}>
                <div className="set-image">
                    <a href={alterate.moc_url}>
                        <div className="text-center">
                            <img className="LegoAlterates-img" src={alterate.moc_img_url} alt={alterate.name} />
                        </div>
                    </a>
                </div>

                <div className="row set-details ">
                    <div className="col-md">
                        <h6 className="mb-0 LegoAlterates-set-name">
                            <a href={alterate.moc_url}>{alterate.name}</a>
                        </h6>
                        <div className="LegoAlterates-by">
                            By <a href={alterate.designer_url}>{alterate.designer_name}</a>
                        </div>
                        <br />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LegoAlterates;