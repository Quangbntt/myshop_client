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
            <div className="call-to-action">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <h1>call us for any queries</h1>
                        </div>
                        <div className="col-md-6" style={{textAlign: "right"}}>
                            <a href="tel:0123456789">+012-345-6789</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
});

export default styled(Category)`
  
`;
