import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import API from "../api";
import { login, Validator, validationConfig } from "../utils";
import InputPassword from "../components/InputPassword";
import { useDispatch } from "react-redux";
import { successAlert, errorAlert } from "../Stores/Alerts/actions";
import { login as loginAction } from "../Stores/User/actions";

const initialState = { email: "", password: "" };
const Login = (props) => {
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
    const payload = {
      email: state.email,
      password: state.password,
    };
    API.post("/login", payload)
      .then((res) => {
        let current = { authtoken: res.data.authtoken, role: res.data.role };
        if (res.data.role === "admin") {
          return login(current).then(() => (window.location.href = "/admin"));
        }
        dispatch(loginAction({ email: res.data.email, role: res.data.role }));
        login(current).then(() => {
          redirectToHome();
        });
        return dispatch(successAlert(res.data.message));
      })
      .catch(function (err) {
        console.log("Warning in login", err);
        if (err?.response?.data?.message)
          return dispatch(errorAlert(err.response.data.message));
      });
  };

  const redirectToHome = () => {
    props.history.push("/");
  };
  validator.current.purgeFields();
  return (
    <div className="account-pages my-5 pt-sm-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-5">
            <div className="card overflow-hidden">
              <div className="card-body pt-0">
                <div className="auth-logo text-center">
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/images/readyforwork-logo.png`}
                    alt="Logo"
                    style={{ width: "10rem" }}
                  />
                </div>
                <div className="p-2">
                  <form
                    className="form-horizontal"
                    action="index.html"
                    onSubmit={handleSubmit}
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
                    <div className="mb-3">
                      <InputPassword
                        label="Password"
                        id="password"
                        placeholder="Enter password"
                        onBlur={() => {
                          validator.current.showMessageFor("password");
                          forceUpdate(update + 1);
                        }}
                        value={state.password}
                        onChange={handleChange}
                      />
                      {validator.current.message(
                        "password",
                        state.password,
                        "required|min:4"
                      )}
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="remember-check"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="remember-check"
                      >
                        Remember me
                      </label>
                    </div>
                    <div className="mt-3 d-grid">
                      <button
                        className="btn  waves-effect waves-light"
                        style={{ backgroundColor: "#81BFA2" }}
                        type="submit"
                      >
                        Log In
                      </button>
                    </div>
                    <div className="mt-4 text-center">
                      <Link to="/forgotPassword" className="text-muted">
                        <i className="mdi mdi-lock me-1" /> Forgot your
                        password?
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="mt-5 text-center">
              <div>
                <p>© 2019-2021 Readyforwork | All Rights Reserved</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
