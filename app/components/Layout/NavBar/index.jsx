/* eslint-disable no-underscore-dangle */
import PropTypes from "prop-types";
import React, { memo, useState, useCallback } from "react";
import styled from "styled-components";
import { Breadcrumb, Modal } from "antd";
import { useHistory, Link } from "react-router-dom";
import { defineMessages, FormattedMessage } from "react-intl";
import * as style from "components/Variables";
import { Ui } from "../../../utils/Ui";
import { $Cookies } from "../../../utils/cookies";
const prefix = "app.routing.";
function Navbar({ className, pathName, onLogOut, isAuthenticated, profile }) {
  const proFile = $Cookies.get("ERP_REPORT")
    ? JSON.parse($Cookies.get("ERP_REPORT"))
    : {};
  const history = useHistory();

  const _forwardTo = useCallback(
    (to) => {
      history.push(to);
    },
    [history]
  );

  const _handleLogOut = useCallback(() => {
    _forwardTo("/");
    onLogOut();
  }, [_forwardTo, onLogOut]);
  const [visible, setVisible] = useState(false);
  const logOut = () => {
    setVisible(true);
  };
  const handleOk = () => {
    setVisible(false);
    Ui.showSuccess({ message: "Đã đăng xuất." });
    history.push("/");
    onLogOut();
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const clickAccount = (e) => {
    let url = "/tai-khoan/" + e;
    history.push(url);
  };

  return (
    <>
      <Modal
        title="Thông Báo"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Đồng ý"
        okButtonProps={{
          style: {
            background: "#0bc40b",
            borderRadius: "16px",
            fontWeight: "bold",
            color: "#fff",
          },
        }}
        cancelButtonProps={{
          style: {
            background: "red",
            borderRadius: "16px",
            fontWeight: "bold",
            color: "#fff",
          },
        }}
      >
        <h3 className="text-center">Bạn có thực sự muốn thoát ??</h3>
      </Modal>
      <div className="nav">
        <div
          className="container-fluid"
          style={{ padding: "0px 52px 0px 60px" }}
        >
          <nav
            className="navbar navbar-expand-lg navbar-light"
            style={{
              height: "100%",
              padding: "0px",
              background: "#FF6F61!important",
            }}
          >
            <a
              style={{ fontSize: "14px", textTransform: "uppercase" }}
              className="navbar-brand"
              href="/"
            >
              Trang chủ
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <a className="nav-link navbar_text" href="/san-pham">
                    Sản phẩm
                  </a>
                </li>
                {/* <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle navbar_text"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Tin tức
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                    <div className="dropdown-divider" />
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </div>
                </li> */}
                <li className="nav-item">
                  <a className="nav-link navbar_text" href="/tin-tuc">
                    Tin tức
                  </a>
                </li>
                {/* <li className="nav-item">
                  <a className="nav-link navbar_text" href="/bo-suu-tap">
                    Bộ sưu tập
                  </a>
                </li> */}
                <li className="nav-item">
                  <a className="nav-link navbar_text" href="/lien-he">
                    Liên hệ
                  </a>
                </li>
              </ul>
              {$Cookies.get("ERP_REPORT") != null ? (
                <div className="navbar-nav ml-auto">
                  <div className="nav-item dropdown">
                    <a
                      href="#"
                      className="nav-link dropdown-toggle"
                      data-toggle="dropdown"
                    >
                      {proFile.adm_name && <b>Chào, {proFile.adm_name}</b>}
                    </a>
                    <div className="dropdown-menu">
                      <a
                        onClick={() =>
                          clickAccount(
                            proFile.googleId ? proFile.googleId : proFile.parentId
                          )
                        }
                        className="dropdown-item"
                      >
                        Tài khoản của tôi
                      </a>
                      <a onClick={logOut} className="dropdown-item">
                        Đăng xuất
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <a
                      style={{
                        color: "#fff",
                        padding: "8px",
                        borderRadius: "4px",
                      }}
                      href="/signin"
                    >
                      Đăng nhập
                    </a>
                  </div>
                  <div
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <a
                      style={{
                        color: "#fff",
                        padding: "8px",
                        borderRadius: "4px",
                      }}
                      href="/dang-ky"
                    >
                      Đăng ký
                    </a>
                  </div>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

Navbar.propTypes = {
  className: PropTypes.any,
  pathName: PropTypes.any,
};

export default styled(Navbar)`
  padding: 1rem 0 1rem 0;
  a {
    color: ${style.color.haiVan.primary};
    font-weight: bold;
    font-size: ${style.fontsize.reg};
  }
  a:hover {
    color: ${style.color.haiVan.bg} !important;
  }
`;
