import React, { memo, useState, useEffect, useCallback } from "react";
import { Spin, Select } from "antd";
import _ from "lodash";
import moment from "moment";
import styled from "styled-components";
import PropTypes from "prop-types";
import * as style from "components/Variables";
import classNames from "classnames";
import { Ui } from "utils/Ui";
import ServiceBase from "utils/ServiceBase";
import Pagination from "components/Paginate/index";
import { totalDetailDate } from "../../utils/helper";
import MenuClassify from "components/MenuClassify";
import Footer from "components/Layout/Footer";
import List from "./List";
import Fillter from "./Fillter";

let time = null;

const Home = memo(({ className }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [dataHot, setDataHot] = useState([]);
  const [dataBranch, setDataBranch] = useState([]);
  const [totalLength, setTotalLength] = useState(0);

  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    name: undefined,
    branch: undefined,
    price_from: undefined,
    price_to: undefined,
  });

  const boweload = useCallback(async () => {
    let arrProduct = [];
    let arrBranch = [];
    _.map(params.name, (item, key) => {
      arrProduct.push(item.value);
    });
    _.map(params.branch, (item, key) => {
      arrBranch.push(item.value);
    });
    let newParams = {
      price_from: params.priceFrom,
      price_to: params.priceTo,
      product: arrProduct,
      branch: arrBranch,
      page: params.page,
      size: params.limit,
    };

    setLoading(true);
    let result = await ServiceBase.requestJson({
      url: "/product/all",
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
      let arrData = _.map(_.get(result, "value.data"), (item, index) => {
        item.key = i++;
        return item;
      });
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
              <a href="/">Trang chủ</a>
            </li>
            <li className="breadcrumb-item">
              <a href="/san-pham">Sản phẩm</a>
            </li>
            <li className="breadcrumb-item active">Danh sách</li>
          </ul>
        </div>
      </div>
      <div className="product-view">
        <div className="container-fluid">
          <Spin spinning={loading}>
            <Fillter params={params} setParams={setParams} data={data} />
            <List
              data={data}
              setData={setData}
              dataHot={dataHot}
              setDataHot={setDataHot}
              loading={loading}
              setParams={setParams}
              totalLength={totalLength}
              params={params}
              dataBranch={dataBranch}
              setDataBranch={setDataBranch}
            />
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
