import React, { useState } from 'react';

const InputPassword = ({label, ...props}) => {
  const [show, setShow] = useState(false);
  const showHidePassword = () => {
    setShow(pre => !pre);
  }

  return <>
    <label htmlFor="password" className="form-label">{label ? label : 'Password'}</label>
    <div className="input-group auth-pass-inputgroup">
      <input {...props} type={`${show ? 'text': 'password'}`} className="form-control" aria-label="Password" aria-describedby="password-addon" />
      <button className="btn btn-light" style={{border: "1px solid #ced4da", boxShadow: "none"}} type="button" id="password-addon" onClick={showHidePassword}>
        <i className={`mdi ${show ? 'mdi-eye-off-outline' : 'mdi-eye-outline'}`} />
      </button>
    </div>
  </>
}

export default InputPassword;