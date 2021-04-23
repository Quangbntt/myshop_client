/* eslint-disable react/prop-types */
import React, { memo, useEffect, useCallback, useState } from "react";
import {
  makeSelectIsAuthenticated,
  makeSelectAppConfig,
} from "containers/App/selectors";
import { createStructuredSelector } from "reselect";
import ErrorBoundary from "react-error-boundary";
import ServiceBase from "utils/ServiceBase";
import { browseGlobalConfig, logOut } from "containers/App/actions";
import { connect } from "react-redux";
import { Layout } from "antd";
import styled from "styled-components";
import { compose } from "recompose";
import ErrorMessage from "components/ErrorMessage";
import TopMenu from "./TopMenu";
import TopBar from "./TopBar";
import NavBar from "./NavBar";
import BottomBar from "./BottomBar";
import SubTopMenu from "./SubTopMenu";
import SideBar from "./SideBar";
import classNames from "classnames";
import { Table } from "antd";
import { $Cookies } from "utils/cookies";
import { JWT_TOKEN } from "utils/constants";
import Globals from "utils/globals";
import { BackTop } from "antd";
import { UpOutlined } from "@ant-design/icons";
import "../../containers/Style/css/style.css";
import MessengerCustomerChat from "react-messenger-customer-chat";

const { Header, Footer, Content, Sider } = Layout;
const AuthorizedLayout = ({
  className,
  location,
  children,
  profile,
  isAuthenticated,
  onBrowseGlobalConfig,
  onLogOut,
  appConfig,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const style = {
    position: "fixed",
    background: "#FF6F61",
    color: "#ffffff",
    width: "40px",
    height: "40px",
    textAlign: "center",
    fontSize: "20px",
    borderRadius: "4px",
    right: "15px",
    bottom: "20px",
    transition: "background 0.5s",
    zIndex: 11,
  };
  const toggle = () => {
    setCollapsed(!collapsed);
  };
  const token = $Cookies.get(JWT_TOKEN);
  useEffect(() => {
    window.fbAsyncInit = function() {
      FB.init({
        xfbml: true,
        version: "v10.0",
      });
    };
    (function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  });

  // const onBrowseGlobalConfigRequest = useCallback(async () => {
  //   if (token) {
  //     const resultEntry = await ServiceBase.requestJson({
  //       method: "GET",
  //       url: "/menu",
  //       data: {},
  //     });
  //     // khi token hết hạn sẽ logout
  //     if (resultEntry.hasErrors) {
  //       Globals.clear();
  //     } else {
  //       onBrowseGlobalConfig(resultEntry);
  //     }
  //   }
  // }, [token]);
  // useEffect(() => {
  //   onBrowseGlobalConfigRequest();
  // }, [onBrowseGlobalConfigRequest]);

  return (
    <Layout
      className={classNames({
        [className]: true,
      })}
      style={{ background: "#f3f6ff" }}
    >
      <TopBar />
      <NavBar onLogOut={onLogOut} />
      <BottomBar />
      <Layout className="site-layout" style={{ background: "#f3f6ff" }}>
        <Content
          className="site-layout-background"
          style={{
            minHeight: 280,
          }}
        >
          {children}
        </Content>
        <div id="fb-root" />
        <div
          className="fb-customerchat"
          attribution="install_email"
          page_id="101130798731006"
          theme_color="#fa3c4c"
          logged_in_greeting="Xin chào! Tôi có thể giúp gì cho bạn"
          logged_out_greeting="Xin chào! Tôi có thể giúp gì cho bạn"
        />
        <MessengerCustomerChat pageId="101130798731006" appId="1022924814904577" />
        <BackTop>
          <div style={style}>
            <UpOutlined />
          </div>
        </BackTop>
      </Layout>
    </Layout>
  );
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: makeSelectIsAuthenticated(),
  appConfig: makeSelectAppConfig(),
});
const mapDispatchToProps = (dispatch) => ({
  onBrowseGlobalConfig: (resultEntry) =>
    dispatch(browseGlobalConfig(resultEntry)),
  onLogOut: () => dispatch(logOut()),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default styled(
  compose(
    withConnect,
    memo
  )(AuthorizedLayout)
)`
  min-height: 100vh;
  header {
    padding: 0;
    height: 80px;
    line-height: inherit;
  }
  .top-bar {
    padding: 3px 0;
    font-size: 14px;
    color: #ff6f61;
    background: #000000;
  }
  .nav {
    background: #ff6f61 !important;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
  }
  .navbar_text,
  .nav-link.dropdown-toggle {
    color: rgba(255, 255, 255) !important;
    font-size: 14px;
    text-transform: uppercase;
  }
  .bottom-bar {
    padding: 15px 0;
    background: #ffffff;
    margin-bottom: 30px;
  }
  .container-fluid {
    padding-right: 60px;
    padding-left: 60px;
  }
  .search {
    width: 100%;
  }
  .bottom-bar .search input[type="text"] {
    width: 100%;
    height: 40px;
    padding: 0 15px;
    color: #666666;
    border: 1px solid #ff6f61;
    border-radius: 4px;
  }
  .bottom-bar .search button {
    position: absolute;
    width: 40px;
    height: 38px;
    top: 1px;
    right: 16px;
    padding: 0 15px;
    border: none;
    background: none;
    color: #ff6f61;
    border-radius: 0 2px 2px 0;
  }
  .bottom-bar .user {
    font-size: 0;
    text-align: right;
  }
  a.btn.cart {
    color: #ff6f61;
    background: #ffffff;
    border: 1px solid #ff6f61;
  }
  nav.navbar.bg-light.menu_classify {
    background: #fff !important;
    align-items: end;
    padding: 15px 0px;
  }
  .header .navbar-nav {
    width: 100%;
  }
  .header .navbar li {
    padding: 0 30px;
    border-bottom: 1px solid #f3f6ff;
  }
  .header .navbar a {
    color: #353535;
  }
  .nav-link {
    display: block;
    padding: 0.5rem 1rem;
    color: #ff6f61;
  }
  a.btn.cart:hover {
    background: #ff6f61;
  }
  .img-item:hover a {
    opacity: 1 !important;
  }
`;
