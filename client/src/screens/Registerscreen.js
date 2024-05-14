import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../actions/userActions";
import Loading from "../components/Loading";
import Success from "../components/Success";
import Error from "../components/Error";

export default function () {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const registerstate = useSelector((state) => state.registerUserReducer);
  const { error, loading, success } = registerstate;

  const dispatch = useDispatch();

  function register() {
    if (password != cpassword) {
      alert("Passwords do not match");
    } else {
      const user = {
        name,
        email,
        password,
      };
      console.log(user);
      dispatch(registerUser(user));
    }
  }

  return (
    <div>
      <div className="row justify-content-center mt-5">
        <div
          className="col-md-5 mt-5 shadow-lg p-3 mb-5 bg-body-tertiary rounded"
          style={{ textAlign: "left" }}
        >
          {loading && <Loading />}
          {success && <Success success="User registered successfully" />}
          {error && <Error error="Email already registered" />}

          <h2 className="text-center m-3" style={{ fontSize: "35px" }}>
            Register
          </h2>
          <div>
            <input
              required
              type="text"
              placeholder="name"
              className="form-control"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
            <input
              required
              type="text"
              placeholder="email"
              className="form-control"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            <input
              type="text"
              placeholder="password"
              className="form-control"
              value={password}
              required
              onChange={(e) => setpassword(e.target.value)}
            />
            <input
              type="text"
              placeholder="confirm password"
              className="form-control"
              value={cpassword}
              required
              onChange={(e) => setcpassword(e.target.value)}
            />
            <button onClick={register} className="btn mt-3 mb-3">
              REGISTER
            </button>
            <br />
            <a style={{ color: "black" }} href="/login">
              Click here to Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
