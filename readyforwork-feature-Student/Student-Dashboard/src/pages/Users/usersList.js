import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import api from "../../api";
import { usePagination, useSearch, tableListChecked } from "../../utils";
import {
  EditAction,
  DeleteAction,
  RecoverAction,
  Pagination,
} from "../../components";
import { successAlert, errorAlert } from "../../Stores/Alerts/actions";
import { StartPage } from "../StartPage";

const UsersList = (props) => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const [perPage, setPerPage] = useState(10);

  const { filteredData, loading } = useSearch({
    searchQuery,
    retrieve: users,
  });

  const _DATA = usePagination(filteredData, perPage);

  const handleChange = (e, p) => {
    _DATA.jump(p);
  };

  const handlePerPageChange = (e) => {
    e.preventDefault();
    setPerPage(e.target.value);
    _DATA.jump(1);
  };

  const getUsers = () => {
    api
      .get("/users")
      .then((res) => {
        let userData = res.data
          // .filter((u) => u.isDeleted === false)
          .map(({ firstName = "", lastName = "", ...u }) => {
            return {
              select: false,
              id: u._id,
              fullName: `${firstName} ${lastName}`,
              ...u,
            };
          });
        return setUsers(userData);
      })
      .catch((err) => {
        console.log(err);
        return setUsers([]);
      });
  };

  useEffect(getUsers, []);

  const handleCheckboxes = (e) => {
    let value = e.target.checked;
    setUsers(
      users.map((u) => {
        if (u.role !== "admin") {
          u.select = value;
        }
        return u;
      })
    );
  };

  const handleCheckbox = (id, checked) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, select: checked } : u)));
  };

  // eslint-disable-next-line
  const updateUserStatus = (id, status) => {
    if (!id || !status)
      return dispatch(
        errorAlert("id or status not found while updateUserStatus")
      );
    if (!window.confirm(`Are you sure want to ${status} ?`)) return false;
    api
      .put(`/users/status/${id}/${status}`)
      .then((res) => {
        dispatch(successAlert(res.data.message));
        return setUsers(
          users.map((values) =>
            id === values._id ? { ...values, status } : values
          )
        );
      })
      .catch((err) => {
        console.log(err);
        dispatch(errorAlert(err.response.data.message));
      });
  };

  const recoverById = (id) => {
    if (!window.confirm("Are you sure want recover ?")) {
      return false;
    }
    api
      .put(`/users`, {_id:id, isDeleted: false})
      .then((res) => {
        dispatch(successAlert(res.data.message));
        return getUsers();
      })
      .catch((err) => {
        dispatch(errorAlert(err.response.data.message));
        console.log(err);
      });
  };

  const deleteByIds = (ids) => {
    if (!window.confirm("Are you sure want delete ?")) {
      return false;
    }
    api
      .delete(`/users/${ids}`)
      .then((res) => {
        dispatch(successAlert(res.data.message));
        return getUsers();
      })
      .catch((err) => {
        dispatch(errorAlert(err.response.data.message));
        console.log(err);
      });
  };

  const handleDeleteByIds = () => {
    let ids = [];
    users.forEach((u) => {
      if (u.select) {
        ids.push(u.id);
      }
    });
    deleteByIds(ids);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="container-fluid">
      {/* start page title */}
      <StartPage contenttitle="Users" content="Users" contents="Users" />
      {/* end page title */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="row mb-2">
                <div className="col-sm-3">
                  <div className="search-box me-2 mb-2 d-inline-block">
                    <div className="position-relative">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearch}
                      />
                      <i className="bx bx-search-alt search-icon" />
                    </div>
                  </div>
                </div>
                <div className="col-sm-2">
                  <div className="search-box me-2 mb-2 d-inline-block">
                    <div className="position-relative">
                      <select
                        name="perPage"
                        className="form-select btn-rounded"
                        value={perPage}
                        onChange={handlePerPageChange}
                      >
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="text-sm-end">
                    <button
                      type="button"
                      className="btn btn-danger btn-rounded waves-effect waves-light mb-2 me-2"
                      onClick={handleDeleteByIds}
                    >
                      <i className="mdi mdi-delete me-1" /> Delete{" "}
                    </button>
                    <Link
                      to="/users/add"
                      type="button"
                      className="btn btn-success btn-rounded waves-effect waves-light mb-2 me-2 text-white"
                    >
                      <i className="mdi mdi-plus me-1" /> New User
                    </Link>
                  </div>
                </div>
                {/* end col*/}
              </div>
              <div className="table-responsive">
                <table className="table align-middle table-nowrap">
                  <thead>
                    <tr>
                      <th>
                        <div className="form-check font-size-16">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={tableListChecked(
                              users?.filter(({ role }) => role !== "admin")
                            )}
                            onChange={handleCheckboxes}
                          />
                        </div>
                      </th>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Verified</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={8} align="center">
                          Loading ...
                        </td>
                      </tr>
                    ) : _DATA.currentData() &&
                      _DATA.currentData().length <= 0 ? (
                      <tr>
                        <td colSpan={8} align="center">
                          No Data Found
                        </td>
                      </tr>
                    ) : (
                      _DATA
                        .currentData()
                        .map(
                          (
                            {
                              id,
                              fullName,
                              email,
                              status,
                              isVerified,
                              role,
                              select,
                              isDeleted,
                            },
                            i
                          ) => {
                            let statusBadge = {
                              Active: "bg-success",
                              Pending: "bg-warning",
                              Inactive: "bg-danger",
                            };
                            return (
                              <tr key={i}>
                                <td>
                                  <div className="form-check font-size-16">
                                    {role !== "admin" ? (
                                      <>
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          id={`customerListCheck${i}`}
                                          checked={select}
                                          onChange={(e) =>
                                            handleCheckbox(id, e.target.checked)
                                          }
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor={`customerListCheck${i}`}
                                        />
                                      </>
                                    ) : null}
                                  </div>
                                </td>

                                <td>{fullName}</td>
                                <td>{email}</td>
                                <td>{role}</td>
                                <td>
                                  <span
                                    className={`badge ${statusBadge[status]} font-size-12`}
                                  >
                                    {status}
                                  </span>
                                </td>
                                <td>{isVerified ? "Yes" : "No"}</td>
                                <td>
                                  <div className="d-flex gap-3">
                                    {role !== "admin" ? (
                                      <>
                                        <EditAction
                                          to={`/users/edit/${id}`}
                                          className="text-success"
                                        />
                                        {!isDeleted ? (
                                          <DeleteAction
                                            href="/users"
                                            className="text-danger"
                                            onClick={(e) =>
                                              e.preventDefault() ||
                                              !!deleteByIds(id)
                                            }
                                          />
                                        ) : (
                                          <RecoverAction
                                            href="/users"
                                            className="text-success"
                                            onClick={(e) =>
                                              e.preventDefault() ||
                                              !!recoverById(id)
                                            }
                                          />
                                        )}
                                      </>
                                    ) : null}
                                    {/* <a href="/users" className="text-danger" onClick={(e) => (e.preventDefault() || !!updateUserStatus(id, 'Inactive'))}><i className="bx bx-block font-size-18"></i></a> */}
                                  </div>
                                </td>
                              </tr>
                            );
                          }
                        )
                    )}
                  </tbody>
                </table>
              </div>
              <ul className="pagination pagination-rounded justify-content-between mb-2">
                <div className="d-flex align-items-center">
                  {_DATA.entries()}
                </div>
                <Pagination
                  count={_DATA.maxPage}
                  page={_DATA.currentPage}
                  onChange={handleChange}
                />
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* end row */}
    </div>
  );
};

export default UsersList;
