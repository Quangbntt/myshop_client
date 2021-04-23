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

let time = null;

const Home = memo(({ className }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [totalLength, setTotalLength] = useState(0);

  const [visible, setVisible] = useState({
    isShow: false,
    type: "create",
    data: {},
  });
  const [params, setParams] = useState({
    page: 1,
    limit: 100,
    name: undefined,
    branch: undefined,
    price_from: undefined,
    price_to: undefined,
  });

  // const boweload = useCallback(async () => {
    
  //   let newParams = {
  //     page: params.page,
  //     limit: params.limit,
  //   };

  //   setLoading(true);
  //   let result = await ServiceBase.requestJson({
  //     url: "/product/all",
  //     method: "GET",
  //     data: newParams,
  //   });
  //   if (result.hasErrors) {
  //     Ui.showErrors(result.errors);
  //     setLoading(false);
  //   } else {
  //     setLoading(false);
  //     setTotalLength(_.get(result, "value.total"));
  //     let i = 0;
  //     let arrData = _.map(_.get(result, "value.data"), (item, index) => {
  //       item.key = i++;
  //       return item;
  //     });
  //     setData(arrData);
  //   }
  // }, [params]);
  // useEffect(() => {
  //   clearTimeout(time);
  //   time = setTimeout(boweload, 800);
  // }, [boweload]);
  return (
    <div
      className={classNames({
        [className]: true,
      })}
    >
      <div className="product-view">
        <div className="container-fluid">
          <Spin spinning={loading}>
            <List
              // data={data}
              // setData={setData}
              loading={loading}
              setParams={setParams}
              totalLength={totalLength}
              params={params}
              visible={visible}
              setVisible={setVisible}
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
