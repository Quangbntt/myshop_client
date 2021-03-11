/* eslint-disable no-underscore-dangle */
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import styled from 'styled-components';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { defineMessages, FormattedMessage } from 'react-intl';
import classNames from "classnames";
import * as style from 'components/Variables';
const prefix = 'app.routing.';
function TopBar({ className, pathName }) {
  return (
    <>
        <div className="top-bar">
            <div className="container-fluid" style={{padding: "0px 60px 0px 60px"}}>
                <div className="row">
                    <div className="col-xl-6 col-md-6 col-sm-6 col-lg-6 col-6">
                        <i className="fa fa-envelope"></i>
                        &nbsp; qstore@gmail.com
                    </div>
                    <div className="col-xl-6 col-md-6 col-sm-6 col-lg-6 col-6" style={{textAlign: "right"}}>
                        <i className="fa fa-phone-alt"></i>
                        &nbsp; +012-345-6789
                    </div>
                </div>
            </div>
        </div>
    </>
  );
}

TopBar.propTypes = {
  classNameName: PropTypes.any,
  pathName: PropTypes.any,
};

export default styled(TopBar)`
  
`;
