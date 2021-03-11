import React, { memo, useState, useEffect, useMemo, Component } from "react";
import { Table, Badge, Menu, Dropdown, Space, Button, Input, Spin } from "antd";
import classNames from "classnames";
import moment from "moment";
import _ from "lodash";
import styled from "styled-components";
import * as style from "components/Variables";
import { Carousel } from "react-bootstrap";
import Slide1 from "images/slider-1.jpg";
import Slide2 from "images/slider-2.jpg";
import Slide3 from "images/slider-3.jpg";

const Slide = memo(({ className, setParams, data, params }) => {
    return (
        <div className={classNames({
            [className]: true,
        })}
        >
            <Carousel>
                <Carousel.Item interval={10000}>
                    <img
                        className="d-block slide-image w-100"
                        src={Slide1}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                    <div className="header-slider-caption">
                        <p>Some text goes here that describes the image</p>
                        <a className="btn" href=""><i className="fa fa-shopping-cart"></i>Shop Now</a>
                    </div>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={10000}>
                    <img
                        className="d-block slide-image w-100"
                        src={Slide2}
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                    <div className="header-slider-caption">
                        <p>Some text goes here that describes the image</p>
                        <a className="btn" href=""><i className="fa fa-shopping-cart"></i>Shop Now</a>
                    </div>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block slide-image w-100"
                        src={Slide3}
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                    <div className="header-slider-caption">
                        <p>Some text goes here that describes the image</p>
                        <a className="btn" href=""><i className="fa fa-shopping-cart"></i>Shop Now</a>
                    </div>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
});

export default styled(Slide)`
    .header-slider-caption.a {
        background: rgba(255, 111, 97, .7);
    }
    .slide-image {
        height: 400px!important;
    }
    .carousel-caption {
        position: absolute;
        top: 20%;
        left: 20%;
        width: 60%;
        height: 60%;
        padding: 15px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: rgba(255, 111, 97, .7);
        transition: all 0.3s;
        z-index: 1;
    }
`;
