import React, { memo, useState, useEffect, useMemo, Component } from "react";
import { Table, Row, Col } from "antd";
import classNames from "classnames";
import moment from "moment";
import _ from "lodash";
import styled from "styled-components";
import * as style from "components/Variables";
import MenuClassify from "components/MenuClassify";
import Pagination from "components/Paginate/index";

const List = memo(
  ({ className, setParams, data, dataDesc, dataTop, params, totalLength }) => {
    let url1 = "/tin-tuc/" + `${dataTop[0].id}`;
    let url2 = "/tin-tuc/" + `${dataTop[1].id}`;
    let url3 = "/tin-tuc/" + `${dataTop[2].id}`;
    return (
      <div
        className={classNames({
          [className]: true,
        })}
      >
        <div className="row" style={{ marginBottom: "30px" }}>
          <div className="col-md-9">
            <div className="newsx mgbt20">
              <div className="list">
                <div className="col1">
                  <article>
                    <div className="item">
                      <div className="img rlt">
                        <a
                          title={dataTop.length > 0 ? dataTop[0].title : ""}
                          href={url1}
                        >
                          <img
                            src={dataTop.length > 0 ? dataTop[0].image : ""}
                            data-original={
                              dataTop.length > 0 ? dataTop[0].image : ""
                            }
                            alt={dataTop.length > 0 ? dataTop[0].title : ""}
                            className="width-100 initial loaded"
                            data-was-processed="true"
                          />
                        </a>
                      </div>
                      <div className="inner">
                        <header>
                          <h2 className="name cxanh">
                            <a
                              className="md5"
                              href={url1}
                              title={dataTop.length > 0 ? dataTop[0].title : ""}
                            >
                              {dataTop.length > 0 && dataTop[0].title}
                            </a>
                          </h2>
                        </header>
                        <div className="desc">
                          {dataTop.length > 0 && dataTop[0].review}
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
                <div className="col2">
                  <article>
                    <div className="item">
                      <div className="img">
                        <a
                          title={dataTop.length > 0 ? dataTop[1].title : ""}
                          href={url2}
                        >
                          <img
                            src={dataTop.length > 0 ? dataTop[1].image : ""}
                            data-original={
                              dataTop.length > 0 && dataTop[1].image
                            }
                            alt={dataTop.length > 0 ? dataTop[1].title : ""}
                            className="width-100 initial loaded"
                            data-was-processed="true"
                          />
                        </a>
                      </div>
                      <div className="inner">
                        <header>
                          <h2 className="name cxanh">
                            <a
                              className="m5"
                              title={dataTop.length > 0 ? dataTop[1].title : ""}
                              href={url2}
                            >
                              {dataTop.length > 0 && dataTop[1].review}
                            </a>
                          </h2>
                        </header>
                      </div>
                    </div>
                  </article>
                  <article>
                    <div className="item">
                      <div className="img">
                        <a
                          title={dataTop.length > 0 ? dataTop[2].title : ""}
                          href={url3}
                        >
                          <img
                            src={dataTop.length > 0 ? dataTop[2].image : ""}
                            data-original={
                              dataTop.length > 0 && dataTop[2].image
                            }
                            alt={dataTop.length > 0 ? dataTop[2].title : ""}
                            className="width-100 initial loaded"
                            data-was-processed="true"
                          />
                        </a>
                      </div>
                      <div className="inner">
                        <header>
                          <h2 className="name cxanh">
                            <a
                              className="m5"
                              title={dataTop.length > 0 ? dataTop[2].title : ""}
                              href={url3}
                            >
                              {dataTop.length > 0 && dataTop[2].review}
                            </a>
                          </h2>
                        </header>
                      </div>
                    </div>
                  </article>{" "}
                </div>
              </div>
            </div>
            <Row>
              {_.map(data, (item, key) => {
                let url = "/tin-tuc/" + item.id;
                return (
                  <Col sm={8} lg={8} lg={8} xs={8} key={key}>
                    <article className="bxDoiSbIt">
                      <h2 style={{ marginBottom: "0px", marginTop: "10px" }}>
                        <span className="nwsTit postname">
                          <a title={item.title} href={url}>
                            {item.title}
                          </a>
                        </span>
                      </h2>
                      <Row>
                        <Col sm={8} lg={8} xs={8} md={8}>
                          <span className="imgFlt imgNws">
                            <a title={item.title} href={url}>
                              <img
                                src={item.image}
                                data-original="https://cdn.24h.com.vn/upload/2-2021/images/2021-04-27/medium/1619528578-495-thumbnail-width640height480.jpg"
                                alt={item.title}
                                className="width-100 initial loaded"
                                data-was-processed="true"
                              />
                            </a>
                          </span>
                        </Col>
                        <Col sm={16} lg={16} xs={16} md={16}>
                          <div className="parent">
                            <div className="block-ellipsis">
                              <p>{item.review}</p>
                            </div>
                          </div>
                          <span className="nwsTit">
                            <span className="updTm dated">
                              <span className="updTm">{item.created_at}</span>
                            </span>
                          </span>
                        </Col>
                      </Row>
                    </article>
                  </Col>
                );
              })}
            </Row>
            <Pagination
              params={params}
              total={totalLength}
              setParams={setParams}
            />
          </div>
          <div className="col-md-3">
            <section className="mrT5 mgbt10">
              <header
                className="grnBxTit grnBxTit269"
                style={{ height: "40px" }}
              >
                <h3> Tin tức mới nhất</h3> <div className="lined" />
              </header>
              <div className="grnBxCntGrn grnBxCntGrn269 bx4Tbg bx4Tbg269">
                {_.map(dataDesc, (item, key) => {
                  let url = "/tin-tuc/" + item.id;
                  return (
                    <>
                      <div className="clF pdB5" />
                      <article id="itemp_pr_2015_4t1_0" key={key}>
                        <span className="imgFltT4 imgNwsHm">
                          <a rel="sponsored" href={url} title={item.title}>
                            <img
                              src={item.image}
                              data-original={item.image}
                              alt={item.title}
                              className="width-100 initial loaded"
                              data-was-processed="true"
                            />{" "}
                          </a>
                        </span>
                        <header className="nwsTit">
                          <div className="parent2">
                            <div className="block-ellipsis">
                              <a>{item.review}</a>
                            </div>
                          </div>
                          {/* <a rel="sponsored" href={url} title={item.title}>
                            {item.review}
                          </a> */}
                        </header>
                      </article>
                    </>
                  );
                })}
              </div>
              <div className="clF" />
            </section>
          </div>
        </div>
      </div>
    );
  }
);

export default styled(List)`
  .mgbt20 {
    margin-bottom: 20px;
  }
  .newsx .col1 {
    float: left;
    width: 658px;
    height: 333px;
    border-right: 1px solid #e0e0e0;
    padding-right: 10px;
  }
  .newsx .item {
    position: relative;
    margin-bottom: 10px;
  }
  .newsx .col1 .img {
    height: 333px;
  }
  .rlt {
    position: relative;
  }
  a {
    text-decoration: none;
  }
  .width-100 {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .newsx .inner {
    position: absolute;
    bottom: 0;
    padding: 10px;
    left: 0;
    right: 0;
    background: url(//cdn.24h.com.vn/images/Rectangle-10.png) no-repeat center
      bottom;
    background-size: 100% 100%;
    padding-top: 50px;
  }
  .newsx .col1 .name a {
    margin-bottom: 10px;
  }
  .newsx .col1 .name a {
    font-size: 20px;
  }
  .newsx .name a {
    display: inline-block;
    font-size: 13px;
    font-weight: 600;
    color: #fff !important;
    transition: 0.5s;
    -webkit-transition: 0.5s;
    -moz-transition: 0.5s;
    -o-transition: 0.5s;
    margin-bottom: 0;
  }
  .newsx .col2 {
    padding-left: 680px;
  }
  .newsx .col2 .img {
    height: 160px;
  }
  .newsx .col2 .inner {
    bottom: -3px;
  }
  .newsx .col1 .desc {
    font-size: 15px;
    color: #f1f1f1;
  }
  .inner header {
    height: 50px;
  }
  .postx .imgNws {
    width: 130px;
    height: 98px;
  }
  .imgFlt {
    float: left;
    margin-right: 10px;
    display: block;
    position: relative;
  }
  .nwsTit {
    display: block;
    color: #333;
    padding: 0 0 5px;
    margin: 0;
  }
  .bxDoiSbIt .nwsTit a {
    font-weight: 600;
    display: block;
    height: 40px;
    overflow: hidden;
  }
  .postname a {
    font-size: 17px;
  }
  .postx .imgNws img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .imgNws {
    width: 110px;
    height: 90px;
  }
  .updTm {
    color: #999;
    padding-bottom: 5px;
    font-weight: 500;
  }
  .dated .updTm {
    font-size: 11px;
  }
  .grnBxTit {
    color: #ff6f61;
    line-height: 30px;
    margin-bottom: 5px;
  }
  .grnBxTit269 h3 {
    margin: 0;
    font-weight: 600;
    font-size: 17px;
    text-align: left;
    display: block;
    text-transform: uppercase;
    word-spacing: -1px;
    padding-bottom: 10px;
  }
  .lined {
    border-bottom: 2px solid #ff6f61;
    display: block;
    width: 100%;
    margin-top: -3px;
  }
  .bx4Tbg {
    background: url(//cdn.24h.com.vn/images/2014/box4T-bg.png) repeat;
    padding-top: 0;
    padding-bottom: 0;
    display: inline-block;
    width: 300px;
    background: none;
  }
  .bx4Tbg .imgNwsHm {
    width: 100px;
    height: 75px;
  }
  .imgFltT4 {
    float: left;
    border: #ebebeb solid 1px;
    margin-right: 10px;
    display: block;
    background: #f5f5f5;
    position: relative;
  }
  .imgNwsHm {
    width: 120px;
    height: 90px;
  }
  .nwsTit {
    display: block;
    color: #333;
    padding: 0 0 5px;
    margin: 0;
  }
  .bx4Tbg .nwsTit a {
    font-size: 13px;
    font-weight: 400;
    color: #252525;
    line-height: 17px;
  }
  .bCQQGC header {
    padding: 0;
    height: 30px;
    line-height: inherit;
  }
  header.grnBxTit.grnBxTit269 h3 {
    color: #ff6f61;
  }
  .parent {
    width: 220px;
  }
  .parent2 {
    width: 33npm 0px;
  }
  .block-ellipsis {
    display: block;
    display: -webkit-box;
    max-width: 100%;
    height: 69px;
    margin: 0 auto;
    font-size: 14px;
    line-height: 1;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
