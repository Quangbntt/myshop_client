/* eslint-disable no-underscore-dangle */
import PropTypes from "prop-types";
import React, { memo, useState } from "react";
import styled from "styled-components";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { defineMessages, FormattedMessage } from "react-intl";
import * as style from "components/Variables";
import { Collapse } from "antd";
const prefix = "app.routing.";

const { Panel } = Collapse;
function MenuClassify({ className, pathName }) {
  const [params, setParams] = useState({
    sex: undefined,
  });
  let url = "";
  if (params.sex != undefined) {
    url = "san-pham?price_from=&price_to=&name=&branch=&sex=" + params.sex;
  }
  return (
    <>
      <nav className="navbar bg-light menu_classify" style={{ height: "100%" }}>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/">
              <i className="fa fa-home" /> Trang chủ
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href={url}
              onClick={() => {
                setParams((preState) => {
                  let nextState = { ...preState };
                  nextState.sex = 2;
                  return nextState;
                });
              }}
            >
              <i className="fas fa-male" /> Nam
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href={url}
              onClick={() => {
                setParams((preState) => {
                  let nextState = { ...preState };
                  nextState.sex = 1;
                  return nextState;
                });
              }}
            >
              <i className="fas fa-female" /> Nữ
            </a>
          </li>
          {/* <li className="nav-item">
                        <a className="nav-link" href="#"><i className="fas fa-headphones-alt"></i> Phụ kiện</a>
                    </li> */}
          {/* <li className="nav-item">
                        <a className="nav-link" href="#"><i className="fas fa-gifts"></i> Bộ sưu tập</a>
                    </li> */}
        </ul>
      </nav>
    </>
  );
}

export default memo(styled(MenuClassify)``);
