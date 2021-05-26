import React, { memo, useState, useEffect, useMemo, Component } from "react";
import {
  Table,
  Badge,
  Menu,
  Dropdown,
  Space,
  Button,
  Input,
  AutoComplete,
  Row,
  Form,
  Select,
  Col,
  Checkbox,
  Modal,
  DatePicker,
} from "antd";
import classNames from "classnames";
import moment from "moment";
import _ from "lodash";
import ServiceBase from "utils/ServiceBase";
import { Ui } from "utils/Ui";
import styled from "styled-components";
import * as style from "components/Variables";
import MenuClassify from "components/MenuClassify";
import Pagination from "components/Paginate/index";
import { useHistory } from "react-router-dom";
const { Option } = Select;
const List = memo(
  ({
    className,
    setParams,
    data,
    params,
    totalLength,
    visible,
    setVisible,
  }) => {
    const [form] = Form.useForm();
    const handleCancel = () => {
      form.resetFields();
      setVisible((preState) => {
        let nextState = { ...preState };
        nextState.isShow = false;
        return nextState;
      });
    };
    let history = useHistory();
    const onFinish = async (values) => {
      console.log(id);
      let params = {
        province_id: id.province_id,
        district_id: id.district_id,
        ward_id: id.ward_id,
        username: _.get(values, "username"),
        password: _.get(values, "password"),
        name: _.get(values, "name"),
        address: _.get(values, "address"),
        email: _.get(values, "email"),
        phone: _.get(values, "phone"),
        birthday: moment(values.birthday).format("YYYY-MM-DD"),
      };
      let url = "/user/create";
      let result = await ServiceBase.requestJson({
        url: url,
        method: "POST",
        data: params,
      });
      if (result.hasErrors) {
        Ui.showErrors(result.errors);
      } else {
        let message = "Bạn đã đăng ký tài khoản thành công";
        Ui.showSuccess({ message: message });
        history.push("/");
        setParams((preState) => {
          let nextState = { ...preState };
          nextState = nextState;
          return nextState;
        });
      }
    };
    const [autoCompleteResult, setAutoCompleteResult] = useState([]);
    const [id, setId] = useState({
      province_id: undefined,
      district_id: undefined,
      ward_id: undefined,
    });
    const [dataDistrict, setDataDistrict] = useState({
      disable: true,
      data: {},
    });
    const [dataWard, setDataWard] = useState({
      disable: true,
      data: {},
    });
    const handleClickProvince = (e) => {
      setAutoCompleteResult(data);
    };
    const onProvinceChange = (value) => {
      setAutoCompleteResult(data);
    };
    const provinceOptions = autoCompleteResult.map((x) => ({
      label: x.name,
      value: x.name,
      id: x.id,
      district: x.district,
    }));
    const handleSelectProvince = (value, option) => {
      setDataDistrict((preState) => {
        let nextState = { ...preState };
        nextState.disable = false;
        nextState.data = option.district;
        return nextState;
      });
      setId((preState) => {
        let nextState = { ...preState };
        nextState.province_id = option.id;
        return nextState;
      });
    };
    const districtOptions =
      dataDistrict.data.length > 0 &&
      dataDistrict.data.map((x) => ({
        label: x.name,
        value: x.name,
        id: x.id,
        ward: x.ward,
      }));
    const handleSelectDistrict = (value, option) => {
      setDataWard((preState) => {
        let nextState = { ...preState };
        nextState.disable = false;
        nextState.data = option.ward;
        return nextState;
      });
      setId((preState) => {
        let nextState = { ...preState };
        nextState.district_id = option.id;
        return nextState;
      });
    };
    // const onDistrictChange = (value) => {
    //   setDataDistrict(data);
    // };
    const wardOptions =
      dataWard.data.length > 0 &&
      dataWard.data.map((x) => ({
        label: x.name,
        value: x.name,
        id: x.id,
      }));
    const handleSelectWard = (value, option) => {
      setId((preState) => {
        let nextState = { ...preState };
        nextState.ward_id = option.id;
        return nextState;
      });
    };
    const prefixSelector = (
      <Form.Item name="prefix" noStyle>
        <Select style={{ width: 70 }}>
          <Option value="84">+84</Option>
        </Select>
      </Form.Item>
    );

    const formItemLayout = {
      labelCol: {
        xs: { span: 12 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    return (
      <div
        className={classNames({
          [className]: true,
        })}
      >
        <div className="container">
          <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{
              prefix: "84",
            }}
            scrollToFirstError
          >
            <Form.Item
              name="username"
              label="Tên đăng nhập"
              tooltip="Bạn muốn nickname của mình tên là gì?"
              rules={[
                {
                  required: true,
                  message: "Mời bạn nhập tên đăng nhập!",
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[
                {
                  required: true,
                  message: "Mời bạn nhập mật khẩu!",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="confirm"
              label="Nhập lại mật khẩu"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Mời bạn nhập lại mật khẩu!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Mật khẩu nhập lại không đúng!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="name"
              label="Họ và tên"
              tooltip="Chúng tôi có thể gọi bạn là gì?"
              rules={[
                {
                  required: true,
                  message: "Mời bạn nhập họ và tên!",
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Ngày sinh"
              name="birthday"
              rules={[
                {
                  required: true,
                  message: "Mời bạn nhập ngày sinh",
                },
              ]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "Email bạn nhập chưa đúng định dạng!",
                },
                {
                  required: true,
                  message: "Mời bạn nhập email E-mail!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Điện thoại"
              rules={[
                {
                  required: true,
                  message: "Mời bạn nhập số điện thoại!",
                },
              ]}
            >
              <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              name="province"
              label="Tỉnh/Thành phố"
              rules={[
                {
                  required: true,
                  message: "Bạn chưa nhập tỉnh/thành phố",
                },
              ]}
            >
              <AutoComplete
                options={provinceOptions}
                onClick={handleClickProvince}
                filterOption={(input, option) =>
                  option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                onChange={onProvinceChange}
                onSelect={handleSelectProvince}
                placeholder="Tỉnh/Thành phố"
              >
                <Input />
              </AutoComplete>
            </Form.Item>
            <Form.Item
              name="district"
              label="Huyện/Thị xã"
              rules={[
                {
                  required: true,
                  message: "Bạn chưa nhập huyện/thị xã",
                },
              ]}
            >
              <AutoComplete
                options={districtOptions}
                disabled={dataDistrict.disable}
                filterOption={(input, option) =>
                  option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                // onChange={onDistrictChange}
                onSelect={handleSelectDistrict}
                placeholder="Huyện/Thị xã"
              >
                <Input />
              </AutoComplete>
            </Form.Item>
            <Form.Item
              name="ward"
              label="Xã/Phường"
              rules={[
                {
                  required: true,
                  message: "Bạn chưa nhập xã/phường",
                },
              ]}
            >
              <AutoComplete
                options={wardOptions}
                disabled={dataWard.disable}
                filterOption={(input, option) =>
                  option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                // onChange={onDistrictChange}
                onSelect={handleSelectWard}
                placeholder="Xã/Phường"
              >
                <Input />
              </AutoComplete>
            </Form.Item>
            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error("Bạn chưa đồng ý điều kiện của cửa hàng")
                        ),
                },
              ]}
              {...tailFormItemLayout}
            >
              <Checkbox>
                Tôi đồng ý với <a href="">điều khoản</a>
              </Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Đăng ký
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
);

export default styled(List)``;
