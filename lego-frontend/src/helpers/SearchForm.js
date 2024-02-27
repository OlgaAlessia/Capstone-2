import React, { useState } from "react";

/** Search tool.
 *
 * Appears on LegoSetSearch so that a Lego Set can be filtered down.
 *
 * This component doesn't *do* the searching, the parent to do the searching.
 *
 */


function SearchForm({ searchValue, term }) {
  const [searchTerm, setSearchTerm] = useState("");

  /** Tell parent to filter */
  function handleSubmit(evt) {
    // take care of accidentally trying to search for just spaces
    evt.preventDefault();
    searchValue(searchTerm.trim() || undefined);
    setSearchTerm("");

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
            <button type="submit" className="btn btn-md">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
