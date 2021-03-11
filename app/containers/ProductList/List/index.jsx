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
        <div className={classNames({
            [className]: true,
        })}>
            <div className="row">
                <div className="col-lg-8">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="product-item">
                                <div className="product-title">
                                    <a href="#">Product Name</a>
                                    <div className="ratting">
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                    </div>
                                </div>
                                <div className="product-image">
                                    <a href="product-detail.html">
                                        <img src={Product1} alt="Product Image" />
                                    </a>
                                    <div className="product-action">
                                        <a href="#"><i className="fa fa-cart-plus"></i></a>
                                        <a href="#"><i className="fa fa-heart"></i></a>
                                        <a href="#"><i className="fa fa-search"></i></a>
                                    </div>
                                </div>
                                <div className="product-price">
                                    <h3><span>$</span>99</h3>
                                    <a className="btn" href=""><i className="fa fa-shopping-cart"></i>Buy Now</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="product-item">
                                <div className="product-title">
                                    <a href="#">Product Name</a>
                                    <div className="ratting">
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                    </div>
                                </div>
                                <div className="product-image">
                                    <a href="product-detail.html">
                                        <img src={Product2} alt="Product Image" />
                                    </a>
                                    <div className="product-action">
                                        <a href="#"><i className="fa fa-cart-plus"></i></a>
                                        <a href="#"><i className="fa fa-heart"></i></a>
                                        <a href="#"><i className="fa fa-search"></i></a>
                                    </div>
                                </div>
                                <div className="product-price">
                                    <h3><span>$</span>99</h3>
                                    <a className="btn" href=""><i className="fa fa-shopping-cart"></i>Buy Now</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="product-item">
                                <div className="product-title">
                                    <a href="#">Product Name</a>
                                    <div className="ratting">
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                    </div>
                                </div>
                                <div className="product-image">
                                    <a href="product-detail.html">
                                        <img src={Product3} alt="Product Image" />
                                    </a>
                                    <div className="product-action">
                                        <a href="#"><i className="fa fa-cart-plus"></i></a>
                                        <a href="#"><i className="fa fa-heart"></i></a>
                                        <a href="#"><i className="fa fa-search"></i></a>
                                    </div>
                                </div>
                                <div className="product-price">
                                    <h3><span>$</span>99</h3>
                                    <a className="btn" href=""><i className="fa fa-shopping-cart"></i>Buy Now</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="product-item">
                                <div className="product-title">
                                    <a href="#">Product Name</a>
                                    <div className="ratting">
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                    </div>
                                </div>
                                <div className="product-image">
                                    <a href="product-detail.html">
                                        <img src={Product4} alt="Product Image" />
                                    </a>
                                    <div className="product-action">
                                        <a href="#"><i className="fa fa-cart-plus"></i></a>
                                        <a href="#"><i className="fa fa-heart"></i></a>
                                        <a href="#"><i className="fa fa-search"></i></a>
                                    </div>
                                </div>
                                <div className="product-price">
                                    <h3><span>$</span>99</h3>
                                    <a className="btn" href=""><i className="fa fa-shopping-cart"></i>Buy Now</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="product-item">
                                <div className="product-title">
                                    <a href="#">Product Name</a>
                                    <div className="ratting">
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                    </div>
                                </div>
                                <div className="product-image">
                                    <a href="product-detail.html">
                                        <img src={Product5} alt="Product Image" />
                                    </a>
                                    <div className="product-action">
                                        <a href="#"><i className="fa fa-cart-plus"></i></a>
                                        <a href="#"><i className="fa fa-heart"></i></a>
                                        <a href="#"><i className="fa fa-search"></i></a>
                                    </div>
                                </div>
                                <div className="product-price">
                                    <h3><span>$</span>99</h3>
                                    <a className="btn" href=""><i className="fa fa-shopping-cart"></i>Buy Now</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="product-item">
                                <div className="product-title">
                                    <a href="#">Product Name</a>
                                    <div className="ratting">
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                    </div>
                                </div>
                                <div className="product-image">
                                    <a href="product-detail.html">
                                        <img src={Product6} alt="Product Image" />
                                    </a>
                                    <div className="product-action">
                                        <a href="#"><i className="fa fa-cart-plus"></i></a>
                                        <a href="#"><i className="fa fa-heart"></i></a>
                                        <a href="#"><i className="fa fa-search"></i></a>
                                    </div>
                                </div>
                                <div className="product-price">
                                    <h3><span>$</span>99</h3>
                                    <a className="btn" href=""><i className="fa fa-shopping-cart"></i>Buy Now</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="product-item">
                                <div className="product-title">
                                    <a href="#">Product Name</a>
                                    <div className="ratting">
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                    </div>
                                </div>
                                <div className="product-image">
                                    <a href="product-detail.html">
                                        <img src={Product7} alt="Product Image" />
                                    </a>
                                    <div className="product-action">
                                        <a href="#"><i className="fa fa-cart-plus"></i></a>
                                        <a href="#"><i className="fa fa-heart"></i></a>
                                        <a href="#"><i className="fa fa-search"></i></a>
                                    </div>
                                </div>
                                <div className="product-price">
                                    <h3><span>$</span>99</h3>
                                    <a className="btn" href=""><i className="fa fa-shopping-cart"></i>Buy Now</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="product-item">
                                <div className="product-title">
                                    <a href="#">Product Name</a>
                                    <div className="ratting">
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                    </div>
                                </div>
                                <div className="product-image">
                                    <a href="product-detail.html">
                                        <img src={Product8} alt="Product Image" />
                                    </a>
                                    <div className="product-action">
                                        <a href="#"><i className="fa fa-cart-plus"></i></a>
                                        <a href="#"><i className="fa fa-heart"></i></a>
                                        <a href="#"><i className="fa fa-search"></i></a>
                                    </div>
                                </div>
                                <div className="product-price">
                                    <h3><span>$</span>99</h3>
                                    <a className="btn" href=""><i className="fa fa-shopping-cart"></i>Buy Now</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="product-item">
                                <div className="product-title">
                                    <a href="#">Product Name</a>
                                    <div className="ratting">
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                    </div>
                                </div>
                                <div className="product-image">
                                    <a href="product-detail.html">
                                        <img src={Product9} alt="Product Image" />
                                    </a>
                                    <div className="product-action">
                                        <a href="#"><i className="fa fa-cart-plus"></i></a>
                                        <a href="#"><i className="fa fa-heart"></i></a>
                                        <a href="#"><i className="fa fa-search"></i></a>
                                    </div>
                                </div>
                                <div className="product-price">
                                    <h3><span>$</span>99</h3>
                                    <a className="btn" href=""><i className="fa fa-shopping-cart"></i>Buy Now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 sidebar">
                    <div className="sidebar-widget category">
                        <MenuClassify />
                    </div>
                    <div className="sidebar-widget widget-slider">
                        <h2 className="title">Sản phẩm hot</h2>
                        <Slider {...settings} className="sidebar-slider normal-slider">
                            <div className="product-item">
                                <div className="product-title">
                                    <a href="#">Product Name</a>
                                    <div className="ratting">
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                    </div>
                                </div>
                                <div className="product-image">
                                    <a href="product-detail.html">
                                        <img src={Product6} alt="Product Image" />
                                    </a>
                                    <div className="product-action">
                                        <a href="#"><i className="fa fa-cart-plus"></i></a>
                                        <a href="#"><i className="fa fa-heart"></i></a>
                                        <a href="#"><i className="fa fa-search"></i></a>
                                    </div>
                                </div>
                                <div className="product-price">
                                    <h3><span>$</span>99</h3>
                                    <a className="btn" href=""><i className="fa fa-shopping-cart"></i>Buy Now</a>
                                </div>
                            </div>
                            <div className="product-item">
                                <div className="product-title">
                                    <a href="#">Product Name</a>
                                    <div className="ratting">
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                    </div>
                                </div>
                                <div className="product-image">
                                    <a href="product-detail.html">
                                        <img src={Product9} alt="Product Image" />
                                    </a>
                                    <div className="product-action">
                                        <a href="#"><i className="fa fa-cart-plus"></i></a>
                                        <a href="#"><i className="fa fa-heart"></i></a>
                                        <a href="#"><i className="fa fa-search"></i></a>
                                    </div>
                                </div>
                                <div className="product-price">
                                    <h3><span>$</span>99</h3>
                                    <a className="btn" href=""><i className="fa fa-shopping-cart"></i>Buy Now</a>
                                </div>
                            </div>
                            <div className="product-item">
                                <div className="product-title">
                                    <a href="#">Product Name</a>
                                    <div className="ratting">
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                    </div>
                                </div>
                                <div className="product-image">
                                    <a href="product-detail.html">
                                        <img src={Product8} alt="Product Image" />
                                    </a>
                                    <div className="product-action">
                                        <a href="#"><i className="fa fa-cart-plus"></i></a>
                                        <a href="#"><i className="fa fa-heart"></i></a>
                                        <a href="#"><i className="fa fa-search"></i></a>
                                    </div>
                                </div>
                                <div className="product-price">
                                    <h3><span>$</span>99</h3>
                                    <a className="btn" href=""><i className="fa fa-shopping-cart"></i>Buy Now</a>
                                </div>
                            </div>
                        </Slider>
                    </div>

                    <div className="sidebar-widget brands">
                        <h2 className="title">Thương hiệu</h2>
                        <ul>
                            <li><a href="#">Nulla </a><span>(45)</span></li>
                            <li><a href="#">Curabitur </a><span>(34)</span></li>
                            <li><a href="#">Nunc </a><span>(67)</span></li>
                            <li><a href="#">Ullamcorper</a><span>(74)</span></li>
                            <li><a href="#">Fusce </a><span>(89)</span></li>
                            <li><a href="#">Sagittis</a><span>(28)</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default styled(List)`
    
`;
