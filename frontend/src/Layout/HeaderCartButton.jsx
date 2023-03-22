import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  // state for animate button on adding or removing cart items
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  // getting redux cart data for showing totalcartitem in badge
  const cartRedux = useSelector((state) => state.cart);
  // destructureing items from redux cart
  const { items, cartIsValid } = cartRedux;
  // use reduce to get total number of cart items
  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.quantity;
  }, 0);
  // implement conditional css using teneary operator and usestate for animate button
  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;
  // using use effect for showing animation and also use setTimeout and clear it
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]); //use items as a dependency so whenever items change useEffect will run and button animate

  return (
    <Link to="/cart">
      <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}>
          <CartIcon />
        </span>
        <span>Cart</span>
        <span className={classes.badge}>{numberOfCartItems}</span>
        <br />
        {!cartIsValid && (
          <span className={classes.warning}>Limit can't exceed 20</span>
        )}
      </button>
    </Link>
  );
};

export default HeaderCartButton;
