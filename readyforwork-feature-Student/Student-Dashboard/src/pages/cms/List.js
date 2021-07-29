import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import api from "../../api";
import { StartPage } from "../StartPage";
import { successAlert, errorAlert } from "../../Stores/Alerts/actions";
import {
  usePagination,
  useSearch,
  tableListChecked,
  isValidURL,
} from "../../utils";
import {
  EditAction,
  DeleteAction,
  RecoverAction,
  Pagination,
} from "../../components";

const IMG_PUBLIC_URL =
  process.env.REACT_APP_IMG_PUBLIC_URL || `http://localhost:2000/public/`;

const List = (props) => {
  const {
    path: _p,
    params: { namespace = null },
  } = props.match;
  const path = _p.split("/")[1];
  const [list, setList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const [perPage, setPerPage] = useState(10);

  const { filteredData, loading } = useSearch({
    searchQuery,
    retrieve: list,
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

  const getListData = () => {
    let URI = "/cms";
    if (namespace && namespace.trim()) {
      URI = `/cms/namespace/${namespace.trim()}`;
    }

    api
      .get(URI)
      .then((res) => {
        let listData = res.data.cms
          // .filter(({ isDeleted }) => isDeleted === false)
          .map(({ image, ...l }) => {
            return {
              select: false,
              id: l._id,
              image: isValidURL(image) ? image : `${IMG_PUBLIC_URL}${image}`,
              ...l,
            };
          });
        return setList(listData);
      })
      .catch((err) => {
        console.log(err);
        return setList([]);
      });

    // return () => {
    //   _DATA.jump(1);
    //   setSearchQuery('');
    //   return setList([]);
    // }
  };

  useEffect(getListData, [namespace, path]);

  const handleCheckboxes = (e) => {
    let value = e.target.checked;
    setList(
      list.map((c) => {
        c.select = value;
        return c;
      })
    );
  };

  const handleCheckbox = (id, checked) => {
    setList(list.map((l) => (l.id === id ? { ...l, select: checked } : l)));
  };

  // eslint-disable-next-line
  const updateStatus = (id, status) => {
    if (!id || !status)
      return dispatch(errorAlert("id or status not found while update status"));
    if (!window.confirm(`Are you sure want to ${status} ?`)) return false;
    api
      .put(`/cms/status/${id}/${status}`)
      .then((res) => {
        dispatch(successAlert(res.data.message));
        return setList(
          list.map((values) =>
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
      .put(`/cms`, { _id: id, isDeleted: false })
      .then((res) => {
        dispatch(successAlert(res.data.message));
        return getListData();
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
      .delete(`/cms/${ids}`)
      .then((res) => {
        dispatch(successAlert(res.data.message));
        return getListData();
      })
      .catch((err) => {
        dispatch(errorAlert(err.response.data.message));
        console.log(err);
      });
  };

  const handleDeleteByIds = () => {
    let ids = [];
    list.forEach((l) => {
      if (l.select) {
        ids.push(l.id);
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
      <StartPage content="cms" contents="cms" contenttitle="cms" />
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
                      to={`/${path}/add`}
                      type="button"
                      className="btn btn-success btn-rounded waves-effect waves-light mb-2 me-2 text-white"
                    >
                      <i className="mdi mdi-plus me-1" /> New CMS
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
                            checked={tableListChecked(list)}
                            onChange={handleCheckboxes}
                          />
                        </div>
                      </th>
                      <th>CMS Key</th>
                      <th>namespace</th>
                      <th>scope</th>
                      <th>label</th>
                      <th>image</th>
                      <th>desctiption</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* key, namespace, scope, value, description, status, isDeleted */}
                    {loading ? (
                      <tr>
                        <td colSpan={8} align="center">
                          Loading...
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
                              _id: id,
                              key,
                              namespace,
                              scope,
                              label,
                              image,
                              description,
                              status,
                              createdDate,
                              isDeleted = false,
                              select,
                            },
                            i
                          ) => {
                            // eslint-disable-next-line
                            let createdAt = new Date(createdDate);
                            let statusBadge = {
                              Active: "bg-success",
                              Inactive: "bg-danger",
                            };
                            return (
                              <tr key={i}>
                                <td>
                                  <div className="form-check font-size-16">
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
                                  </div>
                                </td>
                                <td>{key}</td>
                                <td>{namespace}</td>
                                <td>{scope}</td>
                                <td className="text-wrap">{label}</td>
                                <td>
                                  <img src={image} width="150px" alt={label} />
                                </td>
                                <td className="text-wrap">
                                  {description.trim() !== "" &&
                                    description
                                      .split(" ")
                                      .slice(0, 12)
                                      .join(" ")
                                      .concat("...")}
                                </td>
                                <td>
                                  <span
                                    className={`badge ${statusBadge[status]} font-size-12`}
                                  >
                                    {status}
                                  </span>
                                </td>
                                {/* <td>{`${createdAt.getDate()} ${createdAt.toLocaleString('default', { month: 'short' })}, ${createdAt.getFullYear()}`}</td> */}
                                <td>
                                  <div className="d-flex gap-3">
                                    <EditAction
                                      to={`/${path}/edit/${id}`}
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
        {/* end row */}
      </div>
      {/* container-fluid */}
    </div>
  );
};

export default List;
