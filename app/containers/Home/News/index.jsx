import React, { memo, useState, useEffect, useMemo, Component } from "react";
import { Table, Badge, Menu, Dropdown, Space, Button, Input, Spin } from "antd";
import classNames from "classnames";
import moment from "moment";
import _ from "lodash";
import styled from "styled-components";
import * as style from "components/Variables";
import Category1 from "images/category-1.jpg";
import Category2 from "images/category-2.jpg";

const List = memo(({ className, setParams, data, params }) => {
  return (
    <>
      <div
        className="header-img"
        style={{
          position: "relative",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          height: "100%",
          maxHeight: "400px",
          overflow: "hidden",
          background: "#fff",
        }}
      >
        <div
          className="img-item"
          style={{
            position: "relative",
            width: "100%",
            height: "50%",
            overflow: "hidden",
          }}
        >
          <img
            src={Category1}
            width="100%"
            height="100%"
            style={{ objectFit: "cover" }}
          />
          <a
            className="img-text"
            href=""
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              background: "rgba(255, 111, 97, .7)",
              opacity: 0,
              transition: "all 0.3s",
            }}
          >
            <p
              style={{
                margin: "0 0 50px 0",
                padding: "15px",
                width: "100%",
                textAlign: "center",
                color: "#fff",
                fontSize: "16px",
              }}
            >
              Some text goes here that describes the image
            </p>
          </a>
        </div>
        <div
          className="img-item"
          style={{
            position: "relative",
            width: "100%",
            height: "50%",
            overflow: "hidden",
          }}
        >
          <img
            src={Category2}
            width="100%"
            height="100%"
            style={{ objectFit: "cover" }}
          />
          <a
            className="img-text"
            href=""
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              background: "rgba(255, 111, 97, .7)",
              opacity: 0,
              transition: "all 0.3s",
            }}
          >
            <p
              style={{
                margin: "0 0 50px 0",
                padding: "15px",
                width: "100%",
                textAlign: "center",
                color: "#fff",
                fontSize: "16px",
              }}
            >
              Some text goes here that describes the image
            </p>
          </a>
        </div>
      </div>
    </>
  );
});

export default styled(List)`
  // .ant-table-row-expand-icon-cell {
  //   position: sticky;
  //   top: 0;
  //   z-index: 1;
  //   background: red;
  // }
  // .fixDate {
  //   position: sticky;
  //   left: 0px;
  // }
  // .fixRoute {
  //   position: sticky;
  //   left: 120px;
  // }
  // .fixSP {
  //   position: sticky;
  //   left: 300px;
  // }
`;
