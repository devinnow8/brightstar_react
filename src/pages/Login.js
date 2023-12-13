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
    <div>
      <form>
        <div class="form-outline mb-4">
          <input
            onChange={(e) => onChange(e)}
            type="email"
            name="email"
            id="form2Example1"
            class="form-control"
          />
          <label class="form-label" for="form2Example1">
            Email address
          </label>
        </div>

        <div class="form-outline mb-4">
          <input
            onChange={(e) => onChange(e)}
            type="password"
            name="password"
            id="form2Example2"
            class="form-control"
          />
          <label class="form-label" for="form2Example2">
            Password
          </label>
        </div>

        <div className="row mb-4">
          <div className="col d-flex justify-content-center">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="formname2Example31"
                checked
              />
              <label className="form-check-label" htmlFor="form2Example31">
                {" "}
                Remember me{" "}
              </label>
            </div>
          </div>

          <div className="col">
            <a href="#!">Forgot password?</a>
          </div>
        </div>

        <button
          type="button"
          className="btn btn-primary btn-block mb-4"
          onClick={onSignIn}
        >
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Login;
