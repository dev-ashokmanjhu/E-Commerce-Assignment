import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import classes from "./CarsoulSlider.module.css";

function CarsoulSlider({ product1, product2 }) {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <Slider className={classes.slider} {...settings}>
      <div className={classes.wraper}>
        <img src={product2} alt="slider" />
      </div>
      <div className={classes.wraper}>
        <img src={product1} alt="slider" />
      </div>
      <div className={classes.wraper}>
        <img
          src="https://techstory.in/wp-content/uploads/2022/04/FQnlbc-WQAMLs8u.jpg"
          alt="slider"
        />
      </div>
      <div className={classes.wraper}>
        <img
          src="https://akm-img-a-in.tosshub.com/indiatoday/images/story/202105/realme_x7_max_teaser1.jpg?size=690:388"
          alt="slider"
        />
      </div>
    </Slider>
  );
}

export default CarsoulSlider;
