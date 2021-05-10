import React, { memo, useState, useEffect, useCallback } from "react";
import { Spin, Button, Form, Select, Modal, Row, Col } from "antd";
import _ from "lodash";
import {
  CloseOutlined,
  CheckOutlined,
  UploadOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { Ui } from "utils/Ui";
import ServiceBase from "utils/ServiceBase";
import TextArea from "antd/lib/input/TextArea";
import { useParams } from "react-router";

const { Option } = Select;
let time = null;
const ModalCreate = memo(
  ({ visible, setVisible }) => {
    const [form] = Form.useForm();
    
    const handleCancel = () => {
      form.resetFields();
      setVisible((preState) => {
        let nextState = { ...preState };
        nextState.isShow = false;
        return nextState;
      });
    };

    return (
      <Modal
        title="Chi tiết đơn hàng"
        visible={_.get(visible, "isShow")}
        onCancel={handleCancel}
        width="50%"
        destroyOnClose
        footer={[]}
      >
        {_.get(visible, "data").length > 0 && (
          <Row gutter={15}>
            <Col md={24}>
              <h3>Địa chỉ nhận hàng</h3>
              <h6>{_.get(visible, "data")[0].name}</h6>
              <p style={{ marginBottom: "0px" }}>
                {_.get(visible, "data")[0].address}
              </p>
              <p>{_.get(visible, "data")[0].phone}</p>
              <h3>Thông tin sản phẩm</h3>
              <Row>
                <Col md={4} sm={4} xs={4} lg={4}>
                  <b>Tên sản phẩm</b>
                </Col>
                <Col md={4} sm={4} xs={4} lg={4}>
                  <b>Ảnh</b>
                </Col>
                <Col md={4} sm={4} xs={4} lg={4}>
                  <b>Số lượng</b>
                </Col>
                <Col md={4} sm={4} xs={4} lg={4}>
                  <b>Giá sản phẩm</b>
                </Col>
                <Col md={4} sm={4} xs={4} lg={4}>
                  <b>Kích cỡ</b>
                </Col>
                <Col md={4} sm={4} xs={4} lg={4}>
                  <b>Màu sắc</b>
                </Col>
              </Row>
              <Row>
                <Col md={4} sm={4} xs={4} lg={4}>
                  {_.get(visible, "array").product_name}
                </Col>
                <Col md={4} sm={4} xs={4} lg={4}>
                  <img src={_.get(visible, "array").product_image} width="100" height="100" />
                </Col>
                <Col md={4} sm={4} xs={4} lg={4}>
                  {_.get(visible, "array").orders_quantity}
                </Col>
                <Col md={4} sm={4} xs={4} lg={4}>
                  {_.get(visible, "array").product_price.toLocaleString()}
                </Col>
                <Col md={4} sm={4} xs={4} lg={4}>
                  {(_.get(visible, "array").size_name)} 
                </Col>
                <Col md={4} sm={4} xs={4} lg={4}>
                  {_.get(visible, "array").color} 
                </Col>
              </Row>
            </Col>
          </Row>
        )}
      </Modal>
    );
  }
);
export default ModalCreate;
