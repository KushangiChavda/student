import React, { useState, useRef } from 'react';
import { useDispatch } from "react-redux";

import api from '../../api';
import { Validator, validationConfig } from '../../utils';
import { InputPassword } from '../../components';
import { successAlert, errorAlert } from '../../Stores/Alerts/actions';
import { StartPage } from '../StartPage';
import { Link } from 'react-router-dom';

const AddUser = (props) => {
  const validator = useRef(new Validator(validationConfig));
  const [update, forceUpdate] = useState(1);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    status: "",
    role: ""
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { id: _id, value } = e.target;
    const attrs = {
      'user-status': 'status',
      'user-password': 'password',
      'user-email': 'email'
    }
    let id = attrs[_id] ? attrs[_id] : _id;
    setUser(prevState => ({
      ...prevState,
      [id]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validator.current.allValid()) {
      validator.current.showMessages();
      return forceUpdate(update + 1);
    }
    let payload = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      status: user.status,
      role: user.role
    }
    if(user.password !== '') {
      payload.password = user.password;
    }
    api.post('/users/add', payload)
      .then((res) => {
        dispatch(successAlert(res.data.message));
        return props.history.push('/users');
      })
      .catch((err) => {
        console.log(err);
        dispatch(errorAlert(err.response.data.message));
      });
  }

  return <div className="container-fluid">
          {/* start page title */}
          <StartPage 
            contenttitle="Add User"
            content="Users"
            contents="Add"
          />
          {/* end page title */}
          <div className="row">
            <div className="col-md-8">

              <div className="card">
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    {/* firstName & lastName */}
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="firstName" className="form-label">First name</label>
                          <input type="text" className="form-control" id="firstName" value={user.firstName} onChange={handleChange} onBlur={() => { validator.current.showMessageFor('firstName'); forceUpdate(update + 1) }} />
                          {validator.current.message('firstName', user.firstName, 'required|min:4')}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="lastName" className="form-label">Last Name</label>
                          <input type="text" className="form-control" id="lastName" value={user.lastName} onChange={handleChange} onBlur={() => { validator.current.showMessageFor('lastName'); forceUpdate(update + 1) }} />
                          {validator.current.message('lastName', user.lastName, 'required|min:4')}
                        </div>
                      </div>
                    </div>
                    {/* Email */}
                    <div className="mb-3">
                      <label htmlFor="user-email" className="form-label">Email</label>
                      <input type="email" className="form-control" id="user-email" value={user.email} onChange={handleChange} onBlur={() => { validator.current.showMessageFor('email'); forceUpdate(update + 1) }} autoComplete="off" />
                      {validator.current.message('email', user.email, 'required|email')}
                    </div>
                    {/* Password */}
                    <div className="mb-3">
                      <InputPassword label="Password" type="password" className="form-control" id="user-password" value={user.password} onChange={handleChange} onBlur={() => { validator.current.showMessageFor('password'); forceUpdate(update + 1) }} autoComplete="off" />
                      {validator.current.message('password', user.password, 'required|min:4')}
                    </div>
                    {/* Role & status */}
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <label htmlFor="role" className="form-label">Role</label>
                          <input type="text" className="form-control" id="role" value={user.role} onChange={handleChange} onBlur={() => { validator.current.showMessageFor('role'); forceUpdate(update + 1) }} autoComplete="off" />
                          {validator.current.message('role', user.role, 'required|min:4')}
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <label htmlFor="user-status" className="form-label">Status</label>
                          <select value={user.status} id="user-status" className="form-select" onChange={handleChange} onBlur={() => { validator.current.showMessageFor('status'); forceUpdate(update + 1) }}>
                            <option value="">Choose</option>
                            <option value={'Active'}>Active</option>
                            <option value={'Inactive'}>Inactive</option>
                            <option value={'Pending'}>Pending</option>
                          </select>
                          {validator.current.message('status', user.status, 'required|in:Active,Pending,Inactive')}
                        </div>
                      </div>
                    </div>
                    <div>
                      <button type="submit" className="btn btn-primary w-md">Submit</button>
                      <Link to='/users' className="btn btn-primary w-md m-2"> Cancel</Link>
                    </div>
                  </form>
                </div>
                {/* end card body */}
              </div>

            </div>
          </div>
          {/* end row */}
        </div>
}

export default AddUser;