import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import api from "../../api";
import { successAlert, errorAlert } from "../../Stores/Alerts/actions";
import { Validator, validationConfig } from "../../utils";
import { StartPage } from "../StartPage";
import { Link } from "react-router-dom";

const additional = { text: "", isCorrect: false };
const initialState = {
  question: "",
  answers: [additional, additional, additional, additional],
  description: "",
  course: "",
  status: "",
  userId: "",
};

const AddEdit = (props) => {
  const { history, match } = props;
  const { id } = match.params;

  const isAddMode = !id;
  const validator = useRef(new Validator(validationConfig));
  const [courses, setCourses] = useState(null);
  const [update, forceUpdate] = useState(1);
  const [data, setData] = useState(initialState);
  const dispatch = useDispatch();

  const getCourses = () => {
    api
      .get("/courses")
      .then((res) => {
        let coursesData = res.data.courses
          .filter((d) => d.isDeleted === false)
          .map((u) => {
            return (
              <option key={u._id} value={u._id}>
                {u.name}
              </option>
            );
            // { id: u._id, name: u.name };
          });
        return setCourses(coursesData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(getCourses, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validator.current.allValid()) {
      validator.current.showMessages();
      return forceUpdate(update + 1);
    }
    let payload = {
      question: data.question,
      answers: data.answers,
      description: data.description,
      course: data.course,
      status: data.status,
    };
    return isAddMode ? createData(payload) : updateData(id, payload);
  };

  const handleAnswerChange = (index) => (e) => {
    e.preventDefault();
    const { name, value, type } = e.target;
    let _value = type === "checkbox" ? e.target.checked : value;
    let newAns = data.answers.map((ans, i) =>
      i === index
        ? { ...ans, [name]: _value }
        : { ...ans, isCorrect: type === "checkbox" ? false : ans.isCorrect }
    );
    setData((prevState) => ({
      ...prevState,
      answers: newAns,
    }));
  };

  const handleChange = (e) => {
    const { id: _id, value: _value } = e.target;
    const attrs = {
      "data-status": "status",
    };
    console.log("value", _value);
    let value = _value;
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }
    let id = attrs[_id] ? attrs[_id] : _id;
    setData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const createData = (data) => {
    return api
      .post("/questions/add", data)
      .then((res) => {
        dispatch(successAlert(res.data.message));
        return history.push(".");
      })
      .catch((err) => {
        console.log(err);
        dispatch(errorAlert(err.response.data.message));
      });
  };

  const updateData = (id, data) => {
    return api
      .put("/questions", { _id: id, ...data })
      .then((res) => {
        dispatch(successAlert(res.data.message));
        return history.push("..");
      })
      .catch((err) => {
        dispatch(errorAlert(err.response.data.message));
        console.log(err);
      });
  };

  useEffect(() => {
    if (!isAddMode) {
      // get data and set form fields
      api
        .get(`/questions/view/${id}`)
        .then((res) => {
          if (res.status === 200) {
            // dispatch(successAlert(res.data.message))
            let { question, answers, description, course, status } =
              res.data.question;
            return setData({ question, answers, description, course, status });
          }
          dispatch(errorAlert(res.data.message));
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container-fluid">
      {/* start page title */}
      <StartPage
        contenttitle={`${!isAddMode ? "Update" : "Add"} Question`}
        content="Questions"
        contents={!isAddMode ? "Update" : "Add"}
      />
      {/* end page title */}
      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="question" className="form-label">
                    Question
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="question"
                    value={data.question}
                    onChange={handleChange}
                    onBlur={() => {
                      validator.current.showMessageFor("question");
                      forceUpdate(update + 1);
                    }}
                  />
                  {validator.current.message(
                    "question",
                    data.question,
                    "required|min:4"
                  )}
                </div>
                {/* ANSWERS */}
                <div className="row">
                  <div className="col-md-8">
                    <div className="mb-3">
                      <label htmlFor="answers[0].text" className="form-label">
                        Answers
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="text"
                        id="answers[0].text"
                        placeholder="Answer"
                        value={data.answers[0].text}
                        onChange={handleAnswerChange(0)}
                        onBlur={() => {
                          validator.current.showMessageFor("answer-0");
                          forceUpdate(update + 1);
                        }}
                      />
                      {validator.current.message(
                        "answer-0",
                        data.answers[0].text,
                        "required"
                      )}
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="mb-3">
                      <label
                        htmlFor="answers[0].isTrue"
                        className="form-label"
                      ></label>
                      <div className="form-check form-check-primary mb-3">
                        {/* <label className="form-check-label" style={{ userSelect: "none" }} htmlFor="answers[0].isCorrect">
                              <input className="form-check-input" type="checkbox" name="isCorrect" id="answers[0].isCorrect" defaultChecked={data.answers[0].isCorrect} onChange={handleAnswerChange(0)} onBlur={() => { validator.current.showMessageFor('isCorrect-0'); forceUpdate(update + 1) }} />
                              is Valid ?
                            </label> */}
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={data.answers[0].isCorrect}
                              onChange={handleAnswerChange(0)}
                              onBlur={() => {
                                validator.current.showMessageFor("isCorrect-0");
                                forceUpdate(update + 1);
                              }}
                              color="primary"
                              id="answers[0].isCorrect"
                              name="isCorrect"
                              inputProps={{
                                "aria-label": "secondary checkbox",
                              }}
                            />
                          }
                          label="Correct"
                        />
                      </div>
                      {validator.current.message(
                        "isCorrect-0",
                        data.answers[0].isCorrect,
                        "required"
                      )}
                    </div>
                  </div>
                </div>

                {data.answers.map((a, value, arr) => {
                  if (value === 0) return null;
                  return (
                    <div className="row" key={value}>
                      <div className="col-md-8">
                        <div className="mb-3">
                          <input
                            type="text"
                            className="form-control"
                            name="text"
                            id={`answers[${value}].text`}
                            placeholder="Answer"
                            value={data.answers[value].text}
                            onChange={handleAnswerChange(value)}
                            onBlur={() => {
                              validator.current.showMessageFor(
                                `answer-${value}`
                              );
                              forceUpdate(update + 1);
                            }}
                          />
                          {validator.current.message(
                            `answer-${value}`,
                            data.answers[value].text,
                            "required"
                          )}
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className="mb-3">
                          <div className="form-check form-check-primary mb-3">
                            {/* <input className="form-check-input" type="checkbox" name="isCorrect" id={`answers[${value}].isCorrect`} defaultChecked={data.answers[value].isCorrect} onChange={handleAnswerChange(value)} onBlur={() => { validator.current.showMessageFor(`isTrue-${value}`); forceUpdate(update + 1) }} />
                              <label className="form-check-label" style={{ userSelect: "none" }} htmlFor={`answers[${value}].isCorrect`}>
                                is Valid ?
                              </label> */}
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={data.answers[value].isCorrect}
                                  onChange={handleAnswerChange(value)}
                                  onBlur={() => {
                                    validator.current.showMessageFor(
                                      `isCorrect-${value}`
                                    );
                                    forceUpdate(update + 1);
                                  }}
                                  color="primary"
                                  id={`answers[${value}].isCorrect`}
                                  name="isCorrect"
                                  inputProps={{
                                    "aria-label": "secondary checkbox",
                                  }}
                                />
                              }
                              label="Correct"
                            />
                          </div>
                          {validator.current.message(
                            `isCorrect-${value}`,
                            data.answers[value].isCorrect,
                            "required"
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    value={data.description}
                    onChange={handleChange}
                    onBlur={() => {
                      validator.current.showMessageFor("description");
                      forceUpdate(update + 1);
                    }}
                  />
                  {validator.current.message(
                    "description",
                    data.description,
                    "required|min:1"
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="course" className="form-label">
                    Course
                  </label>
                  <select
                    value={data.course}
                    id="course"
                    className="form-select"
                    onChange={handleChange}
                    onBlur={() => {
                      validator.current.showMessageFor("course");
                      forceUpdate(update + 1);
                    }}
                  >
                    <option value="">Choose</option>
                    {/* {courses && courses.length > 0 ? courses.map(c => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        )): <option value="">Loading</option> } */}
                    {!courses ? <option value="">Loading</option> : courses}
                  </select>
                  {validator.current.message(
                    "course",
                    data.course,
                    "required|min:1"
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="data-status" className="form-label">
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
                    <option value={"Inactive"}>Inactive</option>
                  </select>
                  {validator.current.message(
                    "status",
                    data.status,
                    "required|in:Active,Inactive"
                  )}
                </div>
                <div>
                  <button type="submit" className="btn btn-primary w-md">
                    Submit
                  </button>
                  <Link
                    to={`/${match.path.split("/")[1]}`}
                    className="btn btn-primary w-md m-2"
                  >
                    {" "}
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
            {/* end card body */}
          </div>
        </div>
      </div>
      {/* end row */}
    </div>
  );
};

export default AddEdit;
