import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, "Must be greater than 6")
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values, actios) => {
      actios.resetForm();
      dispatch(authActions.logIn());
      navigate("/");
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
              Log In
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
