import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { brightStarLogin } from "../API/index";
import { toast } from "react-toastify";

const Login = () => {
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginDetails({ ...loginDetails, [name]: value });
  };

  const onSignIn = async () => {
    await brightStarLogin(loginDetails)
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("accessToken", res?.data?.access_token);
          localStorage.setItem("role_id", 3);
          navigate("/projects");
        }
      })
      .catch((err) => console.log("error", err));
  };

  return (
    <div className="auth-form">
      <form>
        <div className="form-outline mb-3">
          <label className="form-label" for="form2Example1">
            Email address
          </label>
          <input
            onChange={(e) => onChange(e)}
            type="email"
            name="email"
            id="form2Example1"
            className="form-control"
          />
        </div>

        <div className="form-outline mb-3">
          <label className="form-label" for="form2Example2">
            Password
          </label>
          <input
            onChange={(e) => onChange(e)}
            type="password"
            name="password"
            id="form2Example2"
            className="form-control"
          />
        </div>
        <div className="form-check">
          <div className="">
            <a href="#!">Forgot password?</a>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary submit-btn"
          onClick={onSignIn}
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
