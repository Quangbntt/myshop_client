import React, { memo, useState, useEffect, useMemo, Component } from "react";
import { Table, Badge, Menu, Dropdown, Space, Button, Input, Spin } from "antd";
import classNames from "classnames";
import moment from "moment";
import _ from "lodash";
import styled from "styled-components";
import * as style from "components/Variables";
import Category3 from "images/category-3.jpg";
import Category4 from "images/category-4.jpg";
import Category5 from "images/category-5.jpg";
import Category6 from "images/category-6.jpg";
import Category7 from "images/category-7.jpg";
import Category8 from "images/category-8.jpg";

const Category = memo(({ className, setParams, data, params }) => {
    return (
        <>
            <div className="category">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="category-item ch-400">
                                <img src={Category3} />
                                <a className="category-name" href="">
                                    <p>Some text goes here that describes the image</p>
                                </a>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="category-item ch-250">
                                <img src={Category4} />
                                <a className="category-name" href="">
                                    <p>Some text goes here that describes the image</p>
                                </a>
                            </div>
                            <div className="category-item ch-150">
                                <img src={Category5} />
                                <a className="category-name" href="">
                                    <p>Some text goes here that describes the image</p>
                                </a>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="category-item ch-150">
                                <img src={Category6} />
                                <a className="category-name" href="">
                                    <p>Some text goes here that describes the image</p>
                                </a>
                            </div>
                            <div className="category-item ch-250">
                                <img src={Category7} />
                                <a className="category-name" href="">
                                    <p>Some text goes here that describes the image</p>
                                </a>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="category-item ch-400">
                                <img src={Category8} />
                                <a className="category-name" href="">
                                    <p>Some text goes here that describes the image</p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
});

export default styled(Category)`
  
`;
