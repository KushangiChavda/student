import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import API from "../api";
import { Validator, validationConfig } from "../utils";
import { useDispatch } from "react-redux";
import { successAlert, errorAlert } from "../Stores/Alerts/actions";

const initialState = { email: "", password: "", confirmPassword: "" };
const CLIENT_URL = process.env.REACT_APP_CLIENT_URL;

const ForgotPassword = (props) => {
  const validator = useRef(new Validator(validationConfig));
  const [update, forceUpdate] = useState(1);
  const [state, setState] = useState(initialState);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validator.current.allValid()) {
      validator.current.showMessages();
      return forceUpdate(update + 1);
    }
    let payload = {
      email: state.email,
      clientURL: CLIENT_URL,
    };

    API.post("/forgotPassword", payload)
      .then((res) => {
        dispatch(successAlert(res.data.message));
        props.history.push("/login");
        return;
      })
      .catch((err) => {
        dispatch(errorAlert(err.response.data.message));
        console.log(err);
      });
  };

  // const handleReset = (e) => {
  //   e.preventDefault();
  //   console.log("validator.current", validator.current)
  //   setState(initialState);
  //   props.history.goBack();
  // }

  validator.current.purgeFields();
  return (
    <div className="account-pages my-5 pt-sm-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-5">
            <div className="card overflow-hidden">
              <div className="card-body pt-0">
                <div>
                  <div className="text-center ">
                    <span>
                      <img
                        src="assets/images/readyforwork-logo.png"
                        alt="Logo"
                        style={{ width: "10rem" }}
                      />
                    </span>
                  </div>
                </div>
                <div className="p-2">
                  <div
                    className="alert alert-success text-center mb-4"
                    role="alert"
                  >
                    Enter your Email and instructions will be sent to you!
                  </div>
                  <form
                    className="form-horizontal"
                    action="index.html"
                    onSubmit={handleSubmit}
                    // onReset={handleReset}
                  >
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter email"
                        onBlur={() => {
                          validator.current.showMessageFor("email");
                          forceUpdate(update + 1);
                        }}
                        value={state.email}
                        onChange={handleChange}
                      />
                      {validator.current.message(
                        "email",
                        state.email,
                        "required|email"
                      )}
                    </div>
                    <div className="text-center">
                      <button
                        className="btn w-md waves-effect waves-light m-1"
                        style={{ backgroundColor: "#81BFA2" }}
                        type="submit"
                      >
                        Submit
                      </button>
                      {/* <button
                        className="btn w-md waves-effect waves-light m-1"
                        style={{ backgroundColor: "#81BFA2" }}
                        type="reset"
                      >
                        Cancel
                      </button> */}
                    </div>
                    <div className="mt-4 text-center">
                        Remember It ?{" "}
                        <Link to="/login" className="fw-medium text-muted">
                          Sign In here
                        </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="mt-5 text-center">
              {/* <p>
                Remember It ?{" "}
                <Link to="/login" className="fw-medium text-muted">
                  {" "}
                  Sign In here
                </Link>{" "}
              </p> */}
              <p>© 2019-2021 Readyforwork | All Rights Reserved</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
