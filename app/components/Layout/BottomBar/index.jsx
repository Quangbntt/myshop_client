/* eslint-disable no-underscore-dangle */
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import styled from 'styled-components';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { defineMessages, FormattedMessage } from 'react-intl';
import * as style from 'components/Variables';
import Logo from "images/logo.png";
const prefix = 'app.routing.';
function Footer({ className, pathName }) {
  return (
    <>
        <div className="bottom-bar">
            <div className="container-fluid">
                <div className="row" style={{alignItems: "center"}}>
                    <div className="col-md-3">
                        <div className="logo">
                            <a href="index.html">
                                <img src={Logo} alt="Logo" />
                            </a>
                        </div>
                    </div>
                    <div className="col-md-6 col-8">
                        <div className="search">
                            <input type="text" placeholder="Search" />
                            <button><i className="fa fa-search"></i></button>
                        </div>
                    </div>
                    <div className="col-md-3 col-4">
                        <div className="user">
                            {/* <a href="wishlist.html" className="btn wishlist">
                                <i className="fa fa-heart"></i>
                                <span>(0)</span>
                            </a> */}
                            <a href="/gio-hang" className="btn cart">
                                <i className="fa fa-shopping-cart"></i>
                                <span>(0)</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
}

Footer.propTypes = {
  classNameName: PropTypes.any,
  pathName: PropTypes.any,
};

export default memo(styled(Footer)`
  padding: 1rem 0 1rem 0;
  a {
    color: ${style.color.haiVan.primary};
    font-weight: bold;
    font-size: ${style.fontsize.reg};
  }
  a:hover {
    color: ${style.color.haiVan.bg} !important;
  }
`);
