import React, { memo, useState, useEffect, useMemo, Component } from "react";
import { Table, Badge, Menu, Dropdown, Space, Button, Input, Spin } from "antd";
import classNames from "classnames";
import moment from "moment";
import _ from "lodash";
import styled from "styled-components";
import * as style from "components/Variables";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Review1 from "images/review-1.jpg";
import Review2 from "images/review-2.jpg";
import Review3 from "images/review-3.jpg";

const Feedback = memo(({ className, setParams, data, params }) => {
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
    slidesToShow: isMobile.any() ? 1 : 2,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  return (
    <div
      className={classNames({
        [className]: true,
      })}
    >
      <div className="review">
        <div className="container-fluid">
          <Slider
            {...settings}
            className="row align-items-center review-slider normal-slider"
          >
            <div className="review-slider-item">
              <div className="review-img">
                <img src={Review1} alt="Image" />
              </div>
              <div className="review-text col-lg-8">
                <h2>Customer Name</h2>
                <h3>Profession</h3>
                <div className="ratting">
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Curabitur vitae nunc eget leo finibus luctus et vitae lorem
                </p>
              </div>
            </div>
            <div className="review-slider-item">
              <div className="review-img">
                <img src={Review2} alt="Image" />
              </div>
              <div className="review-text col-lg-8">
                <h2>Customer Name</h2>
                <h3>Profession</h3>
                <div className="ratting">
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Curabitur vitae nunc eget leo finibus luctus et vitae lorem
                </p>
              </div>
            </div>
            <div className="review-slider-item">
              <div className="review-img">
                <img src={Review3} alt="Image" />
              </div>
              <div className="review-text col-lg-8">
                <h2>Customer Name</h2>
                <h3>Profession</h3>
                <div className="ratting">
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Curabitur vitae nunc eget leo finibus luctus et vitae lorem
                </p>
              </div>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
});

export default styled(Feedback)`
  .review-slider-item {
    display: flex !important;
    width: 96% !important;
    padding: 0px 14px;
    margin-left: 15px;
  }
`;
