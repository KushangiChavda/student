import React, { useState, useEffect } from 'react';
import { LayoutWrapper, Footer } from '../components';
import api from '../api';
import { useDispatch } from "react-redux";
import { successAlert, errorAlert } from '../Stores/Alerts/actions';
import { StartPage } from './StartPage';

const RolesList = (props) => {
  const [roles, setRoles] = useState();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    api.get('/roles').then((res) => {
      setError(null)
      return setRoles(res.data.roles);
    }).catch((err) => {
      console.log(err)
      return setError("No data found");
    });
  }, []);

  const updateRoleStatus = (id, status) => {
    if (!id || !status) return dispatch(errorAlert("id or status is not found while update role Status"));
    if(!window.confirm(`Are you sure want to ${status} ?`)) return false;
    api.put(`/users/status/${id}/${status}`).then((res) => {
      dispatch(successAlert(res.data.message));
      return setRoles(roles.map((values) => id === values._id ? { ...values, status } : values));
    }).catch((err) => {
      console.log(err);
      dispatch(errorAlert(err.response.data.message));
    });
  }

  return <LayoutWrapper {...props}>
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          {/* start page title */}
          <StartPage
            contenttitle="Roles"
            content="roles"
            contents="roles"
          />
          {/* end page title */}
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="row mb-2">
                    <div className="col-sm-4">
                      <div className="search-box me-2 mb-2 d-inline-block">
                        <div className="position-relative">
                          <input type="text" className="form-control" placeholder="Search..." />
                          <i className="bx bx-search-alt search-icon" />
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-8">
                      <div className="text-sm-end">
                        {/* <button type="button" className="btn btn-success btn-rounded waves-effect waves-light mb-2 me-2"><i className="mdi mdi-plus me-1" /> New Customers</button> */}
                      </div>
                    </div>{/* end col*/}
                  </div>
                  <div className="table-responsive">
                    <table className="table align-middle table-nowrap">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Slug</th>
                          <th>Status</th>
                          <th>Created Date</th>
                          {/* <th>Action</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {error ? <tr><td colSpan={8} align="center">{error}</td></tr> : (!roles || !roles.length) ? <tr><td colSpan={8} align="center">Loading ...</td></tr> : roles.map(({ _id, name, slug, status, createdDate }, i) => {
                          let createdAt = new Date(createdDate);
                          let statusButtons = {
                            Active: <li className="list-inline-item px-2"><button type="button" className={`btn btn-sm btn-success waves-effect waves-light`} title={`Active`} onClick={() => updateRoleStatus(_id, 'Active')}><i className={`bx bx-block font-size-16 align-middle`} /> Active </button></li>,
                            Inactive: <li className="list-inline-item px-2"><button type="button" className={`btn btn-sm btn-danger waves-effect waves-light`} title={`Inactive`} onClick={() => updateRoleStatus(_id, 'Inactive')}><i className={`bx bx-block font-size-16 align-middle`} /> Inactive </button></li>,
                            Pending: <li className="list-inline-item px-2"><button type="button" className={`btn btn-sm btn-warning waves-effect waves-light`} title={`Pending`} onClick={() => updateRoleStatus(_id, 'Pending')}><i className={`font-size-16 far fa-clock`} /> Pending </button></li>
                          }
                          delete statusButtons[status];
                          let statusBadge = {
                            Active: 'bg-success',
                            Pending: 'bg-warning',
                            Inactive: 'bg-danger'
                          }
                          return <tr key={i}>
                            <td>
                              <div className="form-check font-size-16">
                                <input className="form-check-input" type="checkbox" id="customerlistcheck01" />
                                <label className="form-check-label" htmlFor="customerlistcheck01" />
                              </div>
                            </td>
                            <td>{_id}</td>
                            <td>{name}</td>
                            <td>{slug}</td>
                            <td><span className={`badge ${statusBadge[status]} font-size-12`}>{status}</span></td>
                            <td>{`${createdAt.getDate()} ${createdAt.toLocaleString('default', { month: 'short' })}, ${createdAt.getFullYear()}`}</td>
                            {/* <td>
                              <ul className="list-inline font-size-20 contact-links mb-0">
                                {statusButtons.Inactive && statusButtons.Inactive}
                                {statusButtons.Active && statusButtons.Active}
                                {statusButtons.Pending && statusButtons.Pending}
                              </ul>
                            </td> */}
                          </tr>
                        })}
                      </tbody>
                    </table>
                  </div>
                  <ul className="pagination pagination-rounded justify-content-end mb-2">
                    <li className="page-item disabled">
                      <a className="page-link" href="#0" aria-label="Previous">
                        <i className="mdi mdi-chevron-left" />
                      </a>
                    </li>
                    <li className="page-item active"><a className="page-link" href="#0">1</a></li>
                    {/* <li className="page-item"><a className="page-link" href="#0">2</a></li>
                    <li className="page-item"><a className="page-link" href="#0">3</a></li>
                    <li className="page-item"><a className="page-link" href="#0">4</a></li>
                    <li className="page-item"><a className="page-link" href="#0">5</a></li> */}
                    <li className="page-item">
                      <a className="page-link" href="#0" aria-label="Next">
                        <i className="mdi mdi-chevron-right" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* end row */}
        </div> {/* container-fluid */}
      </div>
      {/* End Page-content */}
      <Footer />
    </div>

  </LayoutWrapper>
}

export default RolesList;