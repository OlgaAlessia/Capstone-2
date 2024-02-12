import React, { useState } from "react";
//import "./SearchForm.css";

/** Search tool.
 *
 * This component is used in CompanyList and JobList
 **/

function SearchForm({ searchFor, term }) {
  const [searchTerm, setSearchTerm] = useState("");

  /** Tell parent to filter */
  function handleSubmit(evt) {
    // take care of accidentally trying to search for just spaces
    evt.preventDefault();
    searchFor(searchTerm.trim() || undefined);
    setSearchTerm(searchTerm.trim());
  }

  /** Update form fields */
  function handleChange(evt) {
    setSearchTerm(evt.target.value);
  }

  return (
    <div className="SearchForm mb-2">
      <form onSubmit={handleSubmit}>
        <div className="SearchForm-row row">
          <div className="col-4">
            <input
              className="form-control form-control-md"
              name="searchTerm"
              placeholder={`Search by ${term}`}
              value={searchTerm}
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
    </div>
  );
}

export default SearchForm;
