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

const { confirm } = Modal;

const List = memo(
  ({ className, setParams, data, params, count, setCount, dataPlace }) => {
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
    const arrQuantity = [];
    const arrPrice = [];
    const arrCost = [];
    _.map(data, (item, index) => {
      total += item.quantity * item.product_price;
      arrSizeId.push(item.size_id);
      arrQuantity.push(item.quantity);
      arrPrice.push(item.product_price);
      arrCost.push(item.product_promotion);
    });
    const onChangePlace = (e) => {
      setPlace(e.target.value);
    };
    //Kiểm tra xem địa chỉ giao hàng nào là địa chỉ mặc định
    const result = dataPlace[0].ship_place.filter((x) => x.default == 1);
    const [place, setPlace] = useState(result[0].id);

    // const handleBuy = async () => {
    //   let paramsBuy = {
    //     product_size_id: arrSizeId,
    //     user_id: params.user_id,
    //     shipplace_id: place,
    //     orders_status: 1,
    //     orders_quantity: arrQuantity,
    //     product_price: arrPrice,
    //     orders_type: 2,
    //     product_cost: arrCost,
    //   };
    //   let result = await ServiceBase.requestJson({
    //     url: `/order/addProduct`,
    //     method: "POST",
    //     data: paramsBuy,
    //   });
    //   if (result.hasErrors) {
    //     Ui.showErrors(result.errors);
    //   } else {
    //     Ui.showSuccess({ message: "Mua hàng thành công" });
    //     setParams((preState) => {
    //       let nextState = { ...preState };
    //       nextState = nextState;
    //       return nextState;
    //     });
    //   }
    // };
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
                <div className="col-lg-12">
                  <div className="cart-page-inner">
                    <div className="table-responsive" />
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

export default styled(List)`
  .ant-input-number {
    background: #000;
    width: 80px !important;
  }
  .cart-page .table .qty {
    width: 150px;
  }
`;
