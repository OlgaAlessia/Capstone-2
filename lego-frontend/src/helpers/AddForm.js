import React, { useState } from "react";
import Alert from "../helpers/Alert";

/** Add tool.
 *
 * This component is used in LegoLists
 **/

function AddForm({ addListName }) {
  const [listName, setListName] = useState("");


  function handleSubmit(evt) {
    evt.preventDefault();
    addListName(listName || undefined);
    setListName("");
  }

  /** Update form fields */
  function handleChange(evt) {
    setListName(evt.target.value);
  }

  return (
    <div className="AddForm mb-2">
      <form onSubmit={handleSubmit}>
        <div className="AddForm-row row">
          <div className="col-4">
            <input
              className="form-control form-control-md"
              name="listName"
              placeholder="Add the name of a new List"
              value={listName}
              onChange={handleChange}
            />
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-md btn-success">
              Submit
            </button>
          </div>
        </div>
      </form>
      <br/>
    </div>
  );
}

export default AddForm;
