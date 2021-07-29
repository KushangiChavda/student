import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';

import api from '../../api';
import { successAlert, errorAlert } from '../../Stores/Alerts/actions';
import { Validator, validationConfig } from '../../utils';
import { StartPage } from '../StartPage';

const initialState = { name: "", image: "", oldImage: "", description: "", price: "", status: "", userId: "" }
const IMG_PUBLIC_URL = process.env.REACT_APP_IMG_PUBLIC_URL || `http://localhost:2000/public/`;

const AddEdit = (props) => {
  const { history, match } = props;
  const { id } = match.params;
  const isAddMode = !id;
  const validator = useRef(new Validator(validationConfig));
  const [update, forceUpdate] = useState(1);
  const [data, setData] = useState(initialState);
  const [image, setImage] = useState();
  const dispatch = useDispatch();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validator.current.allValid()) {
      validator.current.showMessages();
      return forceUpdate(update + 1);
    }
    let payload = {
      name: data.name,
      image: data.image,
      file: image,
      description: data.description,
      price: data.price,
      status: data.status
    }
    const formData = new FormData();
    for (var key in payload) {
      formData.append(key, payload[key]);
    }
    // formData.forEach(value => console.log('payload', value))
    return isAddMode ? createData(formData) : updateData(id, formData);
  }
  
  const handleChange = (e) => {
    const { id: _id, value, type } = e.target;
    const attrs = {
      'data-status': 'status',
    }
    let id = attrs[_id] ? attrs[_id] : _id;
    if (type === 'file') {
      setImage(e.target.files[0]);
    }
    setData(prevState => ({
      ...prevState,
      [id]: value
    }))
    return true;
  }
  
  const createData = (data) => {
    return api.post('/services/add', data)
      .then((res) => {
        dispatch(successAlert(res.data.message));
        return history.push('.');
      })
      .catch((err) => {
        console.log(err);
        dispatch(errorAlert(err.response.data.message));
      });
  }
  
  const updateData = (id, data) => {
    data.append('_id', id);
    return api.put('/services', data)
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
      api.get(`/services/view/${id}`).then((res) => {
        if (res.status === 200) {
          // dispatch(successAlert(res.data.message))
          let { name, image, description, price, status, userId } = res.data.service;
          return setData({ name, image: "", oldImage: `${IMG_PUBLIC_URL}${image}`, description, price, status, userId });
        }
        dispatch(errorAlert(res.data.message));
      }).catch((err) => {
        console.log(err)
      });
    }
    // eslint-disable-next-line
  }, []);

  return <div className="container-fluid">
          {/* start page title */}
          <StartPage
            contenttitle={`${!isAddMode ? 'Update' : 'Add'} Service`}
            content="Services"
            contents={!isAddMode ? 'Update' : 'Add'}
          />
          {/* end page title */}
          <div className="row">
            <div className="col-md-8">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Service name</label>
                      <input type="text" className="form-control" id="name" value={data.name} onChange={handleChange} onBlur={() => { validator.current.showMessageFor('name'); forceUpdate(update + 1) }} />
                      {validator.current.message('name', data.name, 'required|min:4')}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="image" className="form-label">Image</label>
                      <input type="file" className="form-control" name="image" id="image" value={data.image} onChange={handleChange} onBlur={() => { validator.current.showMessageFor('image'); forceUpdate(update + 1) }} />
                      {isAddMode && validator.current.message('image', data.image, 'required|min:1')}
                      {!isAddMode && (data.oldImage ? <img src={data.oldImage} height="200px" width="200px" alt="service" /> : "loading")}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">Description</label>
                      <input type="text" className="form-control" id="description" value={data.description} onChange={handleChange} onBlur={() => { validator.current.showMessageFor('description'); forceUpdate(update + 1) }} />
                      {validator.current.message('description', data.description, 'required|min:1')}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="price" className="form-label">Price</label>
                      <input type="number" className="form-control" id="price" value={data.price} onChange={handleChange} onBlur={() => { validator.current.showMessageFor('price'); forceUpdate(update + 1) }} />
                      {validator.current.message('price', data.price, 'required')}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="data-status" className="form-label">Status</label>
                      <select value={data.status} id="data-status" className="form-select" onChange={handleChange} onBlur={() => { validator.current.showMessageFor('status'); forceUpdate(update + 1) }}>
                        <option value="">Choose</option>
                        <option value={'Active'}>Active</option>
                        <option value={'Pending'}>Pending</option>
                        <option value={'Inactive'}>Inactive</option>
                      </select>
                      {validator.current.message('status', data.status, 'required|in:Active,Pending,Inactive')}
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