import React from "react";
import { Link } from "react-router-dom";

const TableOptions = ({
  options = [10, 25, 50, 100],
  hideNewButton = false,
  ...props
}) => {
  return (
    <>
      <div className="text-sm-start">
        {!hideNewButton && (
          <Link
            to={`${props.path}/add`}
            type="button"
            className="btn btn-success waves-effect waves-light mb-2 me-2 text-white"
          >
            <i className="mdi mdi-plus me-1" /> New {props.name}
          </Link>
        )}
      </div>
      <div className="row mb-2">
        <div className="col-sm-6">
          <div className="search-box me-2 mb-2 d-inline-block">
            <div className="position-relative d-flex align-items-center">
              <span>{"Show"}&nbsp;</span>
              <select
                name="perPage"
                className="form-select"
                value={props.perPage}
                onChange={props.handlePerPageChange}
              >
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <span>&nbsp;{"entries"}</span>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="search-box mb-2 d-inline-block float-end">
            <div className="position-relative">
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                value={props.searchQuery}
                onChange={props.handleSearch}
              />
              <i className="bx bx-search-alt search-icon" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableOptions;
