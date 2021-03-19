import React, {
  memo,
  useState,
  useEffect,
  useMemo,
  Component,
  useCallback,
} from "react";
import {
  Table,
  Badge,
  Menu,
  Dropdown,
  Space,
  Button,
  Input,
  Spin,
  Rate,
} from "antd";
import classNames from "classnames";
import moment from "moment";
import _ from "lodash";
import styled from "styled-components";
import * as style from "components/Variables";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import ServiceBase from "utils/ServiceBase";
import "slick-carousel/slick/slick-theme.css";
import Product6 from "images/product-6.jpg";
import Product7 from "images/product-7.jpg";
import Product8 from "images/product-8.jpg";
import Product9 from "images/product-9.jpg";
import Product10 from "images/product-10.jpg";

let time = null;
const RecentProduct = memo(({ className }) => {
  const [loading, setLoading] = useState(false);
  const [totalLength, setTotalLength] = useState(0);
  const [data, setData] = useState([]);
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
    autoplaySpeed: 6000,
    pauseOnHover: true,
  };
  const boweload = useCallback(async () => {
    setLoading(true);
    let result = await ServiceBase.requestJson({
      url: "/product/recent",
      method: "GET",
      data: {},
      // data: "",
    });
    if (result.hasErrors) {
      Ui.showErrors(result.errors);
      setLoading(false);
    } else {
      setLoading(false);
      setTotalLength(_.get(result, "value.length"));
      let i = 0;
      let arrData = _.map(_.get(result, "value.data"), (item, index) => {
        item.key = i++;
        return item;
      });
      setData(arrData);
    }
  }, []);
  useEffect(() => {
    clearTimeout(time);
    time = setTimeout(boweload, 800);
  }, [boweload]);
  return (
    <div
      className={classNames({
        [className]: true,
      })}
    >
      <div className="newsletter">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <h1>Đăng ký nhận tin mới</h1>
            </div>
            <div className="col-md-6">
              <div className="form">
                <input type="email" value="Email" />
                <button>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="recent-product product">
        <div className="container-fluid">
          <div className="section-header">
            <h1>Sản phẩm mới</h1>
          </div>
          <Slider
            {...settings}
            className="row align-items-center product-slider product-slider-4"
          >
            {_.map(data, (item, key) => {
              return (
                <div className="product-item" key={key}>
                  <div className="product-title">
                    <a href="/chi-tiet">{item.product_name}</a>
                    <div className="ratting">
                      <Rate
                        allowHalf
                        defaultValue={item.product_rate}
                        disabled={true}
                      />
                      {/* <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" /> */}
                    </div>
                  </div>
                  <div className="product-image">
                    <a href="product-detail.html">
                      <img src={item.product_image} alt="Product Image" />
                    </a>
                    <div className="product-action">
                      <a href="#">
                        <i className="fa fa-cart-plus" />
                      </a>
                      <a href="#">
                        <i className="fas fa-eye" />
                      </a>
                      {/* <a href="#">
                          <i className="fa fa-heart" />
                        </a>
                        <a href="#">
                          <i className="fa fa-search" />
                        </a> */}
                    </div>
                  </div>
                  <div className="product-price">
                    <h3>
                      {item.product_price.toLocaleString()}
                      <span>vnđ</span>
                    </h3>
                    <a className="btn" href="">
                      <i className="fa fa-shopping-cart" />
                      Buy Now
                    </a>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
});

export default styled(RecentProduct)`
  .product-item {
    padding: 0px 15px;
  }
`;
