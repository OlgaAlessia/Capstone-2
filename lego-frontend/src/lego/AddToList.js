import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import Alert from "../helpers/Alert";
import UserContext from "../UserContext"
import LegoApi from "../LegoApi"
import "./Lego.css";

/** AddToList page.
 *
 * Renders the list where the set can be saved. 
 */

const AddToList = () => {

    let location = useLocation();
    const navigate = useNavigate();

    const { setNum } = location.state || "";

    const [myLists, setMyLists] = useState([]);
    const { currentUser } = useContext(UserContext);

    const [selectedList, setSelectedList] = useState({ value: "", id: "" });
    const [errors, setErrors] = useState([]);
    const [isAdded, setIsAdded] = useState(false);

    useEffect(() => {
        LegoApi.getListByUser(currentUser.id).then((result) => setMyLists(result.lists));
    }, [currentUser.id]);


    function handleChange(evt) {
        setSelectedList({ value: evt.target.value, id: evt.target.id });
    }


    async function handleSubmit(evt) {
        evt.preventDefault();

        await LegoApi.addSetToList(selectedList.id, setNum).then(res => {
            setIsAdded(true);
            setTimeout(() => { navigate(-1) }, 2000);
        }).catch(err => {
            setErrors(err);
            setTimeout(() => { setErrors([]); }, 2000);
        });
    };


    async function handleCancel(evt) {
        evt.preventDefault();
        navigate(-1)
    };

    return (
        <div className="AddToList">
            <h3>Select the list to save the set</h3>
            {
                isAdded ? <Alert type="success" messages={[`Lego Set Added successfully to List ${selectedList.value}`]} /> : null
            }
            {
                errors.length ? <Alert type="danger" messages={errors} /> : null
            }
            <div className="formList">
                <div className="row">
                    <div className="col-2 col-md-4"></div>
                    <form className="col-auto">
                        {myLists.map(l => (
                            <div className="form-check" key={l.id}>
                                <input type="radio" name="selectedList" className="form-check-input"
                                    id={l.id}
                                    value={l.name}
                                    checked={selectedList.value === l.name}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor={l.id} key={l.id}> {l.name} </label>
                            </div>
                        ))}
                        <br/>
                    </form>
                </div>
                <div className="formList-btn">
                    <button className="btn btn-dark" onClick={handleSubmit}>
                        Add to List
                    </button>
                    <button className="btn remove-button" onClick={handleCancel}>
                        Cancel
                    </button>
                </div>


            </div>

        </div>
    );
};

export default AddToList;