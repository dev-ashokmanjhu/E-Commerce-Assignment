import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";
import axios from "axios";
const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    validationSchema: Yup.object({
      password: Yup.string(),
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values, actios) => {
      setIsLoading(true);
      const res = axios
        .post("https://mern-login-signup-backend.vercel.app/login", values)
        .then((res) => {
          alert("Login Success");
          localStorage.setItem("token", res.data.token);
          dispatch(authActions.logIn());
          navigate("/");
          actios.resetForm();
          setIsLoading(false);
        })
        .catch((err) => {
          alert(err.response.data.message);
          setIsLoading(false);
        });
    },
  });
  return (
    <div className="loginContainer">
      <div className="loginBox">
        <h1 className="heading">Login</h1>
        <form className="form" onSubmit={formik.handleSubmit}>
          <div>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder="E-mail"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="errorMessage">{formik.errors.email}</div>
            ) : null}
          </div>
          <div>
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              placeholder="Password"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="errorMessage">{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="bottom_text">
            <div className="remember">
              <input type="checkbox" name="checkbox" id="checkbox" />
              <p>Remember Me</p>
            </div>
            <div>
              <p>Forgot Password</p>
            </div>
          </div>
          <div>
            <button className="loginBtn" type="submit">
              {isLoading ? "Log In..." : "Log In"}
            </button>
          </div>
          <div className="signUpText">
            <p>Create Account</p>
            <Link to="/register" className="registerLink">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
