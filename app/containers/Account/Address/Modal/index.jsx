import React, { memo, useState, useEffect, useCallback } from "react";
import {
  Spin,
  Button,
  Form,
  Select,
  Modal,
  Row,
  Col,
} from "antd";
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
  ({ visible, setVisible, setRow, row, data, setData, setParams }) => {
    const [form] = Form.useForm();
    const user_id = useParams();
    const [objForm, setObjForm] = useState({});
    const handleOk = () => {
      setVisible((preState) => {
        let nextState = { ...preState };
        nextState.isShow = false;
        return nextState;
      });
    };
    const handleCancel = () => {
      form.resetFields();
      setVisible((preState) => {
        let nextState = { ...preState };
        nextState.isShow = false;
        return nextState;
      });
    };

    const type = _.get(visible, "type");

    const onFinish = async (values) => {
      let row = _.get(visible, "data");
      console.log(row);
      let params = {};
      let url = "";
      if (type === "create") {
        url = "/shipplace/create";
        params = {
          user_id: user_id.id,
          address: _.get(values, "address"),
        };
      } else {
        url = "/shipplace/update";
        params = {
          id: row.id,
          user_id: user_id.id,
          address: _.get(values, "address"),
        }
      }
      let result = await ServiceBase.requestJson({
        url: url,
        method: "POST",
        data: params,
      });
      if (result.hasErrors) {
        Ui.showErrors(result.errors);
      } else {
        let message = "";
        if (type === "create") {
          message = "Thêm mới địa chỉ thành công";
        } else {
          message = "Cập nhật địa chỉ thành công";
        }
        Ui.showSuccess({ message: message });
        setVisible((preState) => {
          let nextState = { ...preState };
          nextState.isShow = false;
          return nextState;
        });
        setParams((preState) => {
          let nextState = { ...preState };
          nextState = nextState;
          return nextState;
        });
        form.resetFields();
      }
    };

    const boweload = useCallback(async () => {
      if (type === "edit") {
        form.setFieldsValue(_.get(visible, "data"));
      }
    }, [_.get(visible, "data")]);
    useEffect(() => {
      setTimeout(boweload, 0);
    }, [boweload]);

    return (
      <Modal
        title={type === "create" ? "Thêm mới địa chỉ" : "Cập nhật địa chỉ"}
        visible={_.get(visible, "isShow")}
        onCancel={handleCancel}
        width="50%"
        destroyOnClose
        footer={[]}
      >
        <Form form={form} name="control-ref" onFinish={onFinish}>
          <Row gutter={15}>
            <Col md={12}>
              <Form.Item shouldUpdate={true} noStyle>
                {({ getFieldValue }) => (
                  <Form.Item
                    name="address"
                    rules={[
                      { required: true, message: "Vui lòng nhập dữ liệu" },
                    ]}
                  >
                    <TextArea
                      placeholder="Địa chỉ"
                      value={getFieldValue("address")}
                    />
                  </Form.Item>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{background: "#FF6F61"}}>
              {type === "create" ? "Tạo mới" : "Cập nhật"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
);
export default ModalCreate;
