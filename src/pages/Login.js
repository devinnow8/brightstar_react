import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { brightStarLogin } from "../API/index";

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
          navigate("/home");
        }
      })
      .catch((err) => console.log("error while logging in", err));
  };

  console.log("kkkkkkkk");
  return (
    <div className="auth-form">
      <form>
        <div class="form-outline mb-3">
        <label class="form-label" for="form2Example1">
            Email address
          </label>
          <input
            onChange={(e) => onChange(e)}
            type="email"
            name="email"
            id="form2Example1"
            class="form-control"
          />
        </div>

        <div class="form-outline mb-3">
        <label class="form-label" for="form2Example2">
            Password
          </label>
          <input
            onChange={(e) => onChange(e)}
            type="password"
            name="password"
            id="form2Example2"
            class="form-control"
          />
        </div>
        <div className="form-check">
          <div>
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="form2Example31"
            />
            <label className="form-check-label" htmlFor="form2Example31">
              {" "}
              Remember me{" "}
            </label>
          </div>
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
