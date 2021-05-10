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
import { $Cookies } from "utils/cookies";
import List from "./List";

let time = null;

const Home = memo(({ className }) => {
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(1);
  const [data, setData] = useState([]);
  const [dataPlace, setDataPlace] = useState([]);
  const token = JSON.parse($Cookies.get("ERP_REPORT"));
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    user_id: token.parentId,
  });

  const boweload = useCallback(async () => {
    let newParams = {
      user_id: params.user_id,
      page: params.page,
      limit: params.limit,
    };
    setLoading(true);
    let result = await ServiceBase.requestJson({
      url: "/order/list",
      method: "GET",
      data: newParams,
    });
    if (result.hasErrors) {
      Ui.showErrors(result.errors);
      setLoading(false);
    } else {
      setLoading(false);
      let i = 0;
      let arrData = _.map(_.get(result, "value.data"), (item, index) => {
        item.key = i++;
        return item;
      });
      setData(arrData);
    }

    let resultPlace = await ServiceBase.requestJson({
      url: "/shipplace/ship-place",
      method: "GET",
      data: { id: params.user_id },
    });
    if (resultPlace.hasErrors) {
      Ui.showErrors(resultPlace.errors);
    } else {
      let i = 0;
      let arrDataPlace = _.map(
        _.get(resultPlace, "value.data"),
        (item, index) => {
          return item;
        }
      );
      setDataPlace(arrDataPlace);
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
            <li className="breadcrumb-item active">Giỏ hàng</li>
          </ul>
        </div>
      </div>
      <Spin spinning={loading}>
        {dataPlace.length > 0 && (
          <List
            data={data}
            count={count}
            setCount={setCount}
            setParams={setParams}
            params={params}
            dataPlace={dataPlace}
          />
        )}
      </Spin>
      <Footer />
    </div>
  );
});
export default styled(Home)`
  .product-view {
    padding-top: 10px !important;
  }
`;
