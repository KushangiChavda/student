import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from "react-redux";

import api from '../../api';
import { Validator, validationConfig } from '../../utils';
import { successAlert, errorAlert } from '../../Stores/Alerts/actions';
import { StartPage } from '../StartPage';
import { Link } from 'react-router-dom';

const EditCourse = (props) => {
  const validator = useRef(new Validator(validationConfig));
  const [update, forceUpdate] = useState(1);
  const [tracks, setTracks] = useState(null);
  const [id] = useState(props.match.params.id);
  const [course, setCourse] = useState(null);

  const dispatch = useDispatch();

  const getCourseById = (userId) => {
    api.get(`/courses/view/${userId}`).then((res) => {
      // dispatch(successAlert(res.data.message))
      let { duration, ...course } = res.data.course;
      let d = duration.toString().split(':');
      return setCourse({ ...course, hours: d[0], minutes: d[1] });
    }).catch((err) => {
      console.log(err)
      dispatch(errorAlert(err.response.data.message));
    });
  }

  const handleChange = (e) => {
    const { id: _id, value } = e.target
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
      _id: course._id,
      name: course.name,
      duration: `${course.hours}:${course.minutes}`,
      track: course.track,
      status: course.status
    }
    api.put('/courses', payload)
      .then((res) => {
        dispatch(successAlert(res.data.message));
        return getCourseById(id);
      })
      .catch((err) => {
        console.log(err);
        dispatch(errorAlert(err.response.data.message));
      });
  }

  useEffect(() => {
    getCourseById(id);
    // eslint-disable-next-line
  }, [id]);

  return <div className="container-fluid">
          {/* start page title */}
          <StartPage 
            contenttitle="Edit Course"
            content="Courses"
            contents="Edit"
          />
          {/* end page title */}
          <div className="row">
            <div className="col-md-8">

              <div className="card">
                <div className="card-body">
                  {!course && <h4 className="card-title mb-4">Loading...</h4>}
                  {course && <form onSubmit={handleSubmit}>
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
                  }
                </div>
                {/* end card body */}
              </div>
            </div>
          {/* end row */}
          </div>
          {/* container-fluid */}
        </div>
}

export default EditCourse;