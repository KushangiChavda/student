import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import api from "../../api";
import {
  EditAction,
  DeleteAction,
  RecoverAction,
  Pagination,
} from "../../components";
import { usePagination, useSearch, tableListChecked } from "../../utils";
import { successAlert, errorAlert } from "../../Stores/Alerts/actions";
import { StartPage } from "../StartPage";

const IMG_PUBLIC_URL =
  process.env.REACT_APP_IMG_PUBLIC_URL || "http://localhost:2000/public/";

const List = (props) => {
  const { path } = props.match;
  const [list, setList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const [perPage, setPerPage] = useState(10);

  // const filteredData = list; const loading = filteredData ? false : true;
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
    api
      .get("/blogs")
      .then((res) => {
        let listData = res.data.blogs
          // .filter(({ isDeleted }) => isDeleted === false)
          .map((u) => {
            return { select: false, id: u._id, ...u };
          });
        return setList(listData);
      })
      .catch((err) => {
        console.log(err);
        return setList([]);
      });
  };

  useEffect(getListData, []);

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
      .put(`/blogs/status/${id}/${status}`)
      .then((res) => {
        if (res.status === 200) {
          dispatch(successAlert(res.data.message));
          return setList(
            list.map((values) =>
              id === values._id ? { ...values, status } : values
            )
          );
        }
        dispatch(errorAlert(res.data.message));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const recoverById = (id) => {
    if (!window.confirm("Are you sure want recover ?")) {
      return false;
    }
    api
      .put(`/blogs`, { _id: id, isDeleted: false })
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
      .delete(`/blogs/${ids}`)
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
      <StartPage content="blogs" contents="blogs" contenttitle="Blogs" />
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
                      to={`${path}/add`}
                      type="button"
                      className="btn btn-success btn-rounded waves-effect waves-light mb-2 me-2 text-white"
                    >
                      <i className="mdi mdi-plus me-1" /> New Blog
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

                      <th>Blog Title</th>
                      <th>Image</th>
                      <th>Description</th>
                      <th>Tag</th>
                      <th>Category</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
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
                              id,
                              title,
                              image,
                              description: desc,
                              tag,
                              category,
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
                              Pending: "bg-warning",
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

                                <td>{title}</td>
                                <td>
                                  <img
                                    src={`${IMG_PUBLIC_URL}${image}`}
                                    alt={title}
                                    width="150px"
                                  />
                                </td>
                                <td className="text-wrap">
                                  {desc.trim() !== "" &&
                                    desc
                                      .split(" ")
                                      .slice(0, 12)
                                      .join(" ")
                                      .concat("...")}
                                </td>
                                <td>{tag}</td>
                                <td>{category}</td>
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
                                      to={`${path}/edit/${id}`}
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
