import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import api from "../../api";
import { Validator, validationConfig } from "../../utils";
import DateFnsUtils from "@date-io/date-fns";
import { successAlert, errorAlert } from "../../Stores/Alerts/actions";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
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
const initialState = {
  email: "",
  firstName: "",
  fullName: "",
  gender: "",
  lastName: "",
  middleName: "",
  skills: [],
  qualifications: [
    {
      _id: "",
      no: "",
      school: "",
      startingYear: "",
      passingYear: "",
      grade: "",
    },
  ],
  projects: [
    {
      _id: "",
      no: "",
      projectTitle: "",
      description: "",
      technologies: [],
    },
  ],

  experiences: [
    {
      _id: "",
      no: "",
      companyName: "",
      description: "",
      startDate: "",
      endDate: "",
      position: "",
      location: "",
    },
  ],
};

const EditUser = (props) => {
  const {
    history,
    location: { pathname },
  } = props;
  const validator = useRef(new Validator(validationConfig));
  const [update, forceUpdate] = useState(1);
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );
  // const [id] = useState(props.match.params.id);
  const [user, setUser] = useState(initialState);
  const skills = ["Web Development", "Data Science", "Web scrping"];
  const technologies = [
    "Javascript",
    "Django",
    "React",
    "HTML",
    "CSS",
    "Bootstrap",
  ];
  const classes = useStyles();

  const dispatch = useDispatch();

  const getUserById = (userId) => {
    api
      .get(`/profile`)
      .then((res) => {
        // dispatch(successAlert(res.data.message))
        const { firstName, lastName, email } = res.data.user;
        return setUser((prev) => ({ ...prev, firstName, lastName, email }));
      })
      .catch((err) => {
        if (err.response.status === 404) {
          return history.push({ pathname, state: "404" });
        }
        console.log(err);
        dispatch(errorAlert(err.response.data.message));
      });
  };

  const getUserProfileById = (userId) => {
    api
      .get(`/userProfile`)
      .then((res) => {
        // dispatch(successAlert(res.data.message))
        const {
          fullName,
          gender,
          projects,
          qualifications,
          skills,
          middleName,
          objective,
          phone,
          twitter,
          website,
          linkedin,
          experiences,
          address,
          state,
          city,
          country,
        } = res.data.profile;
        return setUser((prev) => ({
          ...prev,
          fullName,
          gender,
          projects,
          qualifications,
          skills,
          middleName,
          objective,
          phone,
          twitter,
          website,
          linkedin,
          experiences,
          address,
          state,
          city,
          country,
        }));
      })
      .catch((err) => {
        if (err.response.status === 404) {
          return history.push({ pathname, state: "404" });
        }
        console.log(err);
        dispatch(errorAlert(err.response.data.message));
      });
  };

  const handleSkillChange = (e, value) => {
    e.preventDefault();
    const list = { ...user, skills: value };
    setUser(list);
  };

  const handleTechnologyChange = (index) => (e, value) => {
    e.preventDefault();
    const list = { ...user };
    list.projects[index].technologies = value;
    // console.log("list>>>", user?.projects[0].technologies);
    setUser(list);
  };
  // console.log("userproj", user);
  const handleDateChange = (index, field) => (date) => {
    // e.preventDefault();
    const list = { ...user };
    list.experiences[index][field] = date;
    // console.log("list>>>", list);
    setUser(list);
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

  const handleProfileChange = (e, idx, field) => {
    const { name, value } = e.target;

    const values = { ...user };

    values[field][idx][name] = value;
    setUser(values);
  };

  const handleAddProjects = () => {
    setUser({
      ...user,
      projects: [
        ...user.projects,
        { no: "", projectTitle: "", description: "", technologies: [] },
      ],
    });
  };

  const handleAddqualifications = () => {
    setUser({
      ...user,
      qualifications: [
        ...user.qualifications,
        {
          no: "",
          projectTitle: "",
          description: "",

          school: "",
          passingYear: "",
          grade: "",
        },
      ],
    });
  };

  const handleAddEXperiences = () => {
    setUser({
      ...user,
      experiences: [
        ...user.experiences,
        {
          no: "",
          companyName: "",
          description: "",
          startDate: selectedDate,
          endDate: selectedDate,
          position: "",
          location: "",
        },
      ],
    });
  };

  const handleRemoveClick = (index, field) => {
    const list = { ...user };
    list[field].splice(index, 1);
    setUser(list);
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
      middleName: user.middleName,
      gender: user.gender,
      address: user.address,
      city: user.city,
      state: user.state,
      country: user.country,
      linkedin: user.linkedin,
      objective: user.objective,
      phone: user.phone,
      twitter: user.twitter,
      website: user.website,

      status: user.status,
      role: user.role,
      projects: user.projects,

      skills: user.skills,
      qualifications: user.qualifications,
      experiences: user.experiences,
    };
    if (user.password !== "") {
      payload.password = user.password;
    }
    api
      .put("/userProfile", payload)
      .then((res) => {
        dispatch(successAlert(res.data.message));
        return getUserProfileById();
        // return getUserById(id);
      })
      .catch((err) => {
        console.log(err);
        dispatch(errorAlert(err.response.data.message));
      });
  };

  useEffect(() => {
    getUserById();
    getUserProfileById();
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
        <div className="col-md-10">
          <div className="card">
            <div className="card-body">
              {!user && <h4 className="card-title mb-4">Loading...</h4>}
              {user && (
                <form onSubmit={handleSubmit}>
                  {/* firstName & lastName */}

                  <fieldset className="border border-dark  rounded-2 p-2 mb-3">
                    <legend style={{ float: "unset", width: "auto" }}>
                      <h5
                        className="px-1 fw-bolder"
                        style={{ color: "cadetblue" }}
                      >
                        Personal Information{" "}
                      </h5>
                    </legend>
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
                            disabled
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
                            disabled
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
                          <input
                            type="text"
                            className="form-control"
                            id="middleName"
                            defaultValue={user.middleName}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Objective</label>
                      <textarea
                        type="text"
                        className="form-control"
                        name="objective"
                        rows="2"
                        defaultValue={user.objective}
                        onChange={handleChange}
                        onBlur={() => {
                          validator.current.showMessageFor("objective");
                          forceUpdate(update + 1);
                        }}
                      />
                      {validator.current.message(
                        "objective",
                        user.objective,
                        "required"
                      )}
                    </div>

                    {/* Email */}
                    <div className="mb-3">
                      <label htmlFor="user-email" className="form-label">
                        Email
                      </label>
                      <input
                        disabled
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
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Phone Number</label>
                        <input
                          type="text"
                          className="form-control"
                          id="phone"
                          defaultValue={user.phone}
                          onChange={handleChange}
                          onBlur={() => {
                            validator.current.showMessageFor("phone");
                            forceUpdate(update + 1);
                          }}
                        />
                        {validator.current.message(
                          "phone",
                          user.phone,
                          "required"
                        )}
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Address</label>
                        <input
                          type="text"
                          className="form-control"
                          id="address"
                          defaultValue={user.address}
                          onChange={handleChange}
                          onBlur={() => {
                            validator.current.showMessageFor("address");
                            forceUpdate(update + 1);
                          }}
                        />
                        {validator.current.message(
                          "address",
                          user.address,
                          "required"
                        )}
                      </div>
                    </div>
                    {/* //City, State and Country */}

                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <label className="form-label">City</label>
                        <input
                          type="text"
                          className="form-control"
                          id="city"
                          defaultValue={user.city}
                          onChange={handleChange}
                          onBlur={() => {
                            validator.current.showMessageFor("city");
                            forceUpdate(update + 1);
                          }}
                        />
                        {validator.current.message(
                          "city",
                          user.city,
                          "required"
                        )}
                      </div>

                      <div className="col-md-4 mb-3">
                        <label className="form-label">State</label>
                        <input
                          type="text"
                          className="form-control"
                          id="state"
                          defaultValue={user.state}
                          onChange={handleChange}
                          onBlur={() => {
                            validator.current.showMessageFor("state");
                            forceUpdate(update + 1);
                          }}
                        />
                        {validator.current.message(
                          "state",
                          user.state,
                          "required"
                        )}
                      </div>

                      <div className="col-md-4 mb-3">
                        <label className="form-label">Country</label>
                        <input
                          type="text"
                          className="form-control"
                          id="country"
                          defaultValue={user.country}
                          onChange={handleChange}
                          onBlur={() => {
                            validator.current.showMessageFor("country");
                            forceUpdate(update + 1);
                          }}
                        />
                        {validator.current.message(
                          "country",
                          user.country,
                          "required"
                        )}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <label className="form-label">LinkedIn</label>
                        <input
                          type="text"
                          className="form-control"
                          id="linkedin"
                          defaultValue={user.linkedin}
                          onChange={handleChange}
                          onBlur={() => {
                            validator.current.showMessageFor("linkedin");
                            forceUpdate(update + 1);
                          }}
                        />
                        {validator.current.message(
                          "linkedin",
                          user.linkedin,
                          "required"
                        )}
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="form-label">Twitter</label>
                        <input
                          type="text"
                          className="form-control"
                          id="twitter"
                          defaultValue={user.twitter}
                          onChange={handleChange}
                          onBlur={() => {
                            validator.current.showMessageFor("twitter");
                            forceUpdate(update + 1);
                          }}
                        />
                        {validator.current.message(
                          "twitter",
                          user.twitter,
                          "required"
                        )}
                      </div>

                      <div className="col-md-4 mb-3">
                        <label className="form-label">Personal website</label>
                        <input
                          type="text"
                          className="form-control"
                          id="website"
                          defaultValue={user.website}
                          onChange={handleChange}
                          onBlur={() => {
                            validator.current.showMessageFor("website");
                            forceUpdate(update + 1);
                          }}
                        />
                        {validator.current.message(
                          "website",
                          user.website,
                          "required"
                        )}
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Gender: </label>
                      <label style={{ fontWeight: "normal", marginBottom: 0 }}>
                        <input
                          type="radio"
                          name="gender"
                          id="gender"
                          value="Male"
                          className="form-check-input m-1"
                          checked={user?.gender === "Male"}
                          onChange={handleChange}
                        />
                        Male
                      </label>
                      <label style={{ fontWeight: "normal", marginBottom: 0 }}>
                        <input
                          type="radio"
                          name="gender"
                          id="gender"
                          value="Female"
                          className="form-check-input m-1"
                          checked={user?.gender === "Female"}
                          onChange={handleChange}
                        />
                        Female
                      </label>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Skills</label>
                      <Autocomplete
                        multiple
                        value={user?.skills}
                        size="small"
                        classes={classes}
                        options={skills}
                        getOptionLabel={(option) => option}
                        onChange={handleSkillChange}
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
                  </fieldset>
                  <div className="mb-3">
                    <fieldset className="border border-dark  rounded-2 p-2">
                      {/* <legend class="w-auto">Your Legend</legend> */}

                      <legend style={{ float: "unset", width: "auto" }}>
                        <h5
                          className="px-1 fw-bolder"
                          style={{ color: "cadetblue" }}
                        >
                          Qualifications
                        </h5>
                      </legend>
                      <div className="row">
                        <label className="form-label col-md-1">SrNo </label>
                        <label className="form-label col-md-2">
                          School Name
                        </label>
                        <label className="form-label col-md-2">Degree</label>
                        <label className="form-label col-md-2">Started</label>
                        <label className="form-label col-md-2">Ended</label>

                        <label className="form-label col-md-2">
                          Grade/Percentage
                        </label>
                      </div>

                      {user?.qualifications &&
                        user?.qualifications?.map((fields, id) => (
                          <div key={id}>
                            <div className="row">
                              <div className="col-md-1 mb-3">
                                <input
                                  disabled
                                  // type="number"
                                  min="1"
                                  name="no"
                                  className="form-control"
                                  value={id + 1}
                                  onChange={(e) =>
                                    handleProfileChange(e, id, "qualifications")
                                  }
                                />
                              </div>

                              <div className="col-md-2">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="school"
                                  value={fields?.school}
                                  onChange={(e) =>
                                    handleProfileChange(e, id, "qualifications")
                                  }
                                />
                              </div>

                              <div className="col-md-2">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="degree"
                                  value={fields?.degree}
                                  onChange={(e) =>
                                    handleProfileChange(e, id, "qualifications")
                                  }
                                />
                              </div>
                              <div className="col-md-2">
                                <input
                                  type="text"
                                  name="startingYear"
                                  className="form-control"
                                  value={fields?.startingYear}
                                  onChange={(e) =>
                                    handleProfileChange(e, id, "qualifications")
                                  }
                                />
                              </div>
                              <div className="col-md-2">
                                <input
                                  type="text"
                                  name="passingYear"
                                  className="form-control"
                                  value={fields?.passingYear}
                                  onChange={(e) =>
                                    handleProfileChange(e, id, "qualifications")
                                  }
                                />
                              </div>

                              <div className="col-md-2">
                                <input
                                  // id="grade"
                                  type="text"
                                  name="grade"
                                  className="form-control"
                                  value={fields.grade}
                                  onChange={(e) =>
                                    handleProfileChange(e, id, "qualifications")
                                  }
                                />
                              </div>

                              <div className=" col-md-1">
                                {user.qualifications.length !== 1 && (
                                  <i
                                    className="bx bx-minus font-size-20 float-end text-danger"
                                    onClick={() =>
                                      handleRemoveClick(id, "qualifications")
                                    }
                                  ></i>
                                )}
                                {user.qualifications.length - 1 === id && (
                                  <i
                                    className="bx bx-add-to-queue font-size-20 float-end text-success"
                                    onClick={handleAddqualifications}
                                  ></i>
                                )}
                              </div>
                              {user.qualifications.length - 1 === id ? null : (
                                <hr />
                              )}
                            </div>
                          </div>
                        ))}
                    </fieldset>
                  </div>
                  <div className="mb-3">
                    <fieldset className="border border-dark rounded-2 p-2">
                      <legend style={{ float: "unset", width: "auto" }}>
                        <h5
                          className="px-1 fw-bolder"
                          style={{ color: "cadetblue" }}
                        >
                          Experience/Internships
                        </h5>
                      </legend>
                      <div>
                        {user?.experiences &&
                          user?.experiences?.map((fields, id) => (
                            <div>
                              <div className="row mb-3">
                                <div className="col-md-2">
                                  <label className="form-label py-2">
                                    Position
                                  </label>
                                </div>
                                <div className="col-md-4">
                                  {" "}
                                  <input
                                    type="text"
                                    name="position"
                                    className="form-control"
                                    value={fields?.position}
                                    onChange={(e) =>
                                      handleProfileChange(e, id, "experiences")
                                    }
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="form-label py-2">
                                    Description
                                  </label>
                                </div>
                                <div className="col-md-4">
                                  <textarea
                                    // type="text"
                                    name="description"
                                    rows="2"
                                    className="form-control"
                                    value={fields?.description}
                                    onChange={(e) =>
                                      handleProfileChange(e, id, "experiences")
                                    }
                                  />
                                </div>
                              </div>
                              <div className="row mb-3">
                                <div className="col-md-2">
                                  {" "}
                                  <label className="form-label py-2">
                                    Company Name
                                  </label>
                                </div>
                                <div className="col-md-4">
                                  {" "}
                                  <input
                                    type="text"
                                    name="companyName"
                                    className="form-control"
                                    value={fields?.companyName}
                                    onChange={(e) =>
                                      handleProfileChange(e, id, "experiences")
                                    }
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="form-label py-2">
                                    Location
                                  </label>
                                </div>
                                <div className="col-md-4">
                                  <input
                                    type="text"
                                    name="location"
                                    className="form-control"
                                    value={fields?.location}
                                    onChange={(e) =>
                                      handleProfileChange(e, id, "experiences")
                                    }
                                  />
                                </div>
                              </div>
                              <div className="row ">
                                <div className="col-md-2 ">
                                  {" "}
                                  <label className="form-label py-4">
                                    Start Date{" "}
                                  </label>
                                </div>
                                <div className="col-md-4">
                                  {" "}
                                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                      margin="normal"
                                      id="date-picker-dialog"
                                      format="MM/dd/yyyy"
                                      value={fields?.startDate}
                                      onChange={handleDateChange(
                                        id,
                                        "startDate"
                                      )}
                                      KeyboardButtonProps={{
                                        "aria-label": "change date",
                                      }}
                                    />
                                  </MuiPickersUtilsProvider>
                                </div>
                                <div className="col-md-2">
                                  <label className="form-label py-4">
                                    End Date
                                  </label>
                                </div>
                                <div className="col-md-4">
                                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                      margin="normal"
                                      id="date-picker-dialog"
                                      format="MM/dd/yyyy"
                                      value={fields?.endDate}
                                      onChange={handleDateChange(id, "endDate")}
                                      KeyboardButtonProps={{
                                        "aria-label": "change date",
                                      }}
                                    />
                                  </MuiPickersUtilsProvider>
                                </div>
                              </div>

                              <div className="mb-3">
                                {user.experiences.length !== 1 && (
                                  <div className="">
                                    <i
                                      className="bx bx-minus font-size-20 float-end text-danger"
                                      onClick={() =>
                                        handleRemoveClick(id, "experiences")
                                      }
                                    ></i>
                                  </div>
                                )}
                                {user.experiences.length - 1 === id && (
                                  <div className="">
                                    <i
                                      className="bx bx-add-to-queue font-size-20 float-end text-success"
                                      onClick={handleAddEXperiences}
                                    ></i>
                                  </div>
                                )}
                              </div>
                              {user.experiences.length - 1 === id ? null : (
                                <hr />
                              )}
                            </div>
                          ))}
                      </div>
                    </fieldset>
                  </div>

                  <div className="mb-3">
                    <fieldset className="border border-dark  rounded-2 p-2">
                      <legend style={{ float: "unset", width: "auto" }}>
                        <h5
                          className="px-1 fw-bolder"
                          style={{ color: "cadetblue" }}
                        >
                          My projects{" "}
                        </h5>
                      </legend>
                      <div className="row">
                        <label className="form-label col-md-1">Sr No. </label>

                        <label className="form-label col-md-3">
                          Project Title
                        </label>
                        <label className="form-label col-md-3">
                          Description
                        </label>
                        <label className="form-label col-md-4">
                          Technologies
                        </label>
                      </div>

                      {user?.projects?.map((field, idx) => (
                        <div key={idx}>
                          <div className="row">
                            <div className="col-md-1 mb-3">
                              <input
                                // type="number"
                                disabled
                                min="1"
                                className="form-control"
                                name="no"
                                value={idx + 1}
                                onChange={(e) =>
                                  handleProfileChange(e, idx, "projects")
                                }
                              />
                            </div>

                            <div className="col-md-3">
                              <input
                                type="text"
                                name="projectTitle"
                                className="form-control"
                                value={field?.projectTitle}
                                onChange={(e) =>
                                  handleProfileChange(e, idx, "projects")
                                }
                              />
                            </div>
                            <div className="col-md-3">
                              <input
                                type="text"
                                name="description"
                                className="form-control"
                                value={field?.description}
                                onChange={(e) =>
                                  handleProfileChange(e, idx, "projects")
                                }
                              />
                            </div>
                            <div className="col-md-4">
                              <Autocomplete
                                multiple
                                value={user?.projects[idx].technologies}
                                size="small"
                                classes={classes}
                                options={technologies}
                                getOptionLabel={(option) => option}
                                onChange={handleTechnologyChange(idx)}
                                renderInput={(params) => {
                                  return (
                                    <TextField
                                      {...params}
                                      variant="outlined"
                                      placeholder="Technologies"
                                    />
                                  );
                                }}
                              />
                            </div>

                            <div className="col-md-1 d-flex flex-column justify-content-between align-items-start">
                              {user.projects.length !== 1 && (
                                <div className="">
                                  <i
                                    className="bx bx-minus font-size-20 float-end text-danger"
                                    onClick={() =>
                                      handleRemoveClick(idx, "projects")
                                    }
                                  ></i>
                                </div>
                              )}
                              {user.projects.length - 1 === idx && (
                                <div className="">
                                  <i
                                    className="bx bx-add-to-queue font-size-20 float-end text-success"
                                    onClick={handleAddProjects}
                                  ></i>
                                </div>
                              )}
                            </div>
                            {user.projects.length - 1 === idx ? null : <hr />}
                          </div>
                        </div>
                      ))}
                    </fieldset>
                  </div>

                  <div>
                    <button type="submit" className="btn btn-primary w-md">
                      Submit
                    </button>
                    <Link to="/" className="btn btn-primary w-md m-2">
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
