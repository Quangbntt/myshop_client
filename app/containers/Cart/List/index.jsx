import React, { memo, useState, useEffect, useMemo, Component } from "react";
import {
  Table,
  Badge,
  Menu,
  Dropdown,
  Space,
  Button,
  Input,
  Radio,
  InputNumber,
  Modal,
  Empty,
} from "antd";
import classNames from "classnames";
import moment from "moment";
import _ from "lodash";
import styled from "styled-components";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import ServiceBase from "utils/ServiceBase";
import { Ui } from "utils/Ui";
import { useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "recompose";
import {
  makeSelectIsAuthenticated,
  makeSelectAppConfig,
  makeActionDelCart,
} from "containers/App/selectors";
import { actionDelCart } from "containers/App/actions";

const { confirm } = Modal;

const List = memo(
  ({ className, setParams, data, params, count, setCount, dataPlace, actionDelCart }) => {
    const history = useHistory();
    //Hàm tăng giảm số lượng sản phẩm trong giỏ
    const onUpdateQuantity = (quantity, key) => {
      if (quantity > 0) {
        _.map(data, (item, index) => {
          return key == index
            ? (item.quantity = quantity)
            : (item.quantity = item.quantity);
        });
        setCount((preState) => {
          let nextState = { ...preState };
          nextState = quantity;
          return nextState;
        });
      }
    };
    //Hàm xóa sản phẩm trong giỏ
    const onChangeQuantity = (quantity) => {
      if (quantity > 0) {
        setCount((preState) => {
          let nextState = { ...preState };
          nextState = quantity;
          return nextState;
        });
      }
    };
    const onDelete = (row) => {
      confirm({
        title: "Thông báo",
        icon: <ExclamationCircleOutlined />,
        content: "Bạn có muốn xóa sản phẩm này không?",
        okText: "Đồng ý",
        cancelText: "Hủy",
        onOk() {
          onDelteApi(row);
        },
        onCancel() {},
      });
    };
    const onDelteApi = async (row) => {
      actionDelCart(row);
      let result = await ServiceBase.requestJson({
        url: `/order/delete-cart`,
        method: "POST",
        data: { id: row.id },
      });
      if (result.hasErrors) {
        Ui.showErrors(result.errors);
      } else {
        Ui.showSuccess({ message: _.get(result, "value.message") });
        setParams((preState) => {
          let nextState = { ...preState };
          nextState = nextState;
          return nextState;
        });
      }
    };
    let total = 0;
    const arrSizeId = [];
    const arrCartId = [];
    const arrQuantity = [];
    const arrPrice = [];
    const arrCost = [];
    _.map(data, (item, index) => {
      total +=
        item.quantity * item.product_price -
        (item.quantity * item.product_price * item.discount) / 100;
      arrSizeId.push(item.size_id);
      arrQuantity.push(item.quantity);
      arrCartId.push(item.id);
      arrPrice.push(
        item.product_price - (item.product_price * item.discount) / 100
      );
      arrCost.push(item.product_promotion);
    });
    const onChangePlace = (e) => {
      setPlace(e.target.value);
    };
    //Kiểm tra xem địa chỉ giao hàng nào là địa chỉ mặc định
    const result = dataPlace[0].ship_place.filter((x) => x.default == 1);
    const [place, setPlace] = useState(result.length > 0 ? result[0].id : 0);

    const handleBuy = async () => {
      if (place == null || place == 0) {
        var url = "/tai-khoan/" + params.user_id;
        history.push(url);
        Ui.showErrors(["Bạn cần tạo địa chỉ trước"]);
      } else {
        let paramsBuy = {
          product_size_id: arrSizeId,
          user_id: params.user_id,
          shipplace_id: place,
          orders_status: 1,
          orders_quantity: arrQuantity,
          product_price: arrPrice,
          cart_id: arrCartId,
          orders_type: 2,
          product_cost: arrCost,
        };
        actionDelCart(paramsBuy);
        let result = await ServiceBase.requestJson({
          url: `/order/addProduct`,
          method: "POST",
          data: paramsBuy,
        });
        if (result.hasErrors) {
          Ui.showErrors(result.errors);
        } else {
          Ui.showSuccess({ message: "Mua hàng thành công" });
          setParams((preState) => {
            let nextState = { ...preState };
            nextState = nextState;
            return nextState;
          });
        }
      }
    };
    return (
      <div
        className={classNames({
          [className]: true,
        })}
      >
        {data.length > 0 ? (
          <div className="cart-page">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-8">
                  <div className="cart-page-inner">
                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <thead className="thead-dark">
                          <tr>
                            <th>Sản phẩm</th>
                            <th>Giá</th>
                            <th>Số lượng</th>
                            <th>Thành tiền</th>
                            <th>Xóa</th>
                          </tr>
                        </thead>
                        <tbody className="align-middle">
                          {_.map(data, (item, key) => {
                            return (
                              <tr>
                                <td>
                                  <div className="img">
                                    <a href="#">
                                      <img
                                        src={item.product_image}
                                        alt="Image"
                                      />
                                    </a>
                                    <p>{item.product_name}</p>
                                  </div>
                                </td>
                                <td>
                                  {item.discount > 0
                                    ? item.product_price -
                                      (item.product_price * item.discount) / 100
                                    : item.product_price}
                                </td>
                                <td>
                                  <div className="qty">
                                    <button
                                      className="btn-minus"
                                      onClick={() =>
                                        onUpdateQuantity(item.quantity - 1, key)
                                      }
                                    >
                                      <i className="fa fa-minus" />
                                    </button>
                                    <InputNumber
                                      value={item.quantity}
                                      onChange={onChangeQuantity}
                                    />
                                    <button
                                      className="btn-plus"
                                      onClick={() =>
                                        onUpdateQuantity(item.quantity + 1, key)
                                      }
                                    >
                                      <i className="fa fa-plus" />
                                    </button>
                                  </div>
                                </td>
                                <td>
                                  {item.discount > 0
                                    ? (item.product_price -
                                        (item.product_price * item.discount) /
                                          100) *
                                      item.quantity
                                    : item.product_price * item.quantity}
                                </td>
                                <td>
                                  <button onClick={() => onDelete(item)}>
                                    <i className="fa fa-trash" />
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="cart-page-inner">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="cart-content">
                          <h1>Địa chỉ nhận hàng</h1>
                          <Radio.Group
                            name="radiogroup"
                            defaultValue={result.length > 0 && result[0].id}
                            onChange={onChangePlace}
                          >
                            {_.map(dataPlace, (item, key) => {
                              return _.map(item.ship_place, (value, index) => {
                                return (
                                  <>
                                    <Radio value={value.id}>
                                      <b>
                                        {item.name} - {item.phone}
                                      </b>
                                      <p style={{ marginBottom: "0px" }}>
                                        {value.address}
                                      </p>
                                    </Radio>
                                  </>
                                );
                              });
                            })}
                          </Radio.Group>
                        </div>
                      </div>
                      {/* <div className="col-md-12">
                  <div className="coupon">
                    <input type="text" placeholder="Coupon Code" />
                    <button>Apply Code</button>
                  </div>
                </div> */}
                      <div className="col-md-12">
                        <div className="cart-summary">
                          <div className="cart-content">
                            <h1>Thanh toán</h1>
                            <p>
                              Tổng tiền<span>{total.toLocaleString()}</span>
                            </p>
                            <p>
                              Phí ship<span>30000</span>
                            </p>
                            <p>
                              Phương thức thanh toán
                              <span>Thanh toán khi nhận hàng</span>
                            </p>
                            <p style={{ fontSize: "11px" }}>
                              Ghi chú: Thời gian giao hàng dự kiến 3-7 ngày từ
                              ngày đặt hàng
                            </p>
                            <h2>
                              Thành tiền
                              <span>{(total + 30000).toLocaleString()}</span>
                            </h2>
                          </div>
                          <div className="cart-btn">
                            <button onClick={handleBuy}>Mua hàng</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Empty
            style={{ height: "300px" }}
            description="Chưa có sản phẩm nào trong giỏ"
          />
        )}
      </div>
    );
  }
);
const mapStateToProps = createStructuredSelector({
  dataDelCart: makeActionDelCart(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      actionDelCart,
    },
    dispatch
  );
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default styled(compose(withConnect)(List))`
  .ant-input-number {
    background: #000;
    width: 80px !important;
  }
  .cart-page .table .qty {
    width: 150px;
  }
`;
