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
import MenuClassify from "components/MenuClassify";
import Pagination from "components/Paginate/index";
import List from "./List/index";
import Footer from "components/Layout/Footer";

import LoadingBar from "react-top-loading-bar";
import { bindActionCreators } from "redux";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "recompose";
import {
  makeSelectIsAuthenticated,
  makeSelectAppConfig,
  makeActionPro,
} from "containers/App/selectors";
import { actionProgress } from "containers/App/actions";
let time = null;

const Home = ({ dataProgress, actionProgress }) => {
  const [loading, setLoading] = useState(false);
  const [row, setRow] = useState({
    data: [],
    arrKey: [],
    arrKeyOld: [],
    dataOld: [],
  });
  const [data, setData] = useState([]);
  const [dataTop, setDataTop] = useState([]);
  const [dataDesc, setDataDesc] = useState([]);
  const [totalLength, setTotalLength] = useState(0);
  const [progress, setProgress] = useState(0);
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
  });

  const boweload = useCallback(async () => {
    let newParams = {
      page: params.page,
      size: params.limit,
    };
    setLoading(true);
    let result = await ServiceBase.requestJson({
      url: "/news/list",
      method: "GET",
      data: newParams,
    });
    if (result.hasErrors) {
      Ui.showErrors(result.errors);
      setLoading(false);
    } else {
      setLoading(false);
      setProgress(100);
      setTotalLength(_.get(result, "value.total"));
      let i = 0;
      let arrData = _.map(_.get(result, "value.data"), (item, index) => {
        item.key = i++;
        return item;
      });
      setData(arrData);
    }

    let resultTop = await ServiceBase.requestJson({
      url: "/news/new",
      method: "GET",
      data: newParams,
    });
    if (result.hasErrors) {
      Ui.showErrors(result.errors);
    } else {
      let i = 0;
      let arrDataTop = _.map(_.get(resultTop, "value.data"), (item, index) => {
        item.key = i++;
        return item;
      });
      setDataTop(arrDataTop);
    }

    let resultDesc = await ServiceBase.requestJson({
      url: "/news/list-desc",
      method: "GET",
      data: {},
    });
    if (result.hasErrors) {
      Ui.showErrors(result.errors);
    } else {
      let i = 0;
      let arrDataDesc = _.map(
        _.get(resultDesc, "value.data"),
        (item, index) => {
          item.key = i++;
          return item;
        }
      );
      setDataDesc(arrDataDesc);
    }
  }, [params]);
  useEffect(() => {
    clearTimeout(time);
    actionProgress(100);
    time = setTimeout(boweload, 800);
  }, [boweload]);
  return (
    <>
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="header">
        <div className="container-fluid">
          {dataTop.length > 0 && (
            <List
              data={data}
              setParams={setParams}
              dataDesc={dataDesc}
              dataTop={dataTop}
              params={params}
              totalLength={totalLength}
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};
const mapStateToProps = createStructuredSelector({
  dataProgress: makeActionPro(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      actionProgress,
    },
    dispatch
  );
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default compose(
  withConnect,
  memo
)(Home);
