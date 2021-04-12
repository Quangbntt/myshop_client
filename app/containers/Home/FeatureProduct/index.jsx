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
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as style from "components/Variables";
import ServiceBase from "utils/ServiceBase";
import Ui from "utils/Ui";

let time;
const FeatureProduct = memo(({ className }) => {
  const [loading, setLoading] = useState(false);
  const [totalLength, setTotalLength] = useState(false);
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
      url: "/product/feature",
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
      <div className="featured-product product">
        <div className="container-fluid">
          <div className="section-header">
            <h1>Sản phẩm nổi bật</h1>
          </div>
          <Slider
            {...settings}
            className="row align-items-center product-slider product-slider-4"
          >
            {_.map(data, (item, key) => {
              var url = "chi-tiet-" + item.product_id + "/" + item.product_name;
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
                    </div>
                  </div>
                  <div className="product-image">
                    <a href="/chi-tiet">
                      <img src={item.product_image} alt={item.product_name} />
                    </a>
                    <div className="product-action">
                      <a href="/chi-tiet">
                        <i className="fa fa-cart-plus" />
                      </a>
                      <a href={url}>
                        <i className="fas fa-eye" />
                      </a>
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

            {/* <div className="product-item">
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
            <div className="product-item"> */}
            {/* <div className="product-title">
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
            </div> */}
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
