import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';

import api from '../../api';
import { successAlert, errorAlert } from '../../Stores/Alerts/actions';
import { Validator, validationConfig } from '../../utils';
import { StartPage } from '../StartPage';

const initialState = { title: "", oldImage: '', image: "", description: "", tag: "", category: '', status: "", userId: "" }
const categoryOpt = ["Career Development", "Current Issues", "Digital Skills", "Entrepreneurship", "Using Platform"];
const IMG_PUBLIC_URL = process.env.REACT_APP_IMG_PUBLIC_URL || 'http://localhost:2000/public/';

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
      title: data.title,
      image: data.image,
      file: image,
      description: data.description,
      tag: data.tag,
      category: data.category,
      status: data.status
    }
    const formData = new FormData();
    for (var key in payload) {
      formData.append(key, payload[key]);
    }
    formData.forEach(value => console.log('payload', value))
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
    return api.post('/blogs/add', data)
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
    return api.put('/blogs', data)
      .then((res) => {
        dispatch(successAlert(res.data.message));
        return history.push('..');
      })
      .catch((err) => {
        console.log(err);
        dispatch(errorAlert(err.response.data.message));
      });
  }
  
  useEffect(() => {
    if (!isAddMode) {
      // get data and set form fields
      api.get(`/blogs/view/${id}`).then((res) => {
        let { title, image, description, tag, category, status, userId } = res.data.blog;
        return setData({ title, image:"", oldImage: `${IMG_PUBLIC_URL}${image}`, description, tag, category, status, userId });
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
            contenttitle={`${!isAddMode ? 'Update' : 'Add'} Blogs`}
            content="Blogs"
            contents={!isAddMode ? 'Update' : 'Add'}
          />
          {/* end page title */}
          <div className="row">
            <div className="col-md-8">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">Blog title</label>
                      <input type="text" className="form-control" id="title" value={data.title} onChange={handleChange} onBlur={() => { validator.current.showMessageFor('title'); forceUpdate(update + 1) }} />
                      {validator.current.message('title', data.title, 'required|min:4')}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="image" className="form-label">Image</label>
                      <input type="file" className="form-control" name="image" id="image" value={data.image} onChange={handleChange} />
                      {isAddMode && validator.current.message('image', data.image, 'required')}
                      {!isAddMode && (data.oldImage ? <img src={data.oldImage} height="200px" width="200px" alt="blog" /> : "loading")}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">Description</label>
                      <input type="text" className="form-control" id="description" value={data.description} onChange={handleChange} onBlur={() => { validator.current.showMessageFor('description'); forceUpdate(update + 1) }} />
                      {validator.current.message('description', data.description, 'required|min:1')}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="tag" className="form-label">Tag</label>
                      <input type="text" className="form-control" id="tag" value={data.tag} onChange={handleChange} onBlur={() => { validator.current.showMessageFor('tag'); forceUpdate(update + 1) }} />
                      {validator.current.message('tag', data.tag, 'required|min:1')}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="category" className="form-label">Category</label>
                      <select value={data.category} id="category" className="form-select" onChange={handleChange} onBlur={() => { validator.current.showMessageFor('category'); forceUpdate(update + 1) }}>
                        <option value="">Choose</option>
                        {categoryOpt.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                      {validator.current.message('category', data.category, ['required'])}
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
          {/* end row */}
          </div>
          {/* container-fluid */}
        </div>
}
export default AddEdit;