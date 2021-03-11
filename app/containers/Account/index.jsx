import React, { memo, useState, useEffect, useCallback } from "react";
import { Spin, Select } from "antd";
import _ from "lodash";
import moment from "moment";
import { Grid, Paper, Card, CardHeader, CardContent } from "@material-ui/core";
import styled from "styled-components";
import PropTypes from "prop-types";
import * as style from "components/Variables";
import classNames from "classnames";
import { Ui } from "utils/Ui";
import ServiceBase from "utils/ServiceBase";
import Pagination from "components/Paginate/index";
import MenuClassify from "components/MenuClassify";
import Footer from "components/Layout/Footer";
import List from "./List";
import Home from "../Home/index";
import { $Cookies } from "utils/cookies";

let time = null;

const Account = ({ className }) => {
  const [loading, setLoading] = useState(false);
  const [row, setRow] = useState({
    data: [],
    arrKey: [],
    arrKeyOld: [],
    dataOld: [],
    name: undefined,
    price_from: undefined,
    price_to: undefined,
    branch: undefined,
    // category: undefined,
  });
  const [totalLength, setTotalLength] = useState(0);

  const [params, setParams] = useState({
    thang: moment(),
    page: 1,
    limit: 100,
    name: undefined,
    branch: undefined,
    // category: undefined,
    price_from: undefined,
    price_to: undefined,
  });

  // const boweload = useCallback(async () => {
  //   let newParams = {
  //     price_from: params.price_from,
  //     price_to: params.price_to,
  //     category: _.get(params, "category.key"),
  //     branch: _.get(params, "branch.key"),
  //     page: params.page,
  //     limit: params.limit,
  //   };

  //   setLoading(true);
  //   let result = await ServiceBase.requestJson({
  //     url: "/report/report_synthetic",
  //     method: "GET",
  //     data: newParams,
  //   });
  //   if (result.hasErrors) {
  //     Ui.showErrors(result.errors);
  //     setLoading(false);
  //   } else {
  //     setLoading(false);
  //     setTotalLength(_.get(result, "value.total"));
  //     let arrNew = _.get(result, "value");
  //     await totalDetailDate(setRow, arrNew);
  //   }
  // }, [params]);
  // useEffect(() => {
  //   clearTimeout(time);
  //   time = setTimeout(boweload, 800);
  // }, [boweload]);
  return (
    <>
      {$Cookies.get("ERP_REPORT") ? (
        <div
          className={classNames({
            [className]: true,
          })}
        >
          <div className="breadcrumb-wrap">
            <div className="container-fluid">
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#">Products</a>
                </li>
                <li className="breadcrumb-item active">My Account</li>
              </ul>
            </div>
          </div>
          <List
            data={_.get(row, "data")}
            loading={loading}
            setParams={setParams}
            totalLength={totalLength}
            setRow={setRow}
            params={params}
            row={row}
          />
          <Footer />
        </div>
      ) : (
        <Home />
      )}
    </>
  );
};

export default styled(Account)`
  .product-view {
    padding-top: 10px !important;
  }
`;
