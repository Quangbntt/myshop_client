/* eslint-disable no-underscore-dangle */
import PropTypes from "prop-types";
import React, { memo, useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { Breadcrumb, AutoComplete, Input, Spin } from "antd";
import { Link, useHistory } from "react-router-dom";
import { defineMessages, FormattedMessage } from "react-intl";
import ServiceBase from "utils/ServiceBase";
import Ui from "utils/Ui";
import * as style from "components/Variables";
import Logo from "images/logo.png";
const prefix = "app.routing.";
import classNames from "classnames";
let time = null;
const { Option } = AutoComplete;
function Footer({ className, pathName }) {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [values, setValues] = useState("");
  const [params, setParams] = useState({
    name: undefined,
  });
  var dataCart = JSON.parse(localStorage.getItem("CART"));

  const onSearch = (e) => {
    setParams((preState) => {
      let nextState = { ...preState };
      nextState.name = e;
      return nextState;
    });
  };
  const onSelect = (e, row) => {
    // let url = "/chi-tiet-" + e + "/" + row.label;
    // history.push(url);
    setParams((preState) => {
      let nextState = { ...preState };
      nextState = nextState;
      return nextState;
    });
    // window.location.reload();
  };
  const onChange = (e, row) => {
    let url = "/chi-tiet-" + e + "/" + row.label;
    setValues((preState) => {
      let nextState = { ...preState };
      nextState.name = row.label;
      nextState.row = row;
      nextState.url = url;
      return nextState;
    });
  };

  const boweload = useCallback(async () => {
    setLoading(true);
    let newParams = {
      name: params.name,
    };
    let result = await ServiceBase.requestJson({
      url: "/product/search-client",
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
      style={{ padding: "0px" }}
    >
      <div className="bottom-bar">
        <div className="container-fluid">
          <div className="row" style={{ alignItems: "center" }}>
            <div className="col-md-3">
              <div className="logo">
                <a href="index.html">
                  <img src={Logo} alt="Logo" />
                </a>
              </div>
            </div>
            <div className="col-md-6 col-8">
              <div className="search">
                <Spin spinning={loading}>
                  <AutoComplete
                    dropdownMatchSelectWidth={500}
                    // options={data}
                    // value={values.name}
                    onSearch={onSearch}
                    onSelect={onSelect}
                    onChange={onChange}
                    style={{
                      width: "100%",
                      height: "40px",
                      padding: "0 15px",
                      color: "#666666",
                      border: "1px solid #ff6f61",
                      borderRadius: "4px",
                    }}
                  >
                    {data.map((item, key) => (
                      <Option key={item.value} value={item.label}>
                        <a href={"/chi-tiet-" + item.value + "/" + item.label}>
                          {item.label}
                        </a>
                      </Option>
                    ))}
                  </AutoComplete>
                </Spin>
              </div>
            </div>
            <div className="col-md-3 col-4">
              <div className="user">
                <a href="/gio-hang" className="btn cart">
                  <i className="fa fa-shopping-cart" />
                  {/* <span>({dataCart ? dataCart.length : 0})</span> */}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Footer.propTypes = {
  classNameName: PropTypes.any,
  pathName: PropTypes.any,
};

export default memo(styled(Footer)`
  padding: 1rem 0 1rem 0;
  a {
    color: ${style.color.haiVan.primary};
    font-weight: bold;
    font-size: ${style.fontsize.reg};
  }
  a:hover {
    color: ${style.color.haiVan.bg} !important;
  }
  .ant-select .ant-select-selector {
    border: none !important;
    border-color: #ff6f61 !important;
  }
  .ant-input-search-icon:hover,
  .ant-input-search-icon {
    color: #ff6f61;
  }
  .ant-input-search-icon::before {
    border-left: 1px solid #ff6f61;
  }
`);
