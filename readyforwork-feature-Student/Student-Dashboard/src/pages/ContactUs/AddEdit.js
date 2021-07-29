import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';

import api from '../../api';
import { successAlert, errorAlert } from '../../Stores/Alerts/actions';
import { Validator, validationConfig } from '../../utils';
import { StartPage } from '../StartPage';

const initialState = { key: "", value: "", status: "", userId: ""}
const AddEdit = (props) => {
  const { history, match } = props;
  const { id } = match.params;
  const isAddMode = !id;
  const validator = useRef(new Validator(validationConfig));
  const [update, forceUpdate] = useState(1);
  const [data, setData] = useState(initialState);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validator.current.allValid()) {
      validator.current.showMessages();
      return forceUpdate(update + 1);
    }
    let payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      comment: data.comment,
      status: data.status
    }
    return isAddMode ? createData(payload) : updateData(id, payload);
  }

  const handleChange = (e) => {
    const { id: _id, value } = e.target;
    const attrs = {
      'data-status': 'status',
    }
    let id = attrs[_id] ? attrs[_id] : _id;
    setData(prevState => ({
      ...prevState,
      [id]: value
    }))
  }

  const createData = (data) => {
    return api.post('/contactus/add', data)
      .then((res) => {
        dispatch(successAlert(res.data.message));
        return history.push('.');
      })
      .catch((err) => {
        dispatch(errorAlert(err.response.data.message));
        console.log(err);
      });
  }

  const updateData = (id, data) => {
    return api.put('/contactus', {_id: id, ...data})
    .then((res) => {
      dispatch(successAlert(res.data.message));
      return history.push('..');
    })
    .catch((err) => {
      dispatch(errorAlert(err.response.data.message));
      console.log(err);
    });
  }

  useEffect(() => {
    if (!isAddMode) {
      // get data and set form fields
      api.get(`/contactus/view/${id}`).then((res) => {
        // dispatch(successAlert(res.data.message))
        let { ...contact } = res.data.contact;
        return setData({ ...contact });
      }).catch((err) => {
        dispatch(errorAlert(err.response.data.message));
        console.log(err)
      });
    }
    // eslint-disable-next-line
  }, []);

  return <div className="container-fluid">
          {/* start page title */}
          <StartPage
            contenttitle={`${!isAddMode ? 'Update' : 'Add'} Inquiry`}
            content="Inquiries"
            contents={!isAddMode ? 'Update' : 'Add'}
          />
          {/* end page title */}
          <div className="row">
            <div className="col-md-8">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="firstName" className="form-label">First Name</label>
                      <input type="text" className="form-control" id="firstName" value={data.firstName} onChange={handleChange} onBlur={() => { validator.current.showMessageFor('firstName'); forceUpdate(update + 1) }} />
                      {validator.current.message('firstName', data.firstName, 'required|min:4')}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="lastName" className="form-label">Last Name</label>
                      <input type="text" className="form-control" id="lastName" value={data.lastName} onChange={handleChange} onBlur={() => { validator.current.showMessageFor('lastName'); forceUpdate(update + 1) }} />
                      {validator.current.message('lastName', data.lastName, 'required|min:4')}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input type="email" className="form-control" id="email" value={data.email} onChange={handleChange} onBlur={() => { validator.current.showMessageFor('email'); forceUpdate(update + 1) }} />
                      {validator.current.message('email', data.email, 'required|min:4')}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label">Phone</label>
                      <input type="text" className="form-control" id="phone" value={data.phone} onChange={handleChange} onBlur={() => { validator.current.showMessageFor('phone'); forceUpdate(update + 1) }} />
                      {validator.current.message('phone', data.phone, 'required|min:4')}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="comment" className="form-label">Comment</label>
                      <input type="text" className="form-control" id="comment" value={data.comment} onChange={handleChange} onBlur={() => { validator.current.showMessageFor('comment'); forceUpdate(update + 1) }} />
                      {validator.current.message('comment', data.comment, 'required|min:4')}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="data-status" className="form-label">Status</label>
                      <select value={data.status} id="data-status" className="form-select" onChange={handleChange} onBlur={() => { validator.current.showMessageFor('status'); forceUpdate(update + 1) }}>
                        <option value="">Choose</option>
                        <option value={'Active'}>Active</option>
                        <option value={'Inactive'}>Inactive</option>
                      </select>
                      {validator.current.message('status', data.status, 'required|in:Active,Inactive')}
                    </div>
                    <div>
                      <button type="submit" className="btn btn-primary w-md">Submit</button>
                      <Link to={`/${match.path.split('/')[1]}`} className="btn btn-primary w-md m-2"> Cancel</Link>
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

export default AddEdit;