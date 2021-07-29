import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from "react-redux";

import api from '../../api';
import { Validator, validationConfig } from '../../utils';
import { successAlert, errorAlert } from '../../Stores/Alerts/actions';
import { StartPage } from '../StartPage';
import { Link } from 'react-router-dom';

const AddCourse = (props) => {
  const validator = useRef(new Validator(validationConfig));
  const [update, forceUpdate] = useState(1);
  const [tracks, setTracks] = useState(null);
  const [course, setCourse] = useState({
    name: "",
    hours: 0,
    minutes: 0,
    track: '',
    status: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { id: _id, value } = e.target;
    const attrs = {
      'course-status': 'status',
    }
    let id = attrs[_id] ? attrs[_id] : _id;
    setCourse(prevState => ({
      ...prevState,
      [id]: value
    }))
  }

  const getTracks = () => {
    api.get('/tracks').then((res) => {
      let tracksData = res.data.tracks.filter(d => d.isDeleted === false).map(u => {
        return <option key={u._id} value={u._id}>{u.name}</option>;
        // { id: u._id, name: u.name };
      });
      return setTracks(tracksData);
    }).catch((err) => {
      console.log(err);
    });
  }
  
  useEffect(getTracks, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validator.current.allValid()) {
      validator.current.showMessages();
      return forceUpdate(update + 1);
    }
    let payload = {
      name: course.name,
      duration: `${course.hours}:${course.minutes}`,
      track: course.track,
      status: course.status
    }
    api.post('/courses/add', payload)
      .then(function (res) {
        dispatch(successAlert(res.data.message));
        return props.history.push('/courses');
      })
      .catch(function (err) {
        dispatch(errorAlert(err.response.data.message));
        console.log(err);
      });
  }

  return <div className="container-fluid">
          {/* start page title */}
          <StartPage 
            contenttitle="Add Course"
            content="Courses"
            contents="Add"
          />
          {/* end page title */}
          <div className="row">
            <div className="col-md-8">

              <div className="card">
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Course name</label>
                      <input type="text" className="form-control" id="name" value={course.name} onChange={handleChange} onBlur={() => { validator.current.showMessageFor('name'); forceUpdate(update + 1) }} />
                      {validator.current.message('name', course.name, 'required|min:4')}
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="hours" className="form-label">Course Hours</label>
                          <input type="number" className="form-control" id="hours" min="0" placeholder="00" value={course.hours} onChange={handleChange} onBlur={() => { validator.current.showMessageFor('hours'); forceUpdate(update + 1) }} />
                          {validator.current.message('hours', course.hours, 'required|min:1')}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="minutes" className="form-label">Course Minutes</label>
                          <input type="number" className="form-control" id="minutes" min="0" placeholder="00" value={course.minutes} onChange={handleChange} onBlur={() => { validator.current.showMessageFor('minutes'); forceUpdate(update + 1) }} />
                          {validator.current.message('minutes', course.minutes, 'required|min:1')}
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="track" className="form-label">Track</label>
                      <select value={course.track} id="track" className="form-select" onChange={handleChange} onBlur={() => { validator.current.showMessageFor('track'); forceUpdate(update + 1) }}>
                        <option value="">Choose</option>
                        {!tracks ? <option value="">Loading</option> : tracks }
                      </select>
                      {validator.current.message('track', course.track, 'required|min:1')}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="user-status" className="form-label">Status</label>
                      <select value={course.status} id="course-status" className="form-select" onChange={handleChange} onBlur={() => { validator.current.showMessageFor('status'); forceUpdate(update + 1) }}>
                        <option value="">Choose</option>
                        <option value={'Active'}>Active</option>
                        <option value={'Pending'}>Pending</option>
                        <option value={'Inactive'}>Inactive</option>
                      </select>
                      {validator.current.message('status', course.status, 'required|in:Active,Pending,Inactive')}
                    </div>
                    <div>
                      <button type="submit" className="btn btn-primary w-md">Submit</button>
                      <Link to='/courses' className="btn btn-primary w-md m-2"> Cancel</Link>
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

export default AddCourse;