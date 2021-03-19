import React, {
  memo,
  useState,
  useEffect,
  useMemo,
  Component,
  useCallback,
} from "react";
import { Table, Badge, Menu, Dropdown, Space, Button, Input, Spin, Rate } from "antd";
import classNames from "classnames";
import moment from "moment";
import _ from "lodash";
import styled from "styled-components";
import * as style from "components/Variables";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ServiceBase from "utils/ServiceBase";
import Review1 from "images/review-1.jpg";
import Review2 from "images/review-2.jpg";
import Review3 from "images/review-3.jpg";

let time = null;
const Feedback = memo(({ className }) => {
  const [totalLength, setTotalLength] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
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
  const boweload = useCallback(async () => {
    setLoading(true);
    let result = await ServiceBase.requestJson({
      url: "/feedback/all",
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
      <div className="review">
        <div className="container-fluid">
          <Slider
            {...settings}
            className="row align-items-center review-slider normal-slider"
          >
            {_.map(data, (item, key) => {
              return (
                <div className="review-slider-item" key={key}>
                  <div className="review-img">
                    <img src={item.user_image} alt="Avarta" />
                  </div>
                  <div className="review-text col-lg-8">
                    <h2>{item.name}</h2>
                    <h3>{item.address}</h3>
                    <div className="ratting">
                      <Rate allowHalf defaultValue={item.feedback_rate} disabled={true} />
                      {/* <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star" /> */}
                    </div>
                    <p>{item.feedback_comment}</p>
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

export default styled(Feedback)`
  .review-slider-item {
    display: flex !important;
    width: 96% !important;
    padding: 0px 14px;
    margin-left: 15px;
  }
`;
