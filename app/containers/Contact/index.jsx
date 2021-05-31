import React, { memo, useState, useEffect, useCallback } from "react";
import _ from "lodash";
import styled from "styled-components";
import PropTypes from "prop-types";
import * as style from "components/Variables";
import classNames from "classnames";
import Footer from "components/Layout/Footer";
import List from "./List";

const Home = memo(({ className }) => {
    const [loading, setLoading] = useState(false);
    const [params, setParams] = useState({
        page: 1,
        limit: 10,
    });

    return (
        <div className={classNames({
            [className]: true,
        })}>
            <div className="breadcrumb-wrap">
                <div className="container-fluid">
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item"><a href="#">Trang chủ</a></li>
                        <li className="breadcrumb-item"><a href="#">Liên hệ</a></li>
                    </ul>
                </div>
            </div>
            <List
                loading={loading}
                setParams={setParams}
                params={params}
            />
            <Footer />
        </div>
    );
});
export default styled(Home)`
  .product-view {
    padding-top: 10px !important;
  }
`;
