import Product from "./Product/Product";
import classes from "./Products.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import Loader from "../UI/Loader";
import CarsoulSlider from "../Layout/CarsoulSlider";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoding, setIsLoding] = useState(true);
  // states for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  // calling a external api for getting data with axios
  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((response) => {
        setProducts(response.data.products);
        setIsLoding(false);
      })
      .catch((err) => console.log(err));
  }, []);

  // Get products page index of first and last product
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProduct = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const lastPage = products.length / productsPerPage;

  const paginate = (pageNumber) => {
    if (pageNumber < 1) {
      return setCurrentPage(3);
    }
    if (pageNumber > lastPage) {
      return setCurrentPage(1);
    }
    setCurrentPage(pageNumber);
  };
  // map over filterd products for pagination
  const productList = currentProduct.map((product) => (
    <Product
      key={product.id}
      id={product.id}
      name={product.title}
      description={product.description}
      price={product.price}
      img={product.thumbnail}
    />
  ));
  if (isLoding) {
    return <Loader />;
  }
  console.log(products[0].thumbnail);
  return (
    <section className={classes.products}>
      <CarsoulSlider
        product1="https://images.hindustantimes.com/tech/img/2021/06/10/960x540/image_-_2021-06-10T151159.571_1623318123184_1623318130362.jpg"
        product2="https://www.91-cdn.com/hub/wp-content/uploads/2022/11/android-phones-antutu-oct22.png"
      />
      <ul>{productList}</ul>
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={products.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </section>
  );
};

export default Products;
