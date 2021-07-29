import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from "react-redux";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";

import api from '../../api';
import { successAlert, errorAlert } from '../../Stores/Alerts/actions';
import { Validator, validationConfig } from '../../utils';
import { StartPage } from '../StartPage';
import { Link } from 'react-router-dom';

const initialState = {
    title: "",
    desc: "",
    rating: "",
    status: "",
}
const AddEditTestimonial = (props) => {
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
            title: data.title,
            desc: data.desc,
            date: selectedDate,
            rating: data.rating,
            status: data.status,

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
    const [selectedDate, setSelectedDate] = React.useState(
        new Date("2014-08-18T21:11:54")
    );

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const createData = (data) => {
        return api.post('/testimonials/add', data)
            .then((res) => {
                dispatch(successAlert(res.data.message));
                return history.push('/testimonials');
            })
            .catch((err) => {
                dispatch(errorAlert(err.response.data.message));
                console.log(err);
            });
    }

    const updateData = (id, data) => {
        return api.put('/testimonials', { _id: id, ...data })
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
            api.get(`/testimonials/view/${id}`).then((res) => {
                // dispatch(successAlert(res.data.message))
                let { title, desc, date, rating, status } = res.data.testimonial;
                setSelectedDate(date);
                return setData({ title, desc, rating, status });
            }).catch((err) => {
                console.log(err)
                dispatch(errorAlert(err.response.data.message));
            });
        }
        // eslint-disable-next-line
    }, []);

    return <div className="container-fluid">
        {/* start page title */}
        <StartPage 
            contenttitle={`${!isAddMode ? 'Update' : 'Add'} Testimonial`}
            content="Testimonial"
            contents={!isAddMode ? 'Update' : 'Add'}
        />
        {/* end page title */}
        <div className="row">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">
                                    Testimonial Title
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    value={data.title}
                                    onChange={handleChange}
                                    onBlur={() => {
                                        validator.current.showMessageFor("title");
                                        forceUpdate(update + 1);
                                    }}
                                />
                                {validator.current.message(
                                    "title",
                                    data.title,
                                    "required|min:4"
                                )}
                            </div>
                            <div className="row">
                                <div className="mb-3">
                                    <label className="form-label">
                                        Testimonial Description
                                    </label>
                                    <textarea
                                        id="desc"
                                        className="form-control"
                                        rows="3"
                                        value={data.desc}
                                        onChange={handleChange}
                                        onBlur={() => {
                                            validator.current.showMessageFor("desc");
                                            forceUpdate(update + 1);
                                        }}
                                    />
                                    {validator.current.message(
                                        "desc",
                                        data.desc,
                                        "required|min:4"
                                    )}
                                </div>
                            </div>

                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="Testimonial Date "
                                    format="MM/dd/yyyy"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        "aria-label": "change date",
                                    }}
                                />
                            </MuiPickersUtilsProvider>

                            <div className="mb-3">
                                <div className="col-md-3">
                                    <div className="mb-3">
                                        <label className="form-label">Rating</label>
                                        <input
                                            id="rating"
                                            type="number"
                                            value={data.rating}
                                            onChange={handleChange}
                                            className="form-control"
                                            min="0"
                                            max="5"
                                            placeholder="00"
                                            onBlur={() => {
                                                validator.current.showMessageFor("rating");
                                                forceUpdate(update + 1);
                                            }}
                                        />
                                        {validator.current.message(
                                    "rating",
                                    data.rating,
                                    "required|in:1,2,3,4,5"
                                )}
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="user-status" className="form-label">
                                    Status
                                </label>
                                <select
                                    value={data.status}
                                    id="data-status"
                                    className="form-select"
                                    onChange={handleChange}
                                    onBlur={() => {
                                        validator.current.showMessageFor("status");
                                        forceUpdate(update + 1);
                                    }}
                                >
                                    <option value="">Choose</option>
                                    <option value={"Active"}>Active</option>
                                    <option value={"Pending"}>Pending</option>
                                    <option value={"Inactive"}>Inactive</option>
                                </select>
                                {validator.current.message(
                                    "status",
                                    data.status,
                                    "required|in:Active,Pending,Inactive"
                                )}
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

export default AddEditTestimonial;