import React, { memo, useState, useEffect, useMemo, Component } from "react";
import { Table, Badge, Menu, Dropdown, Space, Button, Input, Spin } from "antd";
import classNames from "classnames";
import moment from "moment";
import _ from "lodash";
import styled from "styled-components";
import * as style from "components/Variables";
import MenuClassify from "components/MenuClassify";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Product1 from "images/product-1.jpg";
import Product2 from "images/product-2.jpg";
import Product3 from "images/product-3.jpg";
import Product4 from "images/product-4.jpg";
import Product5 from "images/product-5.jpg";
import Product6 from "images/product-6.jpg";
import Product7 from "images/product-7.jpg";
import Product8 from "images/product-8.jpg";
import Product9 from "images/product-9.jpg";
import Product10 from "images/product-10.jpg";

const List = memo(({ className, setParams, data, params }) => {
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
      <div className="cart-page">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-8">
              <div className="cart-page-inner">
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead className="thead-dark">
                      <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Remove</th>
                      </tr>
                    </thead>
                    <tbody className="align-middle">
                      <tr>
                        <td>
                          <div className="img">
                            <a href="#">
                              <img src="img/product-1.jpg" alt="Image" />
                            </a>
                            <p>Product Name</p>
                          </div>
                        </td>
                        <td>$99</td>
                        <td>
                          <div className="qty">
                            <button className="btn-minus">
                              <i className="fa fa-minus" />
                            </button>
                            <input type="text" value="1" />
                            <button className="btn-plus">
                              <i className="fa fa-plus" />
                            </button>
                          </div>
                        </td>
                        <td>$99</td>
                        <td>
                          <button>
                            <i className="fa fa-trash" />
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="img">
                            <a href="#">
                              <img src="img/product-2.jpg" alt="Image" />
                            </a>
                            <p>Product Name</p>
                          </div>
                        </td>
                        <td>$99</td>
                        <td>
                          <div className="qty">
                            <button className="btn-minus">
                              <i className="fa fa-minus" />
                            </button>
                            <input type="text" value="1" />
                            <button className="btn-plus">
                              <i className="fa fa-plus" />
                            </button>
                          </div>
                        </td>
                        <td>$99</td>
                        <td>
                          <button>
                            <i className="fa fa-trash" />
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="img">
                            <a href="#">
                              <img src="img/product-3.jpg" alt="Image" />
                            </a>
                            <p>Product Name</p>
                          </div>
                        </td>
                        <td>$99</td>
                        <td>
                          <div className="qty">
                            <button className="btn-minus">
                              <i className="fa fa-minus" />
                            </button>
                            <input type="text" value="1" />
                            <button className="btn-plus">
                              <i className="fa fa-plus" />
                            </button>
                          </div>
                        </td>
                        <td>$99</td>
                        <td>
                          <button>
                            <i className="fa fa-trash" />
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="img">
                            <a href="#">
                              <img src="img/product-4.jpg" alt="Image" />
                            </a>
                            <p>Product Name</p>
                          </div>
                        </td>
                        <td>$99</td>
                        <td>
                          <div className="qty">
                            <button className="btn-minus">
                              <i className="fa fa-minus" />
                            </button>
                            <input type="text" value="1" />
                            <button className="btn-plus">
                              <i className="fa fa-plus" />
                            </button>
                          </div>
                        </td>
                        <td>$99</td>
                        <td>
                          <button>
                            <i className="fa fa-trash" />
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="img">
                            <a href="#">
                              <img src="img/product-5.jpg" alt="Image" />
                            </a>
                            <p>Product Name</p>
                          </div>
                        </td>
                        <td>$99</td>
                        <td>
                          <div className="qty">
                            <button className="btn-minus">
                              <i className="fa fa-minus" />
                            </button>
                            <input type="text" value="1" />
                            <button className="btn-plus">
                              <i className="fa fa-plus" />
                            </button>
                          </div>
                        </td>
                        <td>$99</td>
                        <td>
                          <button>
                            <i className="fa fa-trash" />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="cart-page-inner">
                <div className="row">
                  <div className="col-md-12">
                    <div className="coupon">
                      <input type="text" placeholder="Coupon Code" />
                      <button>Apply Code</button>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="cart-summary">
                      <div className="cart-content">
                        <h1>Cart Summary</h1>
                        <p>
                          Sub Total<span>$99</span>
                        </p>
                        <p>
                          Shipping Cost<span>$1</span>
                        </p>
                        <h2>
                          Grand Total<span>$100</span>
                        </h2>
                      </div>
                      <div className="cart-btn">
                        <button>Update Cart</button>
                        <button>Checkout</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default styled(List)``;
