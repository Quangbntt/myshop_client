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
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { $Cookies } from "utils/cookies";
import { storage } from "../../../firebase/index";
import ServiceBase from "utils/ServiceBase";
import Address from "../Address";

const dateFormat = "DD-MM-YYYY";

const List = memo(
  ({
    className,
    data,
    setParams,
    row,
    slug_id,
    show,
    setShow,
    dataShipPlace,
    setLoading
  }) => {
    const logOut = () => {
      $Cookies.remove("authorization_boc");
      $Cookies.remove("ERP_REPORT");
      window.location.reload();
    };

    const onEdit = () => {
      setShow((preState) => {
        let nextState = { ...preState };
        nextState.disabled = !show.disabled;
        return nextState;
      });
    };
    const layout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
    };
    const validateMessages = {
      required: "${label} không được để trống!",
      types: {
        email: "${label} không phải là email!",
        number: "${label} không phải là số!",
      },
      number: {
        range: "${label} phải trong khoảng ${min} đến ${max}",
      },
    };
    const [input, setInput] = useState(data[0].about_me);
    const onChangeProfile = (e) => {
      setInput(e.target.value);
    };

    const onFinish = async (values) => {
      let params = {
        id: slug_id.id,
        about_me: input,
        address: _.get(values, "address"),
        birthday: _.get(values, "birthday").format("YYYY-MM-DD"),
        email: _.get(values, "email"),
        sex: _.get(values, "sex"),
        name: _.get(values, "name"),
        phone: _.get(values, "phone"),
        user_image: urlImage,
        status: _.get(values, "status") ? 1 : 1,
      };
      let url = "";
      url = "/user/client-update";
      let result = await ServiceBase.requestJson({
        url: url,
        method: "POST",
        data: params,
      });
      if (result.hasErrors) {
        Ui.showErrors(result.errors);
      } else {
        let message = "";
        message = "Cập nhật tài khoản thành công";
        Ui.showSuccess({ message: message });
        setParams((preState) => {
          let nextState = { ...preState };
          nextState = nextState;
          return nextState;
        });
        setShow((preState) => {
          let nextState = { ...preState };
          nextState.disabled = true;
          return nextState;
        });
      }
    };

    const [image, setImage] = useState("");
    const [urlImage, setUrlImage] = useState(data[0].user_image);

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

    const [form] = Form.useForm();
    const boweload = useCallback(async () => {
      let user = data[0];
      if (user) {
        let obj = {
          username: user.username,
          groupid: user.groupid,
          name: user.name,
          sex: user.sex,
          address: user.address,
          email: user.email,
          phone: user.phone,
          status: user.status,
          user_image: user.user_image,
          backgound_image: user.backgound_image,
          birthday: user.birthday,
          about_me: user.about_me,
        };
        form.setFieldsValue(obj);
      }
    }, [row]);
    useEffect(() => {
      setTimeout(boweload, 0);
    }, [boweload]);

    return (
      <div
        className={classNames({
          [className]: true,
        })}
      >
        <div className="my-account">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3">
                <div
                  className="nav flex-column nav-pills"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <a
                    className="nav-link active"
                    id="dashboard-nav"
                    data-toggle="pill"
                    href="#dashboard-tab"
                    role="tab"
                  >
                    <i className="fa fa-tachometer-alt" />
                    Thông tin tài khoản
                  </a>
                  <a
                    className="nav-link"
                    id="orders-nav"
                    data-toggle="pill"
                    href="#orders-tab"
                    role="tab"
                  >
                    <i className="fa fa-shopping-bag" />
                    Đơn hàng
                  </a>
                  <a
                    className="nav-link"
                    id="payment-nav"
                    data-toggle="pill"
                    href="#payment-tab"
                    role="tab"
                  >
                    <i className="fa fa-credit-card" />
                    Ngân hàng
                  </a>
                  <a
                    className="nav-link"
                    id="address-nav"
                    data-toggle="pill"
                    href="#address-tab"
                    role="tab"
                  >
                    <i className="fa fa-map-marker-alt" />
                    Địa chỉ
                  </a>
                  <a
                    className="nav-link"
                    id="account-nav"
                    data-toggle="pill"
                    href="#account-tab"
                    role="tab"
                  >
                    <i className="fas fa-bell" />
                    Thông báo
                  </a>
                  <a className="nav-link" onClick={logOut}>
                    <i className="fa fa-sign-out-alt" />
                    Logout
                  </a>
                </div>
              </div>
              <div className="col-md-9">
                <div className="tab-content">
                  <div
                    className="tab-pane fade show active"
                    id="dashboard-tab"
                    role="tabpanel"
                    aria-labelledby="dashboard-nav"
                  >
                    <h4 style={{ marginBottom: "0px" }}>Hồ sơ của tôi</h4>
                    <p style={{ paddingTop: "0px" }}>
                      Quản lý thông tin hồ sơ để bảo mật tài khoản
                    </p>
                    <Divider />
                    <Row>
                      <Col sm={14} lg={14} xs={14} md={14}>
                        <Form
                          {...layout}
                          name="nest-messages"
                          onFinish={onFinish}
                          form={form}
                          validateMessages={validateMessages}
                        >
                          <Form.Item shouldUpdate={true} noStyle>
                            {({ getFieldValue }) => (
                              <Form.Item
                                name="name"
                                label="Tên"
                                rules={[{ required: true }]}
                              >
                                <Input
                                  placeholder="Họ và tên"
                                  value={getFieldValue("name")}
                                />
                              </Form.Item>
                            )}
                          </Form.Item>

                          <Form.Item shouldUpdate={true} noStyle>
                            {({ getFieldValue }) => (
                              <Form.Item
                                name="email"
                                label="Email"
                                rules={[{ type: "email", required: true }]}
                              >
                                <Input
                                  placeholder="Email"
                                  value={getFieldValue("email")}
                                />
                              </Form.Item>
                            )}
                          </Form.Item>
                          <Form.Item shouldUpdate={true} noStyle>
                            {({ getFieldValue }) => (
                              <Form.Item
                                name="phone"
                                label="Số điện thoại"
                                rules={[{ required: true }]}
                              >
                                <Input
                                  placeholder="Nhập số điện thoại"
                                  value={getFieldValue("phone")}
                                />
                              </Form.Item>
                            )}
                          </Form.Item>
                          <Form.Item shouldUpdate={true} noStyle>
                            {({ getFieldValue }) => (
                              <Form.Item name="address" label="Địa chỉ">
                                <Input value="address" />
                              </Form.Item>
                            )}
                          </Form.Item>
                          <Form.Item shouldUpdate={true} noStyle>
                            {({ getFieldValue }) => (
                              <Form.Item name="sex" label="Giới tính">
                                <Radio.Group value={data[0].sex}>
                                  <Radio value={1}>Nữ</Radio>
                                  <Radio value={2}>Nam</Radio>
                                  <Radio value={3}>Khác</Radio>
                                </Radio.Group>
                              </Form.Item>
                            )}
                          </Form.Item>

                          <Form.Item shouldUpdate={true} noStyle>
                            {({ getFieldValue }) => (
                              <Form.Item
                                name="birthday"
                                label="Ngày sinh"
                                rules={[{ required: true }]}
                              >
                                <DatePicker
                                  format={dateFormat}
                                  placeholder="DD-MM-YYYY"
                                  value={getFieldValue("birthday")}
                                />
                              </Form.Item>
                            )}
                          </Form.Item>
                          <Form.Item
                            wrapperCol={{ ...layout.wrapperCol, offset: 4 }}
                          >
                            <Button
                              type="primary"
                              htmlType="submit"
                              danger
                              style={{ padding: "0px 20px 0px 20px" }}
                            >
                              Lưu
                            </Button>
                          </Form.Item>
                        </Form>
                      </Col>
                      <Col
                        sm={8}
                        lg={8}
                        xs={8}
                        md={8}
                        style={{
                          borderLeft: "1px solid #f0f0f0",
                          width: "200px",
                          height: "200px",
                          textAlign: "center",
                        }}
                      >
                        {urlImage && (
                          <Avatar
                            style={{
                              verticalAlign: "middle",
                              marginBottom: "10px",
                              border: "2px solid #e14343",
                            }}
                            size={100}
                            src={urlImage}
                            gap="1"
                          />
                        )}
                        <br />
                        <Form>
                          <Form.Item
                            name="user_image"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                            onChange={handleChange}
                          >
                            <Upload
                              className="upload-list-inline"
                              listType="picture"
                              action={handleUpload}
                              maxCount={1}
                              showUploadList={false}
                            >
                              <Button>Chọn ảnh</Button>
                            </Upload>
                          </Form.Item>
                          <Form.Item>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                padding: "8px 16px",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <img
                                  src="https://hasonhaivan.com/images/icons/icon_right_quote.svg"
                                  style={{
                                    width: "26px",
                                    height: "21px",
                                    transform: "rotate(180deg)",
                                  }}
                                />
                                <div className="text-rating">
                                  <Input
                                    defaultValue={data[0].about_me}
                                    disabled={show.disabled}
                                    onChange={(e) => onChangeProfile(e)}
                                  />
                                  {/* <Space size="middle"> */}
                                  <Tooltip placement="topLeft" title="Sửa">
                                    <Button
                                      type="link"
                                      icon={<EditOutlined />}
                                      style={{
                                        float: "right",
                                      }}
                                      onClick={onEdit}
                                    />
                                  </Tooltip>
                                  {/* </Space> */}
                                </div>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "center",
                                }}
                              >
                                <span style={{ flex: "1 1 auto" }}>
                                  {/* quang */}
                                </span>
                                <img
                                  src="https://hasonhaivan.com/images/icons/icon_right_quote.svg"
                                  style={{
                                    width: "26px",
                                    height: "21px",
                                    alignSelf: "flex-end",
                                  }}
                                />
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                }}
                              />
                            </div>
                          </Form.Item>
                        </Form>
                      </Col>
                    </Row>
                  </div>
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
                            <th>No</th>
                            <th>Product</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>Product Name</td>
                            <td>01 Jan 2020</td>
                            <td>$99</td>
                            <td>Approved</td>
                            <td>
                              <button className="btn">View</button>
                            </td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>Product Name</td>
                            <td>01 Jan 2020</td>
                            <td>$99</td>
                            <td>Approved</td>
                            <td>
                              <button className="btn">View</button>
                            </td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>Product Name</td>
                            <td>01 Jan 2020</td>
                            <td>$99</td>
                            <td>Approved</td>
                            <td>
                              <button className="btn">View</button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="payment-tab"
                    role="tabpanel"
                    aria-labelledby="payment-nav"
                  >
                    <h4>Ngân hàng</h4>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      In condimentum quam ac mi viverra dictum. In efficitur
                      ipsum diam, at dignissim lorem tempor in. Vivamus tempor
                      hendrerit finibus. Nulla tristique viverra nisl, sit amet
                      bibendum ante suscipit non. Praesent in faucibus tellus,
                      sed gravida lacus. Vivamus eu diam eros. Aliquam et sapien
                      eget arcu rhoncus scelerisque.
                    </p>
                  </div>
                  <Address dataShipPlace={dataShipPlace} setParams={setParams} setLoading={setLoading} />
                  <div
                    className="tab-pane fade"
                    id="account-tab"
                    role="tabpanel"
                    aria-labelledby="account-nav"
                  >
                    <h4>Account Details</h4>
                    <div className="row">
                      <div className="col-md-6">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="First Name"
                        />
                      </div>
                      <div className="col-md-6">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Last Name"
                        />
                      </div>
                      <div className="col-md-6">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Mobile"
                        />
                      </div>
                      <div className="col-md-6">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Email"
                        />
                      </div>
                      <div className="col-md-12">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Address"
                        />
                      </div>
                      <div className="col-md-12">
                        <button className="btn">Update Account</button>
                        <br />
                      </div>
                    </div>
                    <h4>Password change</h4>
                    <div className="row">
                      <div className="col-md-12">
                        <input
                          className="form-control"
                          type="password"
                          placeholder="Current Password"
                        />
                      </div>
                      <div className="col-md-6">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="New Password"
                        />
                      </div>
                      <div className="col-md-6">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Confirm Password"
                        />
                      </div>
                      <div className="col-md-12">
                        <button className="btn">Save Changes</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default styled(List)``;
