import React from "react";
import "./paymentfail.css";
import paymentfailImg from "../assets/7514766.jpg";
import { Link } from "react-router-dom";
const PaymentFail = () => {
  return (
    <div className="container">
      <div className="content">
        <img
          className="paymentfailImg"
          src={paymentfailImg}
          alt="payment fail"
        />
        <div>Oops! Something went wrong ,Please Try After Some Time</div>
        <Link to="/">
          <button className="payment-btn">Go To Home</button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentFail;
