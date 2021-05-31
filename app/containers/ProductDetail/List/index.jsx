import React, {
  memo,
  useState,
  useEffect,
  useMemo,
  Component,
  useCallback,
} from "react";
import { Avatar, Rate, Comment, Radio, Tooltip, InputNumber } from "antd";
import classNames from "classnames";
import moment from "moment";
import _, { size } from "lodash";
import styled from "styled-components";
import * as style from "components/Variables";
import MenuClassify from "components/MenuClassify";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { $Cookies } from "utils/cookies";
import ServiceBase from "utils/ServiceBase";
import { useHistory } from "react-router-dom";
import { Ui } from "utils/Ui";
import { bindActionCreators } from "redux";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "recompose";
import {
  makeSelectIsAuthenticated,
  makeSelectAppConfig,
  makeActionCart,
} from "containers/App/selectors";
import { actionCart } from "containers/App/actions";


const List = memo(
  ({
    className,
    setParams,
    data,
    params,
    dataHot,
    dataBranch,
    dataSame,
    dataRate,
    actionCart
  }) => {
    data.discount > 0 ? data.discount : 0;
    const images = data.product_more_image;
    const [state, setState] = useState({
      photoIndex: 0,
      isOpen: false,
    });
    let history = useHistory();
    const [count, setCount] = useState(1);
    const onUpdateQuantity = (quantity) => {
      if (quantity > 0 && quantity < data.product_quantity) {
        setCount((preState) => {
          let nextState = { ...preState };
          nextState = quantity;
          return nextState;
        });
      } else {
        Ui.showErrors("Số lượng sản phẩm còn lại không đủ");
      }
    };
    const onChangeQuantity = (quantity) => {
      if (quantity > 0) {
        setCount((preState) => {
          let nextState = { ...preState };
          nextState = quantity;
          return nextState;
        });
      }
    };
    var isMobile = {
      Android: function() {
        return navigator.userAgent.match(/Android/i);
      },
      BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
      },
      iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: function() {
        return (
          navigator.userAgent.match(/IEMobile/i) ||
          navigator.userAgent.match(/WPDesktop/i)
        );
      },
      any: function() {
        return (
          isMobile.Android() ||
          isMobile.BlackBerry() ||
          isMobile.iOS() ||
          isMobile.Opera() ||
          isMobile.Windows()
        );
      },
    };
    const settings = {
      customPaging: function(i) {
        return (
          <>
            <a>
              <img
                src={images[i]}
                onClick={() => setState({ isOpen: true, photoIndex: i })}
              />
            </a>
          </>
        );
      },
      dots: true,
      dotsClass: "slick-dots slick-thumb",
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    const setting = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
    };
    const set = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: isMobile.any() ? 1 : 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
    };
    const [value, setValue] = useState({
      size: data.size[0].value,
      color: data.color[0].value,
      product_id: data.product_id,
    });
    const [color, setColor] = useState();
    const changeSize = async (e) => {
      let param = {
        size_name: e.target.value,
        product_id: data.product_id,
      };
      setValue((preState) => {
        let nextState = { ...preState };
        nextState.size = e.target.value;
        return nextState;
      });
      let result = await ServiceBase.requestJson({
        url: "/product/find-color",
        method: "GET",
        data: param,
      });
      if (result.hasErrors) {
        Ui.showErrors(result.errors);
      } else {
        let i = 0;
        let arrData = _.map(_.get(result, "value.data"), (item, index) => {
          item.key = i++;
          return item;
        });
        setColor(arrData);
        setParams((preState) => {
          let nextState = { ...preState };
          nextState = nextState;
          return nextState;
        });
      }
    };
    const changeColor = (e) => {
      setValue((preState) => {
        let nextState = { ...preState };
        nextState.color = e.target.value;
        return nextState;
      });
    };
    const handleAddProduct = async (item) => {
      const token = $Cookies.get("ERP_REPORT")
        ? JSON.parse($Cookies.get("ERP_REPORT"))
        : "";
      if (token) {
        let newParam = {
          user_id: token.parentId,
          color: value.color,
          size_name: value.size,
          product_id: value.product_id,
          quantity: count,
          discount: item.discount,
        };
        actionCart(newParam);
        let result = await ServiceBase.requestJson({
          url: "/order/add-order",
          method: "POST",
          data: newParam,
        });
        if (result.hasErrors) {
          Ui.showErrors(result.errors);
        } else {
          Ui.showSuccess({ message: "Thêm hàng vào giỏ thành công" });
          setParams((preState) => {
            let nextState = { ...preState };
            nextState = nextState;
            return nextState;
          });
        }
      } else {
        history.push("/signin");
      }
    };
    return (
      <div
        className={classNames({
          [className]: true,
        })}
      >
        <div className="product-detail">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-8">
                <div className="product-detail-top">
                  <div className="row align-items-center">
                    <div className="col-md-5">
                      <Slider
                        {...settings}
                        className="product-slider-single normal-slider"
                        style={{ position: "relative" }}
                      >
                        {_.map(data.product_more_image, (item, key) => {
                          return (
                            <>
                              <div
                                style={{
                                  position: "absolute",
                                  border: "2px solid rgb(255, 221, 43)",
                                  backgroundColor: "rgb(200, 0, 0)",
                                  borderRadius: "0px 40px 40px 0px",
                                  top: "8px",
                                  left: "-8px",
                                }}
                              >
                                <div
                                  style={{
                                    fontWeight: "700",
                                    padding: "4px 12px",
                                    color: "rgb(255, 221, 43)",
                                    fontSize: "14px",
                                  }}
                                >
                                  Giảm {data.discount} %
                                </div>
                              </div>
                              <img
                                src={item}
                                alt="san pham"
                                key={key}
                                onClick={() =>
                                  setState({ isOpen: true, photoIndex: 0 })
                                }
                              />
                            </>
                          );
                        })}
                      </Slider>
                      {state.isOpen && (
                        <Lightbox
                          mainSrc={images[state.photoIndex]}
                          nextSrc={
                            images[(state.photoIndex + 1) % images.length]
                          }
                          prevSrc={
                            images[
                              (state.photoIndex + images.length - 1) %
                                images.length
                            ]
                          }
                          onCloseRequest={() =>
                            setState((preState) => {
                              let nextState = { ...preState };
                              nextState.isOpen = false;
                              return nextState;
                            })
                          }
                          onMovePrevRequest={() =>
                            setState((preState) => {
                              let nextState = { ...preState };
                              nextState.photoIndex =
                                (state.photoIndex + images.length - 1) %
                                images.length;
                              return nextState;
                            })
                          }
                          onMoveNextRequest={() =>
                            setState((preState) => {
                              let nextState = { ...preState };
                              nextState.photoIndex =
                                (state.photoIndex + 1) % images.length;
                              return nextState;
                            })
                          }
                        />
                      )}
                    </div>
                    <div className="col-md-7">
                      <div className="product-content">
                        <div className="title">
                          <h2>{data.product_name}</h2>
                        </div>
                        <div className="ratting">
                          <Rate
                            allowHalf
                            defaultValue={data.product_rate}
                            disabled={true}
                          />
                        </div>
                        <div className="price">
                          <h4>Giá:</h4>
                          <p>
                            {(
                              data.product_price -
                              (data.product_price * data.discount) / 100
                            ).toLocaleString()}{" "}
                            vnđ
                            <span>
                              {data.product_price.toLocaleString()} vnđ
                            </span>
                          </p>
                        </div>
                        <div className="quantity">
                          <h4>Số lượng:</h4>
                          <div className="qty">
                            <button
                              className="btn-minus"
                              onClick={() => onUpdateQuantity(count - 1)}
                            >
                              <i className="fa fa-minus" />
                            </button>
                            <InputNumber
                              value={count}
                              onChange={onChangeQuantity}
                            />
                            <button
                              className="btn-plus"
                              onClick={() => onUpdateQuantity(count + 1)}
                            >
                              <i className="fa fa-plus" />
                            </button>
                          </div>
                        </div>
                        <div className="p-size">
                          <h4>Kích cỡ:</h4>
                          <div className="btn-group btn-group-sm">
                            <Radio.Group
                              options={data.size}
                              onChange={changeSize}
                              // value={value.size}
                              optionType="button"
                              buttonStyle="solid"
                            />
                          </div>
                        </div>
                        <div className="p-color">
                          <h4>Màu sắc:</h4>
                          <div className="btn-group btn-group-sm">
                            <Radio.Group
                              options={color}
                              onChange={changeColor}
                              // value={
                              //   value.color
                              // }
                              optionType="button"
                              buttonStyle="solid"
                            />
                          </div>
                        </div>
                        <div className="action">
                          <a
                            className="btn"
                            onClick={() => handleAddProduct(data)}
                          >
                            <i className="fa fa-shopping-cart" />
                            Thêm vào giỏ
                          </a>
                          {/* <a className="btn" href="#">
                            <i className="fa fa-shopping-bag" />
                            Mua ngay
                          </a> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row product-detail-bottom">
                  <div className="col-lg-12">
                    <ul className="nav nav-pills nav-justified">
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          data-toggle="pill"
                          href="#description"
                        >
                          Chi tiết
                        </a>
                      </li>
                      {/* <li className="nav-item">
                        <a
                          className="nav-link"
                          data-toggle="pill"
                          href="#specification"
                        >
                          Specification
                        </a>
                      </li> */}
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          data-toggle="pill"
                          href="#reviews"
                        >
                          Reviews ({dataRate.length})
                        </a>
                      </li>
                    </ul>

                    <div className="tab-content">
                      <div id="description" className="tab-pane active">
                        <h4>Chi tiết sản phẩm</h4>
                        <p>{data.product_description}</p>
                      </div>
                      {/* <div id="specification" className="tab-pane fade">
                        <h4>Product specification</h4>
                        <ul>
                          <li>Lorem ipsum dolor sit amet</li>
                          <li>Lorem ipsum dolor sit amet</li>
                          <li>Lorem ipsum dolor sit amet</li>
                          <li>Lorem ipsum dolor sit amet</li>
                          <li>Lorem ipsum dolor sit amet</li>
                        </ul>
                      </div> */}
                      <div id="reviews" className="tab-pane fade">
                        <div className="reviews-submit">
                          {_.map(dataRate, (item, key) => {
                            return (
                              <Comment
                                // actions={actions}
                                key={key}
                                author={item.name}
                                avatar={
                                  <Avatar
                                    src={item.user_image}
                                    alt={item.name}
                                  />
                                }
                                content={
                                  <>
                                    <Rate
                                      allowHalf
                                      defaultValue={item.rate}
                                      disabled={true}
                                    />
                                    <p>{item.comment}</p>
                                    {_.map(item.images, (value, index) => {
                                      if (value.length < 10) {
                                        return _.map(value, (v, k) => {
                                          return (
                                            <img
                                              key={k}
                                              src={v}
                                              width="60px"
                                              height="60px"
                                            />
                                          );
                                        });
                                      } else {
                                        return (
                                          <img
                                            key={index * 100}
                                            src={value}
                                            width="60px"
                                            height="60px"
                                          />
                                        );
                                      }
                                    })}
                                  </>
                                }
                                datetime={
                                  <Tooltip
                                    title={moment(item.created_at).format(
                                      "YYYY-MM-DD HH:mm:ss"
                                    )}
                                  >
                                    <span>
                                      {moment(item.created_at).fromNow()}
                                    </span>
                                  </Tooltip>
                                }
                              />
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="product">
                  <div className="section-header">
                    <h1>Sản phẩm tương tự</h1>
                  </div>
                  <div className="align-items-center product-slider product-slider-3">
                    <Slider {...set} style={{ padding: "0px 10px" }}>
                      {_.map(dataSame, (item, key) => {
                        var url =
                          "/chi-tiet-" +
                          item.product_id +
                          "/" +
                          item.product_name;
                        return (
                          <div className="product-item" key={key}>
                            <div className="product-title">
                              <a href="#" style={{ width: "240px" }}>
                                {item.product_name}
                              </a>
                              <div className="ratting">
                                <Rate
                                  allowHalf
                                  defaultValue={item.product_rate}
                                  disabled={true}
                                />
                              </div>
                            </div>
                            <div className="product-image">
                              <a href="#">
                                <img
                                  src={item.product_image}
                                  alt={item.product_name}
                                />
                              </a>
                              <div className="product-action">
                                {/* <a href="#">
                                  <i className="fa fa-cart-plus" />
                                </a> */}
                                <a href={url}>
                                  <i className="fas fa-eye" />
                                </a>
                              </div>
                            </div>
                            <div className="product-price">
                              <h3
                                style={{ fontSize: "20px", paddingTop: "5px" }}
                              >
                                {item.product_price.toLocaleString()}
                                <span> vnđ</span>
                              </h3>
                              <a className="btn" href={url}>
                                <i className="fa fa-shopping-cart" />
                                Buy Now
                              </a>
                            </div>
                          </div>
                        );
                      })}
                    </Slider>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 sidebar">
                {/* <div className="sidebar-widget category">
                  <MenuClassify />
                </div> */}
                <div className="sidebar-widget widget-slider">
                  <h2 className="title">Sản phẩm hot</h2>
                  <Slider {...setting} className="sidebar-slider normal-slider">
                    {_.map(dataHot, (item, key) => {
                      var url =
                        "/chi-tiet-" +
                        item.product_id +
                        "/" +
                        item.product_name;
                      return (
                        <div className="product-item" key={key}>
                          <div className="product-title">
                            <a href="#">{item.poduct_name}</a>
                            <div className="ratting">
                              <Rate
                                allowHalf
                                defaultValue={item.product_rate}
                                disabled={true}
                              />
                            </div>
                          </div>
                          <div className="product-image">
                            <a href="product-detail.html">
                              <img
                                src={item.product_image}
                                alt="Product Image"
                              />
                            </a>
                            <div className="product-action">
                              {/* <a href="#">
                                <i className="fa fa-cart-plus" />
                              </a> */}
                              <a href={url}>
                                <i className="fas fa-eye" />
                              </a>
                            </div>
                          </div>
                          <div className="product-price">
                            <h3>
                              {item.product_price.toLocaleString()}
                              <span>vnđ</span>
                            </h3>
                            <a className="btn" href={url}>
                              <i className="fa fa-shopping-cart" />
                              Mua ngay
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </Slider>
                </div>

                <div className="sidebar-widget brands">
                  <h2 className="title">Thương hiệu</h2>
                  <ul>
                    {_.map(dataBranch, (item, key) => {
                      return (
                        <li onClick={() => onClick(item)} key={key}>
                          <a>{item.branches_name} </a>
                          <span>{item.total}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

const mapStateToProps = createStructuredSelector({
  dataCart: makeActionCart(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      actionCart,
    },
    dispatch
  );
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default styled(compose(withConnect)(List))`
  .product-item {
    padding-right: 20px;
  }
  .product-title a {
    width: 240px;
    display: block;
    display: -webkit-box;
    max-width: 400px;
    height: 16px * 1.3 * 3;
    margin: 0 auto;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .ant-input-number {
    background: #000;
    width: 80px !important;
  }
  .product-detail .tab-content ul li::before {
    content: unset;
    font-family: unset;
    padding-right: 5px;
  }
  .slick-slide.slick-active.slick-current {
    position: relative;
  }
`;
