import ProductForm from "./ProductForm";
import classes from "./Product.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cartSlice";

const Product = (props) => {
  const dispatch = useDispatch();
  // getting data from redux store
  const cartRedux = useSelector((state) => state.cart);
  // fixed price for two decimal numbers
  const price = `$${props.price.toFixed(2)}`;
  // function for adding item to redux store
  const productIndex = cartRedux.items.findIndex(
    (item) => item.id === props.id
  );
  const product = cartRedux.items[productIndex];
  // it get item quantity from function props and send data of props product to redux store
  const addToCartHandler = (quantity) => {
    dispatch(
      cartActions.updateCartItem({
        id: props.id,
        name: props.name,
        quantity: quantity,
        price: props.price,
        image: props.img,
      })
    );
  };

  return (
    <li className={classes.products}>
      <div>
        <img src={props.img} alt="image" />
        <h3>{props.name}</h3>
        <div className={classes.description}>
          {props.description.slice(0, 50)}...
        </div>
        <h3 className={classes.price}>{price}</h3>
      </div>
      <div>
        <ProductForm
          id={props.id}
          cartQuantity={cartRedux.items ? product?.quantity : ""}
          onAddToCart={addToCartHandler}
        />
      </div>
    </li>
  );
};

export default Product;
