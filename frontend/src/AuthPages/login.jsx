import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";
import axios from "axios";
import { msg } from "../Utils/alert";
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
        .post("https://e-commerce-backend-two-neon.vercel.app/login", values)
        .then((res) => {
          console.log(res);
          localStorage.setItem("token", res.data.token);
          msg("Login Successfully");
          dispatch(authActions.logIn());
          actios.resetForm();
          setIsLoading(false);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          // msg("err");
          msg(err?.response?.data);
          setIsLoading(false);
          return;
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
              {isLoading ? (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    className="spinner_9y7u"
                    x="1"
                    y="1"
                    rx="1"
                    width="10"
                    height="10"
                  />
                  <rect
                    class="spinner_9y7u spinner_DF2s"
                    x="1"
                    y="1"
                    rx="1"
                    width="10"
                    height="10"
                  />
                  <rect
                    class="spinner_9y7u spinner_q27e"
                    x="1"
                    y="1"
                    rx="1"
                    width="10"
                    height="10"
                  />
                </svg>
              ) : (
                "Log In"
              )}
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
