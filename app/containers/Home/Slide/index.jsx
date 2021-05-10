import React, {
  memo,
  useState,
  useEffect,
  useMemo,
  Component,
  useCallback,
} from "react";
import { Table, Badge, Menu, Dropdown, Space, Button, Input, Spin } from "antd";
import classNames from "classnames";
import moment from "moment";
import _ from "lodash";
import styled from "styled-components";
import * as style from "components/Variables";
import ServiceBase from "utils/ServiceBase";
import Slider from "react-slick";
import Ui from "utils/Ui";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Carousel } from "react-bootstrap";

let time = null;
const Slide = memo(({ className }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
    pauseOnHover: true,
  };
  const boweload = useCallback(async () => {
    setLoading(true);

    let result = await ServiceBase.requestJson({
      url: "/product/slide",
      method: "GET",
      data: {},
    });
    if (result.hasErrors) {
      Ui.showErrors(result.errors);
      setLoading(false);
    } else {
      setLoading(false);
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
      <Slider
        {...settings}
        className="row align-items-center review-slider normal-slider header-slider"
      >
        {_.map(data, (item, key) => {
          var url = "/chi-tiet-" + item.product_id + "/" + item.product_name;
          return (
            <div className="header-slider-item" key={key}>
              <img
                className="slide-image d-block w-100"
                src={item.product_image}
                alt={item.product_name}
              />
              <div className="header-slider-caption">
                <p>{item.product_name}</p>
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
  );
});

export default styled(Slide)`
  .header-slider-caption.a {
    background: rgba(255, 111, 97, 0.7);
  }
  .slide-image {
    height: 400px !important;
  }
  
`;
