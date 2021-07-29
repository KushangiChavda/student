import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from "react-redux";

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CssBaseline from "@material-ui/core/CssBaseline";


import api from '../../api';
import { successAlert, errorAlert } from '../../Stores/Alerts/actions';
import { Validator, validationConfig, isValidURL } from '../../utils';
import { StartPage } from '../StartPage';
import { Link } from 'react-router-dom';

const cmsOptions = ["blogs", "about page", "home page slider", "mission_stats", "mission_stats_slider", "mission_stats_desc", "address", "services_desc", "milestones", "get_in_touch"];
const initialState = { key: "", namespace: null, scope: "", label: "", image: "", description: "", status: "" };
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
      key: data.key,
      namespace: data.namespace, 
      scope: data.scope,
      label: data.label,
      image: data.image,
      file: image,
      description: data.description,
      status: data.status
    }
    const formData = new FormData();
    for (var key in payload) {
      formData.append(key, payload[key]);
    }
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
    return api.post('/cms/add', data)
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
    data.append('_id', id);
    return api.put('/cms', data)
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
      api.get(`/cms/view/${id}`).then((res) => {
        // dispatch(successAlert(res.data.message))
        let { key, namespace, scope, label, image, description, status } = res.data.cms;
        return setData({ key, namespace, scope, label, image:'', oldImage: isValidURL(image) ? image : `${IMG_PUBLIC_URL}${image}`, description, status });
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
            contenttitle={`${!isAddMode ? 'Update' : 'Add'} CMS`}
            content="cms"
            contents={!isAddMode ? 'Update' : 'Add'}
          />
          {/* end page title */}
          <div className="row">
            <div className="col-md-8">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="key" className="form-label">Key</label>
                      <input type="text" className="form-control" id="key" value={data.key} onChange={handleChange} 
                      // onBlur={() => { validator.current.showMessageFor('key'); forceUpdate(update + 1) }} 
                      />
                      {/* {validator.current.message('key', data.key, 'required|min:4')} */}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="namespace" className="form-label">Namespace</label>
                      <CssBaseline />
                        <Autocomplete
                          m={0}
                          id="namespace"
                          freeSolo={false}
                          size='small'
                          style={{fontSize: 'inherit'}}
                          options={cmsOptions}
                          getOptionLabel={(option) => option}
                          value={data.namespace}
                          onChange={(_, newValue) => {
                            setData(prevState => ({
                              ...prevState,
                              namespace: newValue
                            }))
                          }}
                          onBlur={() => { validator.current.showMessageFor('namespace'); forceUpdate(update + 1) }}
                          renderInput={(params) => (
                            <TextField {...params} className="form-control" style={{margin: '0px'}} margin="normal" variant="outlined" />
                          )}
                        />
                      {validator.current.message('namespace', data.namespace, 'required|min:4')}
                    </div>
                    {/* <div className="mb-3">
                      <label htmlFor="namespace" className="form-label">Namespace</label>
                      <input type="text" className="form-control" id="namespace" value={data.namespace} onChange={handleChange} onBlur={() => { validator.current.showMessageFor('namespace'); forceUpdate(update + 1) }} />
                      {validator.current.message('namespace', data.namespace, 'required|min:4')}
                    </div> */}
                    <div className="mb-3">
                      <label htmlFor="scope" className="form-label">Scope</label>
                      <input type="text" className="form-control" id="scope" value={data.scope} onChange={handleChange} onBlur={() => { validator.current.showMessageFor('scope'); forceUpdate(update + 1) }} />
                      {validator.current.message('scope', data.scope, 'required|min:4')}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="label" className="form-label">Label</label>
                      <input type="text" className="form-control" id="label" value={data.label} onChange={handleChange} onBlur={() => { validator.current.showMessageFor('label'); forceUpdate(update + 1) }} />
                      {data.image && data.image !== '' ? validator.current.message('label', data.label, 'required|min:4') : null}
                    </div>
                    {/* <div className="mb-3">
                      <label htmlFor="image" className="form-label">Image</label>
                      <input type="text" className="form-control" id="image" value={data.image} onChange={handleChange} onBlur={() => { validator.current.showMessageFor('image'); forceUpdate(update + 1) }} />
                      {validator.current.message('image', data.image, 'required|min:4')}
                    </div> */}
                    <div className="mb-3">
                      <label htmlFor="image" className="form-label">Image</label>
                      <input type="file" className="form-control" name="image" id="image" value={data.image} onChange={handleChange} onBlur={() => { validator.current.showMessageFor('image'); forceUpdate(update + 1) }} />
                      {data.label !== '' && isAddMode && validator.current.message('image', data.image, 'required|min:1')}
                      {!isAddMode && (data.oldImage ? <img src={data.oldImage} height="200px" width="200px" alt="service" /> : "loading")}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">Description</label>
                      <input type="text" className="form-control" id="description" value={data.description} onChange={handleChange} 
                      // onBlur={() => { validator.current.showMessageFor('description'); forceUpdate(update + 1) }}
                       />
                      {/* {validator.current.message('description', data.description, '')} */}
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