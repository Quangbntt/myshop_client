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
import MenuClassify from "components/MenuClassify";
import Footer from "components/Layout/Footer";
import List from "./List";
import Home from "../Home/index";
import { $Cookies } from "utils/cookies";
import { useHistory, useParams } from "react-router";

let time = null;

const Account = ({ className }) => {
  let slug_id = useParams();
  const [loading, setLoading] = useState(false);
  const [row, setRow] = useState({
    data: {},
  });
  const [data, setData] = useState([]);
  const [dataShipPlace, setDataShipPlace] = useState([]);
  const [dataOrder, setDataOrder] = useState([]);
  const [totalLength, setTotalLength] = useState(0);
  const [shipPlaceLength, setShipPlaceLength] = useState(0);
  const [orderLength, setOrderLength] = useState(0);
  const [show, setShow] = useState({ disabled: true });
  const [params, setParams] = useState({
    id: slug_id.id,
    size: 100,
  });

  const boweload = useCallback(async () => {
    let newParams = {
      id: params.id,
      size: params.size,
    };
    setLoading(true);
    let result = await ServiceBase.requestJson({
      url: "/user/detail-client/" + newParams.id,
      method: "GET",
      data: {},
    });
    if (result.hasErrors) {
      Ui.showErrors(result.errors);
      setLoading(false);
    } else {
      setLoading(false);
      setTotalLength(_.get(result, "value.total"));
      let arrData = _.get(result, "value");
      _.map(arrData, (item, key) => {
        item.birthday = moment(item.birthday);
      });
      setData(arrData);
      setRow((preState) => {
        let nextState = { ...preState };
        nextState.data = arrData[0];
        return nextState;
      });
    }

    let resultShipPlace = await ServiceBase.requestJson({
      url: "/shipplace/ship-place",
      method: "GET",
      data: newParams,
    });
    if (resultShipPlace.hasErrors) {
      Ui.showErrors(resultShipPlace.errors);
    } else {
      setShipPlaceLength(_.get(resultShipPlace, "value.total"));
      let arrShipPlace = _.get(resultShipPlace, "value.data");
      setDataShipPlace(arrShipPlace);
    }

    let resultOrder = await ServiceBase.requestJson({
      url: "/order/get-order",
      method: "GET",
      data: newParams,
    });
    if (result.hasErrors) {
      Ui.showErrors(result.errors);
    } else {
      setOrderLength(_.get(resultOrder, "value.total"));
      let arrOrder = _.get(resultOrder, "value.data");
      setDataOrder(arrOrder);
    }
  }, [params]);
  useEffect(() => {
    clearTimeout(time);
    time = setTimeout(boweload, 800);
  }, [boweload]);
  return (
    <>
      {$Cookies.get("ERP_REPORT") ? (
        <div
          className={classNames({
            [className]: true,
          })}
        >
          <Spin spinning={loading} tip="Đang lấy dữ liệu...">
            <div className="breadcrumb-wrap">
              <div className="container-fluid">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/">Trang chủ</a>
                  </li>
                  <li className="breadcrumb-item active">Tài khoản của tôi</li>
                </ul>
              </div>
            </div>
            {data.length > 0 && (
              <List
                data={data}
                setParams={setParams}
                params={params}
                row={row}
                show={show}
                setShow={setShow}
                slug_id={slug_id}
                shipPlaceLength={shipPlaceLength}
                setShipPlaceLength={setShipPlaceLength}
                dataShipPlace={dataShipPlace}
                setLoading={setLoading}
                dataOrder={dataOrder}
              />
            )}
            <Footer />
          </Spin>
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
