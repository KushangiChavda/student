import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import api from "../../api";
import { Validator, validationConfig } from "../../utils";
import { successAlert, errorAlert } from "../../Stores/Alerts/actions";
// import { makeStyles } from "@material-ui/core/styles";
import { StartPage } from "../StartPage";
import { Link } from "react-router-dom";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
const useStyles = makeStyles((theme) => ({
  inputRoot: {
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "grey",
    },
  },
}));
const EditUser = (props) => {
  const {
    history,
    location: { pathname },
  } = props;
  const validator = useRef(new Validator(validationConfig));
  const [update, forceUpdate] = useState(1);
  // const [id] = useState(props.match.params.id);
  const [user, setUser] = useState(null);
  const classes = useStyles();

  const dispatch = useDispatch();
  const top100Films = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
  ];
  const getUserById = (userId) => {
    api
      .get(`/profile`)
      .then((res) => {
        // dispatch(successAlert(res.data.message))
        return setUser({ ...res.data.user });
      })
      .catch((err) => {
        if (err.response.status === 404) {
          return history.push({ pathname, state: "404" });
        }
        console.log(err);
        dispatch(errorAlert(err.response.data.message));
      });
  };

  const handleChange = (e) => {
    const { id: _id, value } = e.target;
    const attrs = {
      "user-status": "status",
      "user-password": "password",
      "user-email": "email",
    };
    let id = attrs[_id] ? attrs[_id] : _id;
    setUser((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

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
      role: user.role,
    };
    if (user.password !== "") {
      payload.password = user.password;
    }
    api
      .put("/profile", payload)
      .then((res) => {
        dispatch(successAlert(res.data.message));
        // return getUserById(id);
      })
      .catch((err) => {
        console.log(err);
        dispatch(errorAlert(err.response.data.message));
      });
  };

  useEffect(() => {
    getUserById();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container-fluid">
      {/* start page title */}
      <StartPage
        contenttitle="Update Profile"
        content="Users"
        contents="profile"
      />
      {/* end page title */}
      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              {!user && <h4 className="card-title mb-4">Loading...</h4>}
              {user && (
                <form onSubmit={handleSubmit}>
                  {/* firstName & lastName */}
                  <div className="row">
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">
                          First name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="firstName"
                          defaultValue={user.firstName}
                          onChange={handleChange}
                          onBlur={() => {
                            validator.current.showMessageFor("firstName");
                            forceUpdate(update + 1);
                          }}
                        />
                        {validator.current.message(
                          "firstName",
                          user.firstName,
                          "required|min:4"
                        )}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">
                          Last Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          defaultValue={user.lastName}
                          onChange={handleChange}
                          onBlur={() => {
                            validator.current.showMessageFor("lastName");
                            forceUpdate(update + 1);
                          }}
                        />
                        {validator.current.message(
                          "lastName",
                          user.lastName,
                          "required|min:4"
                        )}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="user-email" className="form-label">
                          Middle Name
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                  </div>
                  {/* Email */}
                  <div className="mb-3">
                    <label htmlFor="user-email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="user-email"
                      defaultValue={user.email}
                      onChange={handleChange}
                      onBlur={() => {
                        validator.current.showMessageFor("email");
                        forceUpdate(update + 1);
                      }}
                    />
                    {validator.current.message(
                      "email",
                      user.email,
                      "required|email"
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Gender</label>
                    <input type="text" className="form-control" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Qualification: </label>
                    <i className="bx bx-add-to-queue font-size-20 float-end"></i>
                    <div className="row">
                      <div className="col-md-6">
                        <label className="form-label">Sr No. </label>
                        <input type="number" className="form-control" />
                        <label className="form-label">School / Degree</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Passing year</label>
                        <input type="text" className="form-control" />
                        <label className="form-label">Grade / percentage</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Skills</label>
                    <Autocomplete
                      multiple
                      size="small"
                      classes={classes}
                      options={top100Films}
                      getOptionLabel={(option) => option.title}
                      renderInput={(params) => {
                        return (
                          <TextField
                            {...params}
                            variant="outlined"
                            placeholder="Skills"
                            fullWidth
                          />
                        );
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">My projects: </label>
                    <i className="bx bx-add-to-queue font-size-20 float-end"></i>
                    <div className="row">
                      <div className="col-md-6">
                        <label className="form-label">Sr No. </label>
                        <input type="number" className="form-control" />
                        <label className="form-label">Project Title</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Description</label>
                        <input type="text" className="form-control" />
                        <label className="form-label">Technologies</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">My current CV </label>
                    <input type="file" className="form-control" />
                  </div>

                  <div>
                    <button type="submit" className="btn btn-primary w-md">
                      Submit
                    </button>
                    <Link to="/users" className="btn btn-primary w-md m-2">
                      {" "}
                      Cancel
                    </Link>
                  </div>
                </form>
              )}
            </div>
            {/* end card body */}
          </div>
        </div>
      </div>
      {/* end row */}
    </div>
  );
};

export default EditUser;
