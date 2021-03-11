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

const baseUrl = "../../images";
const List = memo(({ className, setParams, data, params }) => {
    const settings = {
        customPaging: function (i) {
            return (
                <>
                    <a>
                        {/* <img src={`Product${i+1}`} /> */}
                        <img src={`Product`+1} />
                    </a>
                </>
            );
        },
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
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
        <div className={classNames({
            [className]: true,
        })}>

            <div className="product-detail">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="product-detail-top">
                                <div className="row align-items-center">
                                    <div className="col-md-5">
                                        <Slider {...settings} className="product-slider-single normal-slider">
                                            <img src={Product1} alt="Product Image1" />
                                            <img src={Product3} alt="Product Image2" />
                                            <img src={Product5} alt="Product Image3" />
                                            <img src={Product7} alt="Product Image4" />
                                            <img src={Product9} alt="Product Image5" />
                                            <img src={Product10} alt="Product Image6" />
                                        </Slider>
                                    </div>
                                    <div className="col-md-7">
                                        <div className="product-content">
                                            <div className="title"><h2>Product Name</h2></div>
                                            <div className="ratting">
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                            </div>
                                            <div className="price">
                                                <h4>Price:</h4>
                                                <p>$99 <span>$149</span></p>
                                            </div>
                                            <div className="quantity">
                                                <h4>Quantity:</h4>
                                                <div className="qty">
                                                    <button className="btn-minus"><i className="fa fa-minus"></i></button>
                                                    <input type="text" value="1" />
                                                    <button className="btn-plus"><i className="fa fa-plus"></i></button>
                                                </div>
                                            </div>
                                            <div className="p-size">
                                                <h4>Size:</h4>
                                                <div className="btn-group btn-group-sm">
                                                    <button type="button" className="btn">S</button>
                                                    <button type="button" className="btn">M</button>
                                                    <button type="button" className="btn">L</button>
                                                    <button type="button" className="btn">XL</button>
                                                </div>
                                            </div>
                                            <div className="p-color">
                                                <h4>Color:</h4>
                                                <div className="btn-group btn-group-sm">
                                                    <button type="button" className="btn">White</button>
                                                    <button type="button" className="btn">Black</button>
                                                    <button type="button" className="btn">Blue</button>
                                                </div>
                                            </div>
                                            <div className="action">
                                                <a className="btn" href="#"><i className="fa fa-shopping-cart"></i>Add to Cart</a>
                                                <a className="btn" href="#"><i className="fa fa-shopping-bag"></i>Buy Now</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row product-detail-bottom">
                                <div className="col-lg-12">
                                    <ul className="nav nav-pills nav-justified">
                                        <li className="nav-item">
                                            <a className="nav-link active" data-toggle="pill" href="#description">Description</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" data-toggle="pill" href="#specification">Specification</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" data-toggle="pill" href="#reviews">Reviews (1)</a>
                                        </li>
                                    </ul>

                                    <div className="tab-content">
                                        <div id="description" className="container tab-pane active">
                                            <h4>Product description</h4>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In condimentum quam ac mi viverra dictum. In efficitur ipsum diam, at dignissim lorem tempor in. Vivamus tempor hendrerit finibus. Nulla tristique viverra nisl, sit amet bibendum ante suscipit non. Praesent in faucibus tellus, sed gravida lacus. Vivamus eu diam eros. Aliquam et sapien eget arcu rhoncus scelerisque. Suspendisse sit amet neque neque. Praesent suscipit et magna eu iaculis. Donec arcu libero, commodo ac est a, malesuada finibus dolor. Aenean in ex eu velit semper fermentum. In leo dui, aliquet sit amet eleifend sit amet, varius in turpis. Maecenas fermentum ut ligula at consectetur. Nullam et tortor leo.
                                        </p>
                                        </div>
                                        <div id="specification" className="container tab-pane fade">
                                            <h4>Product specification</h4>
                                            <ul>
                                                <li>Lorem ipsum dolor sit amet</li>
                                                <li>Lorem ipsum dolor sit amet</li>
                                                <li>Lorem ipsum dolor sit amet</li>
                                                <li>Lorem ipsum dolor sit amet</li>
                                                <li>Lorem ipsum dolor sit amet</li>
                                            </ul>
                                        </div>
                                        <div id="reviews" className="container tab-pane fade">
                                            <div className="reviews-submitted">
                                                <div className="reviewer">Phasellus Gravida - <span>01 Jan 2020</span></div>
                                                <div className="ratting">
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                </div>
                                                <p>
                                                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.
                                            </p>
                                            </div>
                                            <div className="reviews-submit">
                                                <h4>Give your Review:</h4>
                                                <div className="ratting">
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star"></i>
                                                </div>
                                                <div className="row form">
                                                    <div className="col-sm-6">
                                                        <input type="text" placeholder="Name" />
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <input type="email" placeholder="Email" />
                                                    </div>
                                                    <div className="col-sm-12">
                                                        <textarea placeholder="Review"></textarea>
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
            </div>
        </div>
    );
});

export default styled(List)`
    .product-item {
        padding-right: 20px;
    }
`;
