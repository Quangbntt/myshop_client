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
import { useParams } from "react-router-dom";
import Footer from "components/Layout/Footer";
import List from "./List";

let time = null;

const Home = memo(({ className }) => {
  const paramUrl = useParams();
  var idUrl = -paramUrl.id;
  const [loading, setLoading] = useState(false);
  const [totalLength, setTotalLength] = useState(0);
  const [data, setData] = useState([]);
  const [dataSame, setDataSame] = useState([]);
  const [dataHot, setDataHot] = useState([]);
  const [dataBranch, setDataBranch] = useState([]);
  const [params, setParams] = useState({
    page: 1,
    limit: 100,
  });

  const boweload = useCallback(async () => {
    let newParams = {
      id: idUrl,
      page: params.page,
      limit: params.limit,
    };

    setLoading(true);
    let result = await ServiceBase.requestJson({
      url: "/product/detail",
      method: "GET",
      data: newParams,
    });
    if (result.hasErrors) {
      Ui.showErrors(result.errors);
      setLoading(false);
    } else {
      setLoading(false);
      setTotalLength(_.get(result, "value.total"));
      let i = 0;
      let arrData = _.get(result, "value");
      setData(arrData);
    }
    let hotResult = await ServiceBase.requestJson({
      url: "/product/hot",
      method: "GET",
      data: {},
    });
    if (hotResult.hasErrors) {
      Ui.showErrors(hotResult.errors);
      setLoading(false);
    } else {
      setLoading(false);
      let i = 0;
      let arrDataHot = _.map(_.get(hotResult, "value.data"), (item, index) => {
        item.key = i++;
        return item;
      });
      setDataHot(arrDataHot);
    }

    let sameResult = await ServiceBase.requestJson({
      url: "/product/same",
      method: "GET",
      data: newParams,
    });
    if (sameResult.hasErrors) {
      Ui.showErrors(sameResult.errors);
      setLoading(false);
    } else {
      setLoading(false);
      let i = 0;
      let arrDataSame = _.map(
        _.get(sameResult, "value.data"),
        (item, index) => {
          item.key = i++;
          return item;
        }
      );
      setDataSame(arrDataSame);
    }

    let branch = await ServiceBase.requestJson({
      url: "/branch/all",
      method: "GET",
      data: {},
    });
    if (branch.hasErrors) {
      Ui.showErrors(branch.errors);
      setLoading(false);
    } else {
      setLoading(false);
      let i = 0;
      let arrBranch = _.map(_.get(branch, "value"), (item, index) => {
        item.key = i++;
        return item;
      });
      setDataBranch(arrBranch);
    }
  }, [params]);
  useEffect(() => {
    clearTimeout(time);
    time = setTimeout(boweload, 800);
  }, [boweload]);
  return (
    <div
      className={classNames({
        [className]: true,
      })}
    >
      <div className="breadcrumb-wrap">
        <div className="container-fluid">
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#">Trang chủ</a>
            </li>
            <li className="breadcrumb-item">
              <a href="#">Sản phẩm</a>
            </li>
            <li className="breadcrumb-item active">Chi tiết sản phẩm</li>
          </ul>
        </div>
      </div>
      <div className="product-view">
        <div className="container-fluid">
          <Spin spinning={loading}>
            {data.product_id && (
              <List
                data={data}
                loading={loading}
                setParams={setParams}
                totalLength={totalLength}
                params={params}
                setData={setData}
                dataHot={dataHot}
                setDataHot={setDataHot}
                dataBranch={dataBranch}
                setDataBranch={setDataBranch}
                dataSame={dataSame}
              />
            )}
          </Spin>
        </div>
      </div>
      <Footer />
    </div>
  );
});
export default styled(Home)`
  .product-view {
    padding-top: 10px !important;
  }
`;
