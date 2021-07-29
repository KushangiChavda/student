import React, { useState, useRef } from 'react';
import { Link } from "react-router-dom";
import API from '../api';
import { login, Validator, validationConfig } from '../utils';

const Register = (props) => {
    const validator = useRef(new Validator(validationConfig));
    const [update, forceUpdate] = useState(1);
    const [state, setState] = useState({
        firstName: "", lastName: "", email: "", password: "", confirmPassword: ""
    });
    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }));
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validator.current.allValid()) {
            validator.current.showMessages();
            return forceUpdate(update + 1);
        }
        const payload = {
            "firstName": state.firstName,
            "lastName": state.lastName,
            "email": state.email,
            "password": state.password,
            "confirmPassword": state.confirmPassword,
            "role": 'customer'
        }
        API.post('/signUp', payload)
            .then(function (response) {
                login(response.data.authtoken).then(redirectToHome);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const redirectToHome = () => {
        props.history.push('/');
    }

    return <div className="account-pages my-5 pt-sm-5">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6 col-xl-5">
                    <div className="card overflow-hidden">
                        <div className="bg-primary bg-soft">
                            <div className="row">
                                <div className="col-7">
                                    <div className="text-primary p-4">
                                        <h5 className="text-primary">Free Register</h5>
                                        <p>Get your free ready for work account now.</p>
                                    </div>
                                </div>
                                <div className="col-5 align-self-end">
                                    <img src="assets/images/profile-img.png" alt="Profile" className="img-fluid" />
                                </div>
                            </div>
                        </div>
                        <div className="card-body pt-0">
                            <div>
                                <a href="/">
                                    <div className="avatar-md profile-user-wid mb-4">
                                        <span className="avatar-title rounded-circle bg-light">
                                            <img src={`${process.env.PUBLIC_URL}/assets/images/logo.svg`} alt="Logo" className="rounded-circle" height={34} />
                                        </span>
                                    </div>
                                </a>
                            </div>
                            <div className="p-2">
                                <form className="needs-validation" noValidate action="index.html" onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="firstName" className="form-label">FirstName</label>
                                        <input type="text" className="form-control" id="firstName" placeholder="Enter FirstName" required onBlur={() => { validator.current.showMessageFor('firstName'); forceUpdate(update + 1) }} value={state.firstName} onChange={handleChange} />
                                        {validator.current.message('firstName', state.firstName, 'required|min:4')}
                                        <div className="invalid-feedback">
                                            Please Enter FirstName
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="lastName" className="form-label">LastName</label>
                                        <input type="text" className="form-control" id="lastName" placeholder="Enter LastName" required onBlur={() => { validator.current.showMessageFor('lastName'); forceUpdate(update + 1) }} value={state.lastName} onChange={handleChange} />
                                        {validator.current.message('lastName', state.lastName, 'required|min:4')}
                                        <div className="invalid-feedback">
                                            Please Enter LastName
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="email" className="form-control" id="email" placeholder="Enter email" required value={state.email} onChange={handleChange} onBlur={() => { validator.current.showMessageFor('email'); forceUpdate(update + 1) }} />
                                        {validator.current.message('email', state.email, 'required|email')}
                                        <div className="invalid-feedback">
                                            Please Enter Email
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input type="password" className="form-control" id="password" placeholder="Enter password" required onBlur={() => { validator.current.showMessageFor('password'); forceUpdate(update + 1) }} value={state.password} onChange={handleChange} />
                                        {validator.current.message('password', state.password, 'required|min:4')}
                                        <div className="invalid-feedback">
                                            Please Enter Password
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                        <input type="password" className="form-control" id="confirmPassword" placeholder="Enter confirm password" required onBlur={() => { validator.current.showMessageFor('confirmPassword'); forceUpdate(update + 1) }} value={state.confirmPassword} onChange={handleChange} />
                                        {validator.current.message('confirmPassword', state.confirmPassword, `required|min:4|in:${state.password}`, { messages: { in: 'Passwords need to match!' } })}
                                        <div className="invalid-feedback">
                                            Please Enter Confirm Password
                                        </div>
                                    </div>
                                    <div className="mt-4 d-grid">
                                        <button className="btn btn-primary waves-effect waves-light" type="submit">Register</button>
                                    </div>
                                    <div className="mt-4 text-center">
                                        <h5 className="font-size-14 mb-3">Sign up using</h5>
                                        <ul className="list-inline">
                                            <li className="list-inline-item">
                                                <a href="#0" className="social-list-item bg-primary text-white border-primary">
                                                    <i className="mdi mdi-facebook" />
                                                </a>
                                            </li>
                                            <li className="list-inline-item">
                                                <a href="#0" className="social-list-item bg-info text-white border-info">
                                                    <i className="mdi mdi-twitter" />
                                                </a>
                                            </li>
                                            <li className="list-inline-item">
                                                <a href="#0" className="social-list-item bg-danger text-white border-danger">
                                                    <i className="mdi mdi-google" />
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="mt-4 text-center">
                                        <p className="mb-0">By registering you agree to the Ready for work <a href="#0" className="text-primary">Terms of Use</a></p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 text-center">
                        <div>
                            <p>Already have an account ? <Link to="/login" className="fw-medium text-primary"> Login</Link> </p>
                            <p>© 2021 Ready for work <i className="mdi mdi-heart text-danger" /></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

}

export default Register;