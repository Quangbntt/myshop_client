import React, { memo, useState, useEffect, useCallback } from "react";
import { Button, Form, Select, Modal, Row, Col, Rate, Upload } from "antd";
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
import { storage } from "../../../../firebase/index";

const urlChildArr = [];
const ModalRate = memo(({ show, setShow, params, setParams }) => {
  const [form] = Form.useForm();
  const handleCancel = () => {
    form.resetFields();
    setShow((preState) => {
      let nextState = { ...preState };
      nextState.isShow = false;
      return nextState;
    });
  };
  //Upload image to firebase
  const [image, setImage] = useState(null);
  const [urlImage, setUrlImage] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            urlChildArr.push(url);
            setUrlImage(url);
          });
      }
    );
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const desc = ["Tồi tệ", "Chưa hài lòng", "Bình thường", "Tốt", "Tuyệt vời"];
  const onFinish = async (values) => {
    let row = _.get(show, "data");
    let param = {
      product_id: row.product_id,
      orders_id: row.orders_id,
      comment: _.get(values, "comment"),
      rate: _.get(values, "rate"),
      customer_id: params.id,
      image: urlChildArr,
    };

    let result = await ServiceBase.requestJson({
      url: "/feedback-product/create",
      method: "POST",
      data: param,
    });
    if (result.hasErrors) {
      Ui.showErrors(result.errors);
    } else {
      let message = "";
      message = "Đánh giá thành công";
      Ui.showSuccess({ message: message });
      setShow((preState) => {
        let nextState = { ...preState };
        nextState.isShow = false;
        return nextState;
      });
      setParams((preState) => {
        let nextState = { ...preState };
        nextState = nextState;
        return nextState;
      });
    }
  };
  return (
    <Modal
      title="Đánh giá sản phẩm"
      visible={_.get(show, "isShow")}
      onCancel={handleCancel}
      width="50%"
      destroyOnClose
      footer={[]}
    >
      {_.get(show, "data") && (
        <Form form={form} name="control-ref" onFinish={onFinish}>
          <Row gutter={15}>
            <Col md={24}>
              <Form.Item shouldUpdate={true} noStyle>
                {({ getFieldValue }) => (
                  <Form.Item
                    name="comment"
                    rules={[
                      { required: true, message: "Vui lòng nhập dữ liệu" },
                    ]}
                  >
                    <TextArea
                      placeholder="Ý kiến"
                      value={getFieldValue("comment")}
                    />
                  </Form.Item>
                )}
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item shouldUpdate={true} noStyle>
                {({ getFieldValue }) => (
                  <Form.Item
                    name="rate"
                    rules={[
                      { required: true, message: "Vui lòng nhập dữ liệu" },
                    ]}
                  >
                    <Rate tooltips={desc} value={getFieldValue("rate")} />
                  </Form.Item>
                )}
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item shouldUpdate={true} noStyle>
                {({ getFieldValue }) => (
                  <Form.Item
                    name="urlImage"
                    label="Hình ảnh"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    onChange={handleChange}
                  >
                    <Upload
                      className="upload-list-inline"
                      listType="picture"
                      action={handleUpload}
                      defaultFileList=""
                    >
                      <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                    </Upload>
                  </Form.Item>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ background: "#FF6F61" }}
            >
              Đánh giá
            </Button>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
});
export default ModalRate;
