import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import api from "../../api";
import { successAlert, errorAlert } from "../../Stores/Alerts/actions";
import { Validator, validationConfig } from "../../utils";
import { StartPage } from "../StartPage";
const initialState = {
  title: "",
  feedback: "",
  rating: "",
};

const FeedBack = (props) => {
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
      feedback: data.feedback,
    };
    return createData(payload);
  };

  const handleChange = (e) => {
    const { id: _id, value } = e.target;
    const attrs = {
      "data-status": "status",
    };
    let id = attrs[_id] ? attrs[_id] : _id;
    setData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    return true;
  };

  const createData = (data) => {
    return api
      .post("/feedback/add", data)
      .then((res) => {
        dispatch(successAlert(res.data.message));
        return history.push(".");
      })
      .catch((err) => {
        console.log(err);
        dispatch(errorAlert(err.response.data.message));
      });
  };
  
  return (
    <div className="container-fluid">
      {/* start page title */}
      <StartPage
        contenttitle={`${!isAddMode ? `Update Feedback` : "Give Feedback"}`}
        content="Feedbacks"
        contents={!isAddMode ? "Update" : "Add"}
        backButton
      />
      {/* end page title */}
      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={data.name}
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
                <div className="mb-3">
                  <label htmlFor="feedback" className="form-label">
                    Feedback
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="feedback"
                    value={data.feedback}
                    onChange={handleChange}
                    rows={8}
                    onBlur={() => {
                      validator.current.showMessageFor("feedback");
                      forceUpdate(update + 1);
                    }}
                  />
                  {validator.current.message(
                    "feedback",
                    data.feedback,
                    "required|min:1"
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
export default FeedBack;
