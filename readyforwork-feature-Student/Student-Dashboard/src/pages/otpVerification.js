import React, { useState, useRef } from 'react';
import { Redirect } from 'react-router-dom';
// import API from '../api';
import { 
  // logout, 
  Validator, validationConfig } from '../utils';
import OtpInput from '../components/OtpInput/index';

const OtpVerification = (props) => {
  const validator = useRef(new Validator(validationConfig));
  const [update, forceUpdate] = useState(1);
  const [email] = useState((props.history.location.state && props.history.location.state.email) ? props.history.location.state.email : null);
  const [otp, setOtp] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validator.current.allValid()) {
      validator.current.showMessages();
      return forceUpdate(update + 1);
    }
    let payload = {
      email: email,
      token: otp
    }
    console.log("TODO: api call with data", payload);
    // API.post('/resetPassword', payload).then((res) => {
    //   alert(res.data.message);
    //   if (res.status === 200) {
    //     logout().then(() => {
    //       props.history.push('/login');
    //     });
    //   }
    // }).catch((err) => {
    //   alert(err);
    //   console.log(err);
    // })
  }

  return !email ? <Redirect to="/" /> : <div className="account-pages my-5 pt-sm-5">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="text-center mb-5 text-muted">
            <a href="/" className="d-block auth-logo">
              <img src="assets/images/logo-dark.png" alt="Logo dark" height={20} className="auth-logo-dark mx-auto" />
              <img src="assets/images/logo-light.png" alt="Logo light" height={20} className="auth-logo-light mx-auto" />
            </a>
            {/* <p className="mt-3">Responsive Bootstrap 5 Admin Dashboard</p> */}
          </div>
        </div>
      </div>
      {/* end row */}
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6 col-xl-5">
          <div className="card">
            <div className="card-body">
              <div className="p-2">
                <div className="text-center">
                  <div className="avatar-md mx-auto">
                    <div className="avatar-title rounded-circle bg-light">
                      <i className="bx bxs-envelope h1 mb-0 text-primary" />
                    </div>
                  </div>
                  <div className="p-2 mt-4">
                    <h4>Verify your email</h4>
                    <p className="mb-5">Please enter the 6 digit code sent to <span className="font-weight-semibold">{email}</span></p>
                    <form onSubmit={handleSubmit}>
                      <OtpInput
                        autoFocus
                        isNumberInput
                        length={6}
                        className="row"
                        inputClassName="form-control form-control-lg text-center"
                        onChangeOTP={setOtp}
                      />
                      {validator.current.message('otp', otp, 'required|min:6|max:6')}
                      <div className="mt-4">
                        <button type="submit" className="btn btn-success w-md">Confirm</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 text-center">

            <p>© 2021 Ready for work <i className="mdi mdi-heart text-danger" /> </p>
          </div>
        </div>
      </div>
    </div>
  </div>

}

export default OtpVerification;