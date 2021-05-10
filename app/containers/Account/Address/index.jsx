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
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import ServiceBase from "utils/ServiceBase";
import ModalCreate from "./Modal/index";


const dateFormat = "DD-MM-YYYY";
const { confirm } = Modal;

const List = memo(({ className, dataShipPlace, setParams, setLoading }) => {
  const [visible, setVisible] = useState({
    isShow: false,
    isShowModal: false,
    type: "create",
    data: {},
  });
  const onEdit = (e) => {
    setVisible((preState) => {
      let nextState = { ...preState };
      nextState.isShow = true;
      nextState.type = "edit";
      nextState.data = e;
      return nextState;
    });
  };
  const onDelete = (row) => {
    confirm({
      title: "Thông báo",
      icon: <ExclamationCircleOutlined />,
      content: "Bạn có muốn xóa địa chỉ này không?",
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
      url: `/shipplace/delete`,
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
  const onDefault = async (value, item) => {
    let id = value.id;
    let user_id = item.id;
    let result = await ServiceBase.requestJson({
      url: "/shipplace/default",
      method: "POST",
      data: {
        id: id,
        user_id: user_id,
      },
    });
    if (result.hasErrors) {
      Ui.showErrors(result.errors);
    } else {
      Ui.showSuccess({ message: "Cập nhật thành công" });
      setParams((preState) => {
        let nextState = { ...preState };
        nextState = nextState;
        return nextState;
      });
    }
  };
  
  return (
    <>
      <ModalCreate
        visible={visible}
        setVisible={setVisible}
        setParams={setParams}
      />
      <div
        className="tab-pane fade"
        id="address-tab"
        role="tabpanel"
        aria-labelledby="address-nav"
      >
        <Row>
          <Col span={8}>
            <h4>Địa chỉ của tôi</h4>
          </Col>
          <Col span={4} offset={12}>
            <Button
              type="primary"
              htmlType="submit"
              danger
              style={{
                padding: "10px 20px 10px 20px",
                float: "right",
                height: "100%",
              }}
              onClick={() => {
                setVisible((preState) => {
                  let nextState = { ...preState };
                  nextState.type = "create";
                  nextState.isShow = true;
                  return nextState;
                });
              }}
            >
              <i className="fas fa-plus" /> &nbsp; Thêm mới
            </Button>
          </Col>
        </Row>
        {dataShipPlace.length > 0 &&
          _.map(dataShipPlace, (item, key) => {
            return _.map(item.ship_place, (value, index) => {
              return (
                <Row>
                  <Divider style={{ margin: "16px 0px" }} />
                  <Col
                    sm={4}
                    md={4}
                    xs={4}
                    lg={4}
                    style={{
                      textAlign: "right",
                      paddingRight: "20px",
                    }}
                  >
                    <p>Họ & Tên</p>
                    <p>Số Điện Thoại</p>
                    <p>Địa Chỉ</p>
                  </Col>
                  <Col sm={16} md={16} xs={16} lg={16}>
                    <p key={key + 1}>
                      {item.name}
                      {value.default == 1 ? (
                        <Tag style={{ marginLeft: "10px" }} color="#87d068">
                          Mặc định
                        </Tag>
                      ) : (
                        ""
                      )}
                    </p>
                    <p key={(key + 1) * 100}>{item.phone}</p>
                    <p key={(key + 1) * 1000}>{value.address}</p>
                  </Col>
                  <Col
                    sm={4}
                    md={4}
                    xs={4}
                    lg={4}
                    style={{ textAlign: "right" }}
                  >
                    <Space size="middle">
                      <Tooltip placement="topLeft" title="Sửa">
                        <Button
                          type="link"
                          icon={<EditOutlined />}
                          onClick={(e) => onEdit(value)}
                        />
                      </Tooltip>
                      <Tooltip placement="topLeft" title="Xóa">
                        <Button
                          type="link"
                          icon={<DeleteOutlined />}
                          onClick={() => onDelete(value)}
                        />
                      </Tooltip>
                    </Space>
                    {value.default == 1 ? (
                      <Button
                        danger
                        disabled
                        style={{
                          padding: "5px 10px 5px 10px",
                          float: "right",
                          marginTop: "10px",
                        }}
                      >
                        Thiết lập mặc định
                      </Button>
                    ) : (
                      <Button
                        danger
                        style={{
                          padding: "5px 10px 5px 10px",
                          float: "right",
                          marginTop: "10px",
                        }}
                        onClick={() => onDefault(value, item)}
                      >
                        Thiết lập mặc định
                      </Button>
                    )}
                  </Col>
                </Row>
              );
            });
          })}
      </div>
    </>
  );
});

export default styled(List)``;
