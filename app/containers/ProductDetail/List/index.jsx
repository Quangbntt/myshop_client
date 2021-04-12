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
  Row,
  Col,
  InputNumber,
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
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

const baseUrl = "../../images";
const List = memo(
  ({
    className,
    setParams,
    data,
    params,
    setData,
    dataHot,
    setDatHot,
    dataBranch,
    setDataBranch,
    dataSame,
  }) => {
    const images = data.product_more_image;
    const [state, setState] = useState({
      photoIndex: 0,
      isOpen: false,
    });
    const [count, setCount] = useState(1);
    const onUpdateQuantity = (quantity) => {
      if (quantity > 0) {
        setCount((preState) => {
          let nextState = { ...preState };
          nextState = quantity;
          return nextState;
        });
      }
    };
    const onChangeQuantity = (quantity) => {
      if (quantity > 0) {
        setCount((preState) => {
          let nextState = { ...preState };
          nextState = quantity;
          return nextState;
        });
      }
    };
    const settings = {
      customPaging: function(i) {
        return (
          <>
            <a>
              <img
                src={images[i]}
                onClick={() => setState({ isOpen: true, photoIndex: i })}
              />
            </a>
          </>
        );
      },
      dots: true,
      dotsClass: "slick-dots slick-thumb",
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    const setting = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
    };
    const set = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
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
        <div className="product-detail">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-8">
                <div className="product-detail-top">
                  <div className="row align-items-center">
                    <div className="col-md-5">
                      <Slider
                        {...settings}
                        className="product-slider-single normal-slider"
                      >
                        {_.map(data.product_more_image, (item, key) => {
                          return (
                            <img
                              src={item}
                              alt="san pham"
                              key={key}
                              onClick={() =>
                                setState({ isOpen: true, photoIndex: 0 })
                              }
                            />
                          );
                        })}
                      </Slider>
                      {state.isOpen && (
                        <Lightbox
                          mainSrc={images[state.photoIndex]}
                          nextSrc={
                            images[(state.photoIndex + 1) % images.length]
                          }
                          prevSrc={
                            images[
                              (state.photoIndex + images.length - 1) %
                                images.length
                            ]
                          }
                          onCloseRequest={() =>
                            setState((preState) => {
                              let nextState = { ...preState };
                              nextState.isOpen = false;
                              return nextState;
                            })
                          }
                          onMovePrevRequest={() =>
                            setState((preState) => {
                              let nextState = { ...preState };
                              nextState.photoIndex =
                                (state.photoIndex + images.length - 1) %
                                images.length;
                              return nextState;
                            })
                          }
                          onMoveNextRequest={() =>
                            setState((preState) => {
                              let nextState = { ...preState };
                              nextState.photoIndex =
                                (state.photoIndex + 1) % images.length;
                              return nextState;
                            })
                          }
                        />
                      )}
                    </div>
                    <div className="col-md-7">
                      <div className="product-content">
                        <div className="title">
                          <h2>{data.product_name}</h2>
                        </div>
                        <div className="ratting">
                          <Rate
                            allowHalf
                            defaultValue={data.product_rate}
                            disabled={true}
                          />
                        </div>
                        <div className="price">
                          <h4>Giá:</h4>
                          <p>
                            {(data.product_price * 0.9).toLocaleString()} vnđ
                            <span>
                              {data.product_price.toLocaleString()} vnđ
                            </span>
                          </p>
                        </div>
                        <div className="quantity">
                          <h4>Số lượng:</h4>
                          <div className="qty">
                            <button
                              className="btn-minus"
                              onClick={() => onUpdateQuantity(count - 1)}
                            >
                              <i className="fa fa-minus" />
                            </button>
                            <InputNumber
                              value={count}
                              onChange={onChangeQuantity}
                            />
                            <button
                              className="btn-plus"
                              onClick={() => onUpdateQuantity(count + 1)}
                            >
                              <i className="fa fa-plus" />
                            </button>
                          </div>
                        </div>
                        <div className="p-size">
                          <h4>Kích cỡ:</h4>
                          <div className="btn-group btn-group-sm">
                            {_.map(data.size, (item, key) => {
                              return (
                                <button type="button" className="btn">
                                  {item.size_name}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                        <div className="p-color">
                          <h4>Màu sắc:</h4>
                          <div className="btn-group btn-group-sm">
                            {_.map(data.color, (item, key) => {
                              return (
                                <button type="button" className="btn">
                                  {item.color}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                        <div className="action">
                          <a className="btn" href="#">
                            <i className="fa fa-shopping-cart" />
                            Add to Cart
                          </a>
                          <a className="btn" href="#">
                            <i className="fa fa-shopping-bag" />
                            Buy Now
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row product-detail-bottom">
                  <div className="col-lg-12">
                    <ul className="nav nav-pills nav-justified">
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          data-toggle="pill"
                          href="#description"
                        >
                          Chi tiết
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          data-toggle="pill"
                          href="#specification"
                        >
                          Specification
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          data-toggle="pill"
                          href="#reviews"
                        >
                          Reviews (1)
                        </a>
                      </li>
                    </ul>

                    <div className="tab-content">
                      <div id="description" className="tab-pane active">
                        <h4>Chi tiết sản phẩm</h4>
                        <p>{data.product_description}</p>
                      </div>
                      <div id="specification" className="tab-pane fade">
                        <h4>Product specification</h4>
                        <ul>
                          <li>Lorem ipsum dolor sit amet</li>
                          <li>Lorem ipsum dolor sit amet</li>
                          <li>Lorem ipsum dolor sit amet</li>
                          <li>Lorem ipsum dolor sit amet</li>
                          <li>Lorem ipsum dolor sit amet</li>
                        </ul>
                      </div>
                      <div id="reviews" className="tab-pane fade">
                        <div className="reviews-submitted">
                          <div className="reviewer">
                            Phasellus Gravida - <span>01 Jan 2020</span>
                          </div>
                          <div className="ratting">
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                          </div>
                          <p>
                            Sed ut perspiciatis unde omnis iste natus error sit
                            voluptatem accusantium doloremque laudantium, totam
                            rem aperiam.
                          </p>
                        </div>
                        <div className="reviews-submit">
                          <h4>Give your Review:</h4>
                          <div className="ratting">
                            <i className="far fa-star" />
                            <i className="far fa-star" />
                            <i className="far fa-star" />
                            <i className="far fa-star" />
                            <i className="far fa-star" />
                          </div>
                          <div className="row form">
                            <div className="col-sm-6">
                              <input type="text" placeholder="Name" />
                            </div>
                            <div className="col-sm-6">
                              <input type="email" placeholder="Email" />
                            </div>
                            <div className="col-sm-12">
                              <textarea placeholder="Review" />
                            </div>
                            <div className="col-sm-12">
                              <button>Submit</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="product">
                  <div className="section-header">
                    <h1>Sản phẩm tương tự</h1>
                  </div>
                  <div className="align-items-center product-slider product-slider-3">
                    <Slider {...set} style={{ padding: "0px 10px" }}>
                      {_.map(dataSame, (item, key) => {
                        var url =
                          "chi-tiet-" +
                          item.product_id +
                          "/" +
                          item.product_name;
                        return (
                          <div className="product-item" key={key}>
                            <div className="product-title">
                              <a href="#" style={{ width: "240px" }}>
                                {item.product_name}
                              </a>
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
                                <a href={url}>
                                  <i className="fas fa-eye" />
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
                        );
                      })}
                    </Slider>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 sidebar">
                <div className="sidebar-widget category">
                  <MenuClassify />
                </div>
                <div className="sidebar-widget widget-slider">
                  <h2 className="title">Sản phẩm hot</h2>
                  <Slider {...setting} className="sidebar-slider normal-slider">
                    {_.map(dataHot, (item, key) => {
                      var url =
                        "chi-tiet-" + item.product_id + "/" + item.product_name;
                      return (
                        <div className="product-item" key={key}>
                          <div className="product-title">
                            <a href="#">{item.poduct_name}</a>
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
                                alt="Product Image"
                              />
                            </a>
                            <div className="product-action">
                              <a href="#">
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
                  </Slider>
                </div>

                <div className="sidebar-widget brands">
                  <h2 className="title">Thương hiệu</h2>
                  <ul>
                    {_.map(dataBranch, (item, key) => {
                      return (
                        <li onClick={() => onClick(item)} key={key}>
                          <a>{item.branches_name} </a>
                          <span>{item.total}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default styled(List)`
  .product-item {
    padding-right: 20px;
  }
  .product-title a {
    width: 240px;
    display: block;
    display: -webkit-box;
    max-width: 400px;
    height: 16px * 1.3 * 3;
    margin: 0 auto;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .ant-input-number {
    background: #000;
    width: 80px !important;
  }
`;
