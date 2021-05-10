import React, {
  memo,
  useState,
  useEffect,
  useMemo,
  Component,
  useCallback,
} from "react";
import {
  Button,
  Input,
  Divider,
  Form,
  InputNumber,
  Row,
  Col,
  DatePicker,
  Upload,
  Modal,
  Avatar,
  Space,
  Tooltip,
  Radio,
  Tag,
} from "antd";
import classNames from "classnames";
import moment from "moment";
import _ from "lodash";
import styled from "styled-components";
import * as style from "components/Variables";
import { Ui } from "utils/Ui";
import {
  EyeOutlined,
  CheckOutlined,
  ExclamationCircleOutlined,
  CloseOutlined,
  CheckSquareFilled,
  CloseSquareFilled,
  StarFilled,
} from "@ant-design/icons";
import ServiceBase from "utils/ServiceBase";
import Truck from "images/truck.png";
import ModalCreate from "./Modal/index";
import ModalRate from "./ModalRate/index";

const { confirm } = Modal;

const Order = memo(
  ({ className, setParams, setLoading, dataOrder, params }) => {
    const [visible, setVisible] = useState({
      isShow: false,
      isShowModal: false,
      type: "create",
      data: {},
      array: {},
    });
    const [show, setShow] = useState({
      isShow: false,
      data: {},
    });

    const onSuccess = async (e) => {
      let result = await ServiceBase.requestJson({
        url: `/order/update-status`,
        method: "POST",
        data: { orders_id: e, orders_status: 2 },
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
    const onCancel = (row) => {
      confirm({
        title: "Thông báo",
        icon: <ExclamationCircleOutlined />,
        content: "Bạn có muốn hủy đơn hàng này không?",
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
        url: `/order/update-status`,
        method: "POST",
        data: { orders_id: row, orders_status: 3 },
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
    const onShow = async (item) => {
      let result = await ServiceBase.requestJson({
        url: `/shipplace/default`,
        method: "GET",
        data: { id: params.id },
      });
      if (result.hasErrors) {
        Ui.showErrors(result.errors);
      } else {
        Ui.showSuccess({ message: _.get(result, "value.message") });
        setVisible((preState) => {
          let nextState = { ...preState };
          nextState.isShow = true;
          nextState.data = _.get(result, "value");
          nextState.array = item;
          return nextState;
        });
      }
    };
    const onRate = async (item) => {
      let result = await ServiceBase.requestJson({
        url: `/shipplace/default`,
        method: "GET",
        data: { id: params.id },
      });
      if (result.hasErrors) {
        Ui.showErrors(result.errors);
      } else {
        Ui.showSuccess({ message: _.get(result, "value.message") });
        setVisible((preState) => {
          let nextState = { ...preState };
          nextState.isShow = true;
          nextState.data = _.get(result, "value");
          nextState.array = item;
          return nextState;
        });
      }
    };

    return (
      <>
        {visible.isShow && (
          <ModalCreate
            visible={visible}
            setVisible={setVisible}
            setParams={setParams}
          />
        )}
        {show.isShow && (
          <ModalRate
            show={show}
            setShow={setShow}
            setParams={setParams}
            params={params}
          />
        )}
        <div
          className="tab-pane fade"
          id="orders-tab"
          role="tabpanel"
          aria-labelledby="orders-nav"
        >
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th>STT</th>
                  <th>Sản phẩm</th>
                  <th>Ngày đặt</th>
                  <th>Giá</th>
                  <th>Số lượng</th>
                  <th>Tổng tiền</th>
                  <th>Trạng thái</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {dataOrder.length > 0 &&
                  _.map(dataOrder, (item, key) => {
                    return (
                      <tr key={key}>
                        <td>{key + 1}</td>
                        <td>
                          {item.product_name}{" "}
                          <img
                            src={item.product_image}
                            width="80"
                            height="80"
                          />
                        </td>
                        <td>{moment(item.created_at).format("YYYY-MM-DD")}</td>
                        <td>{item.product_price.toLocaleString()}</td>
                        <td>{item.orders_quantity}</td>
                        <td>
                          {(
                            item.orders_quantity * item.product_price +
                            30000
                          ).toLocaleString()}
                        </td>
                        {item.orders_status === 1 && (
                          <td>
                            <Tooltip
                              placement="topLeft"
                              title="Đang vận chuyển"
                            >
                              <img src={Truck} width="100" height="100" />
                            </Tooltip>{" "}
                          </td>
                        )}
                        {item.orders_status === 2 && (
                          <td>
                            <Tooltip placement="topLeft" title="Đã nhận hàng">
                              <CheckSquareFilled
                                style={{ color: "green", fontSize: "40px" }}
                              />
                            </Tooltip>{" "}
                          </td>
                        )}
                        {item.orders_status === 3 && (
                          <td>
                            <Tooltip placement="topLeft" title="Đã hủy">
                              <CloseSquareFilled
                                style={{ color: "#FF6F61", fontSize: "40px" }}
                              />
                            </Tooltip>{" "}
                          </td>
                        )}
                        <td>
                          <Tooltip placement="topLeft" title="Chi tiết">
                            <button
                              className="btn"
                              style={{ marginRight: "10px" }}
                              onClick={() => onShow(item)}
                            >
                              <EyeOutlined />
                            </button>
                          </Tooltip>
                          {item.orders_status === 2 && item.orders_type === 2 && (
                            <Tooltip placement="topLeft" title="Đánh giá">
                              <button
                                className="btn"
                                style={{ marginRight: "10px" }}
                                onClick={() => {
                                  setShow((preState) => {
                                    let nextState = { ...preState };
                                    nextState.isShow = true;
                                    nextState.data = item;
                                    return nextState;
                                  });
                                }}
                              >
                                <StarFilled />
                              </button>
                            </Tooltip>
                          )}
                          {item.orders_status === 1 && (
                            <>
                              <Tooltip placement="topLeft" title="Hủy đơn hàng">
                                <button
                                  className="btn"
                                  style={{ marginRight: "10px" }}
                                  onClick={() => onCancel(item.orders_id)}
                                >
                                  <CloseOutlined />
                                </button>
                              </Tooltip>
                              <Tooltip
                                placement="topLeft"
                                title="Đã nhận được hàng"
                              >
                                <button
                                  className="btn"
                                  onClick={() => onSuccess(item.orders_id)}
                                >
                                  <CheckOutlined />
                                </button>
                              </Tooltip>
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
);

export default styled(Order)``;
