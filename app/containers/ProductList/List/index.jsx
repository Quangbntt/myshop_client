import React, { memo, useState, useEffect, useMemo, Component } from "react";
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
import MenuClassify from "components/MenuClassify";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Pagination from "components/Paginate/index";

const List = memo(
  ({
    className,
    setParams,
    data,
    params,
    setData,
    dataHot,
    setDataHot,
    totalLength,
    dataBranch,
    setDataBranch,
  }) => {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
    };
    return (
      <div
        className={classNames({
          [className]: true,
        })}
      >
        <div className="row">
          <div className="col-lg-8">
            <div className="row">
              {_.map(data, (item, key) => {
                return (
                  <div className="col-md-4" key={key}>
                    <div className="product-item">
                      <div className="product-title">
                        <a href="#">{item.product_name}</a>
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
                  </div>
                );
              })}
            </div>
            <Pagination
              params={params}
              total={totalLength}
              setParams={setParams}
            />
          </div>
          <div className="col-lg-4 sidebar">
            <div className="sidebar-widget category">
              <MenuClassify />
            </div>
            <div className="sidebar-widget widget-slider">
              <h2 className="title">Sản phẩm hot</h2>
              <Slider {...settings} className="sidebar-slider normal-slider">
                {_.map(dataHot, (item, key) => {
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
                          <img
                            src={item.product_image}
                            alt={item.product_name}
                          />
                        </a>
                        <div className="product-action">
                          <a href="#">
                            <i className="fa fa-cart-plus" />
                          </a>
                          <a href="#">
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
              </Slider>
            </div>

            <div className="sidebar-widget brands">
              <h2 className="title">Thương hiệu</h2>
              <ul>
                {_.map(dataBranch, (item, key) => {
                  return (
                    <li key={key}>
                      <a href="#">{item.branches_name} </a>
                      <span>{item.total}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default styled(List)``;
