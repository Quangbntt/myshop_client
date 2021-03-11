import React, { memo, useState, useEffect, useMemo, Component } from "react";
import { Table, Badge, Menu, Dropdown, Space, Button, Input, Spin } from "antd";
import classNames from "classnames";
import moment from "moment";
import _ from "lodash";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as style from "components/Variables";
import Product1 from "images/product-1.jpg";
import Product2 from "images/product-2.jpg";
import Product3 from "images/product-3.jpg";
import Product4 from "images/product-4.jpg";
import Product5 from "images/product-5.jpg";

const FeatureProduct = memo(({ className, setParams, data, params }) => {
  var isMobile = {
    Android: function() {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
      return (
        navigator.userAgent.match(/IEMobile/i) ||
        navigator.userAgent.match(/WPDesktop/i)
      );
    },
    any: function() {
      return (
        isMobile.Android() ||
        isMobile.BlackBerry() ||
        isMobile.iOS() ||
        isMobile.Opera() ||
        isMobile.Windows()
      );
    },
  };
  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: isMobile.any() ? 1 : 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };
  return (
    <div
      className={classNames({
        [className]: true,
      })}
    >
      <div className="featured-product product">
        <div className="container-fluid">
          <div className="section-header">
            <h1>Featured Product</h1>
          </div>
          <Slider
            {...settings}
            className="row align-items-center product-slider product-slider-4"
          >
            <div className="product-item">
              <div className="product-title">
                <a href="#">Product Name</a>
                <div className="ratting">
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                </div>
              </div>
              <div className="product-image">
                <a href="product-detail.html">
                  <img src={Product1} alt="Product Image" />
                </a>
                <div className="product-action">
                  <a href="#">
                    <i className="fa fa-cart-plus" />
                  </a>
                  <a href="#">
                    <i className="fa fa-heart" />
                  </a>
                  <a href="#">
                    <i className="fa fa-search" />
                  </a>
                </div>
              </div>
              <div className="product-price">
                <h3>
                  <span>$</span>99
                </h3>
                <a className="btn" href="">
                  <i className="fa fa-shopping-cart" />
                  Buy Now
                </a>
              </div>
            </div>
            <div className="product-item">
              <div className="product-title">
                <a href="#">Product Name</a>
                <div className="ratting">
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                </div>
              </div>
              <div className="product-image">
                <a href="product-detail.html">
                  <img src={Product2} alt="Product Image" />
                </a>
                <div className="product-action">
                  <a href="#">
                    <i className="fa fa-cart-plus" />
                  </a>
                  <a href="#">
                    <i className="fa fa-heart" />
                  </a>
                  <a href="#">
                    <i className="fa fa-search" />
                  </a>
                </div>
              </div>
              <div className="product-price">
                <h3>
                  <span>$</span>99
                </h3>
                <a className="btn" href="">
                  <i className="fa fa-shopping-cart" />
                  Buy Now
                </a>
              </div>
            </div>
            <div className="product-item">
              <div className="product-title">
                <a href="#">Product Name</a>
                <div className="ratting">
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                </div>
              </div>
              <div className="product-image">
                <a href="product-detail.html">
                  <img src={Product3} alt="Product Image" />
                </a>
                <div className="product-action">
                  <a href="#">
                    <i className="fa fa-cart-plus" />
                  </a>
                  <a href="#">
                    <i className="fa fa-heart" />
                  </a>
                  <a href="#">
                    <i className="fa fa-search" />
                  </a>
                </div>
              </div>
              <div className="product-price">
                <h3>
                  <span>$</span>99
                </h3>
                <a className="btn" href="">
                  <i className="fa fa-shopping-cart" />
                  Buy Now
                </a>
              </div>
            </div>
            <div className="product-item">
              <div className="product-title">
                <a href="#">Product Name</a>
                <div className="ratting">
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                </div>
              </div>
              <div className="product-image">
                <a href="product-detail.html">
                  <img src={Product4} alt="Product Image" />
                </a>
                <div className="product-action">
                  <a href="#">
                    <i className="fa fa-cart-plus" />
                  </a>
                  <a href="#">
                    <i className="fa fa-heart" />
                  </a>
                  <a href="#">
                    <i className="fa fa-search" />
                  </a>
                </div>
              </div>
              <div className="product-price">
                <h3>
                  <span>$</span>99
                </h3>
                <a className="btn" href="">
                  <i className="fa fa-shopping-cart" />
                  Buy Now
                </a>
              </div>
            </div>
            <div className="product-item">
              <div className="product-title">
                <a href="#">Product Name</a>
                <div className="ratting">
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                </div>
              </div>
              <div className="product-image">
                <a href="product-detail.html">
                  <img src={Product5} alt="Product Image" />
                </a>
                <div className="product-action">
                  <a href="#">
                    <i className="fa fa-cart-plus" />
                  </a>
                  <a href="#">
                    <i className="fa fa-heart" />
                  </a>
                  <a href="#">
                    <i className="fa fa-search" />
                  </a>
                </div>
              </div>
              <div className="product-price">
                <h3>
                  <span>$</span>99
                </h3>
                <a className="btn" href="">
                  <i className="fa fa-shopping-cart" />
                  Buy Now
                </a>
              </div>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
});

export default styled(FeatureProduct)`
  .product-item {
    padding: 0px 15px;
  }
  .featured-product {
    position: relative;
    padding: 30px 0;
  }
`;
