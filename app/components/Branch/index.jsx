/* eslint-disable no-underscore-dangle */
import PropTypes from "prop-types";
import React, { memo, useState, useEffect, useCallback, useRef } from "react";
import styled from "styled-components";
import classNames from "classnames";
import ServiceBase from "utils/ServiceBase";
import * as style from "components/Variables";
import Branch1 from "images/brand-1.png";
import Branch2 from "images/brand-2.png";
import Branch3 from "images/brand-3.png";
import Branch4 from "images/brand-4.png";
import Branch5 from "images/brand-5.png";
import Branch6 from "images/brand-6.png";
import FlexStyle from "containers/Style/flex";
import _ from "lodash";
import { Ui } from "utils/Ui";
const prefix = "app.routing.";
let time = null;
const Branch = memo(({ className }) => {
  const arrData = [];
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [totalLength, setTotalLength] = useState(0);
  const boweload = useCallback(async () => {
    setLoading(true);
    let result = await ServiceBase.requestJson({
      url: "/branch/all",
      method: "GET",
      data: {},
      // data: "",
    });
    if (result.hasErrors) {
      Ui.showErrors(result.errors);
      setLoading(false);
    } else {
      setLoading(false);
      setTotalLength(_.get(result, "value.length"));
      let i = 100;
      let arrData = _.map(_.get(result, "value"), (item, index) => {
        item.key = i++;
        return item;
      });
      if (_.get(result, "value.length") < 12) {
        for (let i = 0; i < 12 - _.get(result, "value.length"); i++) {
          arrData.push(arrData[i]);
        }
      } else {
        for (let i = 0; i < 12; i++) {
          arrData.push(arrData[i]);
        }
      }
      setData(arrData);
    }
  }, []);
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
      <div
        className="brand"
        style={{ background: "#fff", padding: "30px 0", position: "relative" }}
      >
        <div className="container-fluid">
          <div className="brand-slider">
            <div className="slider">
              <div className="slide-track">
                {_.map(data, (item, index) => {
                  return (
                    <div className="slide" key={index}>
                      <img
                        src={item.branches_image}
                        height="100"
                        width="250"
                        alt={item.branches_name}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
export default styled(Branch)`
  @-webkit-keyframes scroll {
    0% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
    100% {
      -webkit-transform: translateX(calc(-250px * 7));
      transform: translateX(calc(-250px * 7));
    }
  }
  .slide img {
    padding: 10px 55px;
  }
  @keyframes scroll {
    0% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
    100% {
      -webkit-transform: translateX(calc(-250px * 7));
      transform: translateX(calc(-250px * 7));
    }
  }
  .slider {
    background: pr;
    height: 100px;
    margin: auto;
    overflow: hidden;
    position: relative;
    width: 1400px;
  }
  .slider::before,
  .slider::after {
    background: linear-gradient(
      to right,
      white 0%,
      rgba(255, 255, 255, 0) 100%
    );
    content: "";
    height: 100px;
    position: absolute;
    width: 200px;
    z-index: 2;
  }
  .slider::after {
    right: 0;
    top: 0;
    -webkit-transform: rotateZ(180deg);
    transform: rotateZ(180deg);
  }
  .slider::before {
    left: 0;
    top: 0;
  }
  .slider .slide-track {
    -webkit-animation: scroll 40s linear infinite;
    animation: scroll 40s linear infinite;
    display: flex;
    width: calc(250px * 14);
  }
  .slider .slide {
    height: 100px;
    width: 250px;
  }
`;
