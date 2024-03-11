import React, { useState } from "react";

/** Add tool.
 *
 * Appears on LegoLists so that a Lego List name can be down.
 *
 * This component doesn't *do* the addin, the parent does the actions.
 *
 */

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
              placeholder="Add the name to create a new List"
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
