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
import Ui from "utils/Ui";

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
              <h1>????ng k?? nh???n tin m???i</h1>
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
            <h1>S???n ph???m m???i</h1>
          </div>
          <Slider
            {...settings}
            className="row align-items-center product-slider product-slider-4"
          >
            {_.map(data, (item, key) => {
              var url = "/chi-tiet-" + item.product_id + "/" + item.product_name;
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
                    <a href="product-detail.html">
                      <img src={item.product_image} alt="Product Image" />
                    </a>
                    <div className="product-action">
                      {/* <a href="#">
                        <i className="fa fa-cart-plus" />
                      </a> */}
                      <a href={url}>
                        <i className="fas fa-eye" />
                      </a>
                    </div>
                  </div>
                  <div className="product-price">
                    <h3>
                      {item.product_price.toLocaleString()}
                      <span>vn??</span>
                    </h3>
                    <a className="btn" href={url}>
                      <i className="fa fa-shopping-cart" />
                      Mua ngay
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
