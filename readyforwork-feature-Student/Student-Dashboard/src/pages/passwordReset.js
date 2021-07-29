import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';
import { Validator, validationConfig, useQuery } from '../utils';
import InputPassword from '../components/InputPassword';
import Backdrop from '../components/Backdrop';
import { useDispatch } from "react-redux";
import { successAlert, errorAlert } from '../Stores/Alerts/actions';
import NotFound from './notFound';

const initialState = { password: "", confirmPassword: "" };
const ForgotPassword = (props) => {
  const query = useQuery();
  const validator = useRef(new Validator(validationConfig));
  const [update, forceUpdate] = useState(1);
  const [state, setState] = useState(initialState);

  const [loading, setLoading] = useState(true);
  const [validity, setValidity] = useState(false);

  const getValidityStatus = () => {
    API.get(`/verifyToken/${query.get('id')}`).then((res) => {
      setValidity(res.status === 200 ? true : false);
      setLoading(false)
    }).catch((err) => {
      setValidity(false);
      setLoading(false);
    })
  }

  useEffect(getValidityStatus, [query]);

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
      userId: query.get("id"),
      token: query.get("token"),
      password: state.password,
    };

    API.post('/resetPassword', payload).then((res) => {
      dispatch(successAlert(res.data.message));
      props.history.push('/');
      return;
    }).catch(function (err) {
      dispatch(errorAlert(err.response.data.message));
      console.log(err);
    });
  }
  
  if(loading) {
    return <Backdrop />;
  }

  if (!loading && validity === false) {
    return <NotFound />;
  }

  validator.current.purgeFields();
  return (
    <div className="account-pages my-5 pt-sm-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-5">
            <div className="card overflow-hidden">
              <div className="card-body pt-0">
                <div>
                  <div className="text-center">
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
                    Insert your new password.
                  </div>
                  <form
                    className="form-horizontal"
                    action="index.html"
                    onSubmit={handleSubmit}
                  >
                    <div className="mb-3">
                      <InputPassword
                        label="New Password"
                        className="form-control"
                        id="password"
                        placeholder="Enter New password"
                        onBlur={() => {
                          validator.current.showMessageFor("password");
                          forceUpdate(update + 1);
                        }}
                        value={state.email}
                        onChange={handleChange}
                      />
                      {validator.current.message(
                        "password",
                        state.password,
                        "required|min:4"
                      )}
                    </div>
                    <div className="mb-3">
                      <InputPassword
                        label="Confirm New Password"
                        className="form-control"
                        id="confirmPassword"
                        placeholder="Confirm New password"
                        onBlur={() => {
                          validator.current.showMessageFor("confirmPassword");
                          forceUpdate(update + 1);
                        }}
                        value={state.email}
                        onChange={handleChange}
                      />
                      {validator.current.message(
                        "confirmPassword",
                        state.confirmPassword,
                        `required|min:4|in:${state.password}`,
                        { messages: { in: "Passwords need to match!" } }
                      )}
                    </div>
                    <div className="text-end">
                      <button
                        className="btn  w-md waves-effect waves-light"
                        style={{ backgroundColor: "#81BFA2" }}
                        type="submit"
                      >
                        Reset
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="mt-5 text-center">
              <p>
                Remember It ?{" "}
                <Link to="/login" className="fw-medium text-muted">
                  {" "}
                  Sign In here
                </Link>{" "}
              </p>
              <p>
                © 2021 Ready for work.{" "}
                <i className="mdi mdi-heart text-danger" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
