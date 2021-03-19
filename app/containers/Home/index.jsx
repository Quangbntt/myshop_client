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
import Slide from "./Slide";
import News from "./News";
import Branch from "components/Branch";
import Footer from "components/Layout/Footer";
import Feature from "./Feature";
import Category from "./Category";
import ActionCall from "./ActionCall";
import FeatureProduct from "./FeatureProduct";
import RecentProduct from "./RecentProduct";
import Feedback from "./Feedback";
import LoadingBar from 'react-top-loading-bar';
import {bindActionCreators} from "redux";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "recompose";
import {
  makeSelectIsAuthenticated,
  makeSelectAppConfig,
  makeActionPro
} from "containers/App/selectors";
import { actionProgress } from "containers/App/actions";
let time = null;

const Home = ({dataProgress, actionProgress }) => {
  const [loading, setLoading] = useState(false);
  const [row, setRow] = useState({
    data: [],
    arrKey: [],
    arrKeyOld: [],
    dataOld: [],
  });
  const [totalLength, setTotalLength] = useState(0);
  const [progress, setProgress] = useState(0);
  const [params, setParams] = useState({
    page: 1,
    limit: 100,
  });

  const boweload = useCallback(async () => {
    let newParams = {
      page: params.page,
      limit: params.limit,
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
      setProgress(100);
      setTotalLength(_.get(result, "value.total"));
      let arrNew = _.get(result, "value");
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
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="header">
        <div className="container-fluid">
          <div className="row" style={{ marginBottom: "30px" }}>
            <div className="col-md-3">
              <MenuClassify />
            </div>
            <div className="col-md-6">
              <Slide />
            </div>
            <div className="col-md-3">
              <News />
            </div>
          </div>
        </div>
      </div>
      <Branch />
      <Feature />
      <Category />
      <ActionCall />
      <FeatureProduct />
      <RecentProduct />
      <Feedback />
      <Footer />
      
    </>
  );
};
const mapStateToProps = createStructuredSelector({
  dataProgress:makeActionPro()
});

const mapDispatchToProps = (dispatch)=>
  bindActionCreators(
    {
      actionProgress
    },
    dispatch
  );
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default (
  compose(
    withConnect,
    memo
  )(Home));