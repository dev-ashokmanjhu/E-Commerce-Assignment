import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/cartSlice";
import { Link, useNavigate } from "react-router-dom";

const Cart = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartRedux = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);
  // making total amount to last two decimal numbers
  const totalAmount = `$${cartRedux.totalAmount.toFixed(2)}`;
  const numberOfCartItems = cartRedux.items.reduce((curNumber, item) => {
    return curNumber + item.quantity;
  }, 0);

  //checking cart is empty or not
  const hasItems = cartRedux.items.length > 0;
  // function for removing item which get id as argument and redirect to cotext action
  const cartItemRemoveHandler = (id) => {
    dispatch(cartActions.removeFromCart(id));
  };
  const removeCartItemHandler = (id) => {
    dispatch(cartActions.removeCartItem(id));
  };
  // function for adding Item which get item as argument and redirect to addItem context action and only increase 1 quantity
  const cartItemAddHandler = (item) => {
    dispatch(cartActions.addItemToCart({ ...item, quantity: 1 }));
  };
  // function for reset Item which set state to defaultstate
  const resetItemsHandler = () => {
    dispatch(cartActions.cartReset());
  };
  const orderHandler = () => {
    if (!isAuthenticated) {
      alert("Please Login/Register First");
      navigate("/login");
    } else {
      alert("Ordered Successfully");
      dispatch(cartActions.cartReset());
      navigate("/");
    }
  };
  // get items from context and map over them to show in cart and cartItem components
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartRedux.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          quantity={item.quantity}
          price={item.price}
          img={item.image}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemoveFromCart={removeCartItemHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  // wrap it in Modal for making overlay
  return (
    <div className={classes.cartContainer}>
      {numberOfCartItems === 0 ? (
        <h1 className={classes.cartEmpty}>Cart is Empty!!</h1>
      ) : (
        cartItems
      )}
      <div className={classes.box2}>
        <div className={classes.total}>
          <span>Total Amount :</span>
          <span>{totalAmount}</span>
        </div>
        <div className={classes.actions}>
          {!(numberOfCartItems === 0) && (
            <button
              className={classes["button--alt"]}
              onClick={resetItemsHandler}
            >
              Reset
            </button>
          )}
          {numberOfCartItems === 0 && (
            <Link to="/">
              <button
                className={classes["button--alt"]}
                onClick={props.onClose}
              >
                Add Some Items
              </button>
            </Link>
          )}
          {hasItems && (
            <button className={classes.button} onClick={orderHandler}>
              Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
