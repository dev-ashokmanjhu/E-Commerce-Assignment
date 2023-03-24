import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Cart from "./Cart/Cart";
import { Provider, useDispatch } from "react-redux";
import store from "./store/store";
import Header from "./Layout/Header";
import Login from "./AuthPages/login";
import Register from "./AuthPages/Register";
import { useEffect } from "react";
import { authActions } from "./store/authSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PaymentSuccess from "./UI/PaymentSuccess";

const Root = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(authActions.logIn());
    }
  });
  return (
    <>
      <Header />
      <Outlet />
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/paymentsuccess",
        element: <PaymentSuccess />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
