/* eslint-disable no-underscore-dangle */
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import styled from 'styled-components';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { defineMessages, FormattedMessage } from 'react-intl';
import * as style from 'components/Variables';
import { $Cookies } from "../../../utils/cookies";
import PaymentMethod from "images/payment-method.png";
import Godaddy from "images/godaddy.svg";
import Norton from "images/norton.svg";
import Ssl from "images/ssl.svg";
const prefix = 'app.routing.';
function Footer({ className, pathName }) {
    const proFile = $Cookies.get("ERP_REPORT")
      ? JSON.parse($Cookies.get("ERP_REPORT"))
      : {};
  return (
      <>
        <div className="footer">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-3 col-md-6">
                        <div className="footer-widget">
                            <h2>Liên hệ</h2>
                            <div className="contact-info">
                                <p><i className="fa fa-map-marker"></i>125 Hoàng Ngân, Trung Hòa, Cầu Giấy</p>
                                <p><i className="fa fa-envelope"></i>qstore@gmail.com</p>
                                <p><i className="fa fa-phone"></i>+123-456-7890</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-lg-3 col-md-6">
                        <div className="footer-widget">
                            <h2>Đăng ký</h2>
                            <div className="contact-info">
                                <div className="social">
                                    <a href=""><i className="fab fa-twitter"></i></a>
                                    <a href="https://www.facebook.com/congchuaheo1999"><i className="fab fa-facebook-f"></i></a>
                                    <a href=""><i className="fab fa-linkedin-in"></i></a>
                                    <a href=""><i className="fab fa-instagram"></i></a>
                                    <a href=""><i className="fab fa-youtube"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <div className="footer-widget">
                            <h2>Về chúng tôi</h2>
                            <ul>
                                <li><a href="#">Thông tin</a></li>
                                <li><a href="#">Chính sách bảo mật</a></li>
                                <li><a href="#">Đội ngũ quản lý</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <div className="footer-widget">
                            <h2>Chính sách</h2>
                            <ul>
                                <li><a href="#">Thanh toán</a></li>
                                <li><a href="#">Ship hàng</a></li>
                                <li><a href="#">Đổi hàng</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div className="row payment align-items-center">
                    <div className="col-md-6">
                        <div className="payment-method">
                            <h2>We Accept:</h2>
                            <img src={PaymentMethod} alt="Payment Method" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="payment-security">
                            <h2>Secured By:</h2>
                            <img src={Godaddy} alt="Payment Security" />
                            <img src={Norton} alt="Payment Security" />
                            <img src={Ssl} alt="Payment Security" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="footer-bottom">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 copyright">
                        <p>Copyright &copy; <a href="https://htmlcodex.com">Đắc Quang Shop</a>. All Rights Reserved</p>
                    </div>

                    <div className="col-md-6 template-by">
                        <p>Template By <a href="https://htmlcodex.com">Nguyễn Đắc Quang</a></p>
                    </div>
                </div>
            </div>
        </div>
      </>
  );
}

Footer.propTypes = {
  classNameNameName: PropTypes.any,
  pathName: PropTypes.any,
};

export default memo(styled(Footer)`
  
`);
