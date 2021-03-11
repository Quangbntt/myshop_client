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
import { totalDetailDate } from "../../utils/helper";
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
let time = null;

const Home = memo(({}) => {
  const [loading, setLoading] = useState(false);
  const [row, setRow] = useState({
    data: [],
    arrKey: [],
    arrKeyOld: [],
    dataOld: [],
  });
  const [totalLength, setTotalLength] = useState(0);

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
      setTotalLength(_.get(result, "value.total"));
      let arrNew = _.get(result, "value");
      await totalDetailDate(setRow, arrNew);
    }
  }, [params]);
  useEffect(() => {
    clearTimeout(time);
    time = setTimeout(boweload, 800);
  }, [boweload]);
  return (
    <>
        <div className="header">
            <div className="container-fluid">
                <div className="row" style={{marginBottom: "30px"}}>
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
});
export default Home;
