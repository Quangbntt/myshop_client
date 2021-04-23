/* eslint-disable no-underscore-dangle */
import PropTypes from "prop-types";
import React, { memo, useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { Breadcrumb, AutoComplete, Input, Spin } from "antd";
import { Link } from "react-router-dom";
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
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [params, setParams] = useState({
    name: undefined,
  });

  const onSearch = (e) => {
    setParams((preState) => {
      let nextState = { ...preState };
      nextState.name = e;
      return nextState;
    });
  };
  const onSelect = () => {
    console.log("onSelect");
  };
  const onChange = () => {
    console.log("onChange");
  };

  const boweload = useCallback(async () => {
    setLoading(true);
    let newParams = {
      name: params.name,
    };
    let result = await ServiceBase.requestJson({
      url: "/product/search",
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
      style={{padding: "0px"}}
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
                    options={data}
                    onSearch={onSearch}
                    onSelect={onSelect}
                    onChange={onChange}
                  >
                    <Input.Search
                      style={{
                        width: "100%",
                        height: "40px",
                        padding: "0 15px",
                        color: "#666666",
                        border: "1px solid #ff6f61",
                        borderRadius: "4px",
                      }}
                      type="text"
                      size="large"
                      placeholder="Search"
                    />
                  </AutoComplete>
                </Spin>
                {/* <input type="text" placeholder="Search" />
                <button>
                  <i className="fa fa-search" />
                </button> */}
              </div>
            </div>
            <div className="col-md-3 col-4">
              <div className="user">
                <a href="/gio-hang" className="btn cart">
                  <i className="fa fa-shopping-cart" />
                  <span>(0)</span>
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
