import HeaderCartButton from "./HeaderCartButton";
import classes from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const logOutHandler = () => {
    dispatch(authActions.logOut());
    navigate("/login");
  };
  return (
    <>
      <header className={classes.header}>
        <HeaderCartButton />
        <Link to="/">
          <h1>Assignment 6</h1>
        </Link>
        {!isAuthenticated ? (
          <div className={classes.headerBtn}>
            <Link to="/login">
              <button className={classes.HeaderLoginBtn}>Login</button>
            </Link>
            <Link to="/register">
              <button className={classes.HeaderLoginBtn}>Register</button>
            </Link>
          </div>
        ) : (
          <div className={classes.headerBtn}>
            <button className={classes.HeaderLoginBtn} onClick={logOutHandler}>
              LogOut
            </button>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
