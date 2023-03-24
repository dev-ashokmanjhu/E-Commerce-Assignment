import { Link } from "react-router-dom";
import classes from "./PaymentSuccess.module.css";
const PaymentSuccess = () => {
  return (
    <div className={classes.container}>
      <div class={classes.card}>
        <div
          style={{
            borderRadius: "200px",
            height: "200px",
            width: "200px",
            background: "#F8FAF5",
            margin: "0 auto",
          }}
        >
          <i class="checkmark">✓</i>
        </div>
        <h1 className={classes.heading}>Success</h1>
        <p className={classes.paragraph}>
          We received your purchase request;
          <br /> we'll be in touch shortly!
        </p>
        <Link to="/">
          <button className={classes.btn}>Continue Shopping</button>
        </Link>
      </div>
    </div>
  );
};
export default PaymentSuccess;
