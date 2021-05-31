/* eslint-disable no-underscore-dangle */
/**
 *
 * SignIn
 *
 */

import React, { memo, useCallback, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";
import Globals from "utils/globals";
import { Ui } from "utils/Ui";
import { makeSelectIsAuthenticated } from "containers/App/selectors";
import { setAuthenticated, setEntry } from "containers/App/actions";
import ServiceBase from "utils/ServiceBase";
import { createStructuredSelector } from "reselect";
import { Form, Row, Typography, Button, Checkbox, Col, Input } from "antd";
import { Paper } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import _ from "lodash";
import FacebookLogin from "react-facebook-login";
// import Input from "components/Input";
import { URI } from "./constants";
import BackgroundSingin from "images/img17.jpg";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { APP_NAME } from "utils/constants";
import GoogleLogin from "react-google-login";

import "./style.scss";
const { Title } = Typography;
const formLayout = {
  wrapperCol: { span: 20 },
};
const SignIn = ({ className, isAuthenticated, setAuthenticated }) => {
  //Xử lý đăng nhập google
  const responseGoogle = async (response) => {
    let params = {
      email: _.get(response.profileObj, "email"),
      familyName: _.get(response.profileObj, "familyName"),
      givenName: _.get(response.profileObj, "givenName"),
      uuId: _.get(response.profileObj, "googleId"),
      image: _.get(response.profileObj, "imageUrl"),
      name: _.get(response.profileObj, "name"),
    };
    let url = "/usersocial/create";
    let result = await ServiceBase.requestJson({
      url: url,
      method: "POST",
      data: params,
    });
    Ui.showSuccess({ message: "Đăng nhập hệ thống thành công." });
    let profile = _.get(result, "value")[0];

    profile = {
      // ...profile,
      parentName: _.get(profile, "name", ""),
      adm_name: _.get(profile, "name", ""),
      uuId: _.get(profile, "uuId", ""),
      parentId: _.get(profile, "id", ""),
      rolesName: _.get(profile, "email", ""),
    };
    delete profile.role;
    Globals.setSession({
      public: {
        erpReport: JSON.stringify(profile),
      },

      private: {
        token: _.get(response, "accessToken"),
        refresh_token: _.get(response, "accessToken"),
      },
    });

    setAuthenticated({
      isAuthenticated: true,
      profile,
    });
  };
  
  //Xử lý đăng nhập bằng facebook
  const responseFacebook = async (response) => {
    let params = {
      uuId: _.get(response, "id"),
      image: _.get(response.picture.data.url, "url"),
      name: _.get(response, "name"),
    };
    let url = "/usersocial/create";
    let result = await ServiceBase.requestJson({
      url: url,
      method: "POST",
      data: params,
    });
    Ui.showSuccess({ message: "Đăng nhập hệ thống thành công." });
    let profile = _.get(result, "value")[0];
    profile = {
      // ...profile,
      parentName: _.get(profile, "name", ""),
      adm_name: _.get(profile, "name", ""),
      uuId: _.get(profile, "uuId", ""),
      parentId: _.get(profile, "id", ""),
    };
    delete profile.role;
    Globals.setSession({
      public: {
        erpReport: JSON.stringify(profile),
      },

      private: {
        token: _.get(response, "accessToken"),
        refresh_token: _.get(response, "accessToken"),
      },
    });

    setAuthenticated({
      isAuthenticated: true,
      profile,
    });
  };

  let nameApp = "Hải Vân";
  if (APP_NAME == "vungtau") {
    nameApp = "Đắc Quang Shop";
  } else if (APP_NAME == "hv") {
    nameApp = "Hải Vân";
  } else if (APP_NAME == "hshv") {
    nameApp = "Hải Sơn Hải Vân";
  }
  const _handleLogIn = useCallback(
    async (param) => {
      const result = await ServiceBase.requestJson({
        method: "POST",
        url: "/login",
        data: {
          username: _.get(param, "username"),
          password: _.get(param, "password"),
        },
      });
      if (result.hasErrors) {
        Ui.showErrors(result.errors);
      } else {
        Ui.showSuccess({ message: "Đăng nhập hệ thống thành công." });
        let profile = _.get(result, "value", {});
        profile = {
          ...profile,
          parentName: _.get(profile, "adm_name", ""),
          parentId: _.get(profile, "adm_id", ""),
          parentPhone: _.get(profile, "adm_phone", ""),
          rolesName: _.get(profile, "value.role", ""),
        };
        delete profile.role;
        Globals.setSession({
          public: {
            erpReport: JSON.stringify(profile),
          },

          private: {
            token: _.get(result, "value.accessToken"),
            refresh_token: _.get(result, "value.refreshToken"),
          },
        });

        setAuthenticated({
          isAuthenticated: true,
          profile,
        });
      }
    },
    [setAuthenticated]
  );

  const onFinishFailed = useCallback(() => {}, []);
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <Paper
      className={className}
      style={{
        backgroundImage: `url(${BackgroundSingin})`,
        backgroundSize: "cover",
        boxShadow: "unset",
        backgroundRepeat: "no-repeat",

        // backgroundPosition: "bottom",
      }}
    >
      <Row
        gutter={15}
        className="animation"
        style={{
          width: "25%",
          background: "#fff",
          borderRadius: 10,
        }}
      >
        <Col xs={24}>
          <Title className="loginTitle" level={3}>
            {nameApp}
          </Title>
        </Col>
        {/* <Col xs={24} className="d-flex justify-content-center">
          <img src={IconSingin} alt="Trulli" width="300" height="150" />
        </Col> */}
        <Form
          style={{ width: "100%" }}
          name="signin"
          initialValues={{ remember: true }}
          onFinish={_handleLogIn}
          onFinishFailed={onFinishFailed}
          requiredMark={true}
          layout="vertical"
        >
          <Form.Item
            label={
              <b>
                <b style={{ color: "red" }}>*</b> Tài khoản
              </b>
            }
            name="username"
            rules={[{ required: true, message: "Nhập tên tài khoản" }]}
          >
            <Input
              prefix={<UserOutlined />}
              style={{ width: "100%", borderRadius: 10 }}
              placeholder="Tài khoản"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label={
              <b>
                <b style={{ color: "red" }}>*</b> Mật khẩu
              </b>
            }
            name="password"
            rules={[{ required: true, message: "Nhập mật khẩu" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              style={{ width: "100%", borderRadius: 10 }}
              placeholder="Mật khẩu"
              size="large"
            />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Ghi nhớ mật khẩu</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%", borderRadius: 10, height: 40 }}
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
        <Col xs={12} style={{ padding: "15px" }}>
          <FacebookLogin
            appId="1022924814904577"
            autoLoad={false}
            fields="name,email,picture"
            // onClick={componentClicked}
            callback={responseFacebook}
            className="style-button"
            // cssClass="my-facebook-button-class"
            icon="fa-facebook"
            textButton="Login Facebook"
            version="3.1"
          />
        </Col>
        <Col xs={12} style={{ padding: "15px" }}>
          <GoogleLogin
            clientId="751045228709-279k93krc3eh3n8lhm09p3a5uclq7968.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            isSignedIn={false}
            className="style-button"
            cookiePolicy={"single_host_origin"}
          />
        </Col>
      </Row>
    </Paper>
  );
};

SignIn.propTypes = {
  setAuthenticated: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  className: PropTypes.any.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: makeSelectIsAuthenticated(),
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setAuthenticated,
    },
    dispatch
  );
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default compose(
  withConnect,
  memo
)(styled(SignIn)`
  .MuiPaper-rounded {
    background: red;
  }

  display: flex;
  justify-content: center;
  padding: 120px 0;
  background-color: #fff;
  .loginTitle {
    text-align: center;
  }
  .ant-row {
    // background-color: #f2f6fc;
    border-radius: 5px;
    padding: 15px;
    justify-content: center;
    .btnLogin {
      display: flex;
    }
  }
  .ant-form-item {
    margin-bottom: 0px;
    .ant-form-item-label {
      text-align: left;
    }
    .ant-form-item-required:before {
      display: none !important;
    }
    .ant-form-item-required:after {
      color: #f5222d;
      font-size: 14px;
      font-family: SimSun, sans-serif;
      line-height: 1;
      content: "*" !important;
    }
  }
  .style-button {
    width: 100%;
  }
  .kep-login-facebook.metro {
    border-radius: 4px;
    padding: 0px;
    box-shadow: rgb(0 0 0 / 24%) 0px 2px 2px 0px,
      rgb(0 0 0 / 24%) 0px 0px 1px 0px;
    font-size: 14px;
    text-transform: capitalize;
    width: 100%;
    height: 100%;
  }
`);
