import React, { memo, useCallback, useMemo, useEffect } from "react";
import {
  Row,
  Col,
  DatePicker,
  Button,
  Select,
  InputNumber,
  Input,
  Tooltip,
} from "antd";
import _ from "lodash";
import moment from "moment";
import styled from "styled-components";
import * as style from "components/Variables";
import classNames from "classnames";
import ServiceBase from "utils/ServiceBase";
import { AiOutlineClose } from "react-icons/ai";
import { Ui } from "utils/Ui";
import { useParams } from "react-router";
import SelectMultiple from "components/SelectMultiple";
import { useHistory, useLocation } from "react-router-dom";

const { Option } = Select;
const Fillter = memo(({ className, params, setParams }) => {
  let history = useHistory();
  let location = useLocation();
  const getQuery = useCallback(
    (value, name) => {
      setParams((preState) => {
        let nextState = { ...preState };
        nextState[name] = value;
        return nextState;
      });
    },
    [params]
  );

  const clearParams = () => {
    setParams((preState) => {
      let nextState = { ...preState };
      nextState.name = undefined;
      nextState.sex = 0;
      nextState.branch = undefined;
      nextState.priceFrom = undefined;
      nextState.priceTo = undefined;
      nextState.page = 1;
      nextState.size = 10;
      return nextState;
    });
  };
  
  // function xử lí phần push search lên url để copy link vẫn dc filter
  const pushQuery = useMemo(() => {
    let pathName = location.pathname;
    let pathProductName = [];
    let pathBranch = [];
    let pathSex = [];
    let pathPriceFrom = "";
    let pathPriceTo = "";
    if (_.size(params.price_from) > 0) {
      pathPriceFrom = JSON.stringify(params.price_from);
    }
    if (_.size(params.price_to) > 0) {
      pathPriceTo = JSON.stringify(params.price_to);
    }
    if (_.size(params.name) > 0) {
      pathProductName = JSON.stringify(params.name);
    }
    if (_.size(params.sex) >= 0) {
      pathSex = JSON.stringify(params.sex);
    }
    if (_.size(params.branch) > 0) {
      pathBranch = JSON.stringify(params.branch);
    }
    history.push({
      pathname: pathName,
      search: `?price_from=${pathPriceFrom}&price_to=${pathPriceTo}&name=${pathProductName}&branch=${pathBranch}&sex=${pathSex}`,
    });
  }, [params]);
  // khi mới đầu vào thì sẽ set lại dữ liệu khi url có phần search
  useEffect(() => {
    pushQuery;
    const query = new URLSearchParams(location.search);
    const paramName = query.get("name");
    const paramSex = query.get("sex");
    const pathBranch = query.get("branch");
    const pathPriceFrom = query.get("price_from");
    const pathPriceTo = query.get("price_to");

    setParams((preState) => {
      let nextState = { ...preState };
      if (pathPriceFrom) {
        nextState.price_from = JSON.parse(pathPriceFrom);
      }
      if (pathPriceTo) {
        nextState.price_to = JSON.parse(pathPriceTo);
      }
      if (paramName) {
        nextState.name = JSON.parse(paramName);
      }
      if (paramSex) {
        nextState.sex = JSON.parse(paramSex);
      }
      if (pathBranch) {
        nextState.branch = JSON.parse(pathBranch);
      }
      return nextState;
    });
  }, [pushQuery]);
  return (
    <div
      gutter={15}
      className={classNames({
        [className]: true,
      })}
    >
      <Row gutter={15}>
        <Col xxl={6} xl={6} lg={6} md={6}>
          <span
            style={{
              fontSize: 14,
              display: "flex",
              justifyContent: "center",
            }}
          >
            Chọn khoảng giá
          </span>
          <Row>
            <Col
              xxl={11}
              xl={11}
              lg={11}
              md={11}
              xs={10}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: "0px 0px 15px 0px",
              }}
            >
              <InputNumber
                value={params.priceFrom}
                formatter={(value) =>
                  ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) =>
                  value
                    .replace("VNĐ", "")
                    .toString()
                    .trim()
                    .replace(/\$\s?|(,*)/g, "")
                }
                onChange={(value) => {
                  getQuery(value, "priceFrom");
                }}
              />
            </Col>
            <Col
              xxl={2}
              xl={2}
              lg={2}
              md={2}
              xs={4}
              style={{
                fontSize: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0px 0px 15px 0px",
              }}
            >
              <span>đến</span>
            </Col>
            <Col
              xxl={11}
              xl={11}
              lg={11}
              md={11}
              xs={10}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: "0px 0px 15px 0px",
              }}
            >
              <InputNumber
                value={params.priceTo}
                formatter={(value) =>
                  ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) =>
                  value
                    .replace("VNĐ", "")
                    .toString()
                    .trim()
                    .replace(/\$\s?|(,*)/g, "")
                }
                onChange={(value) => {
                  getQuery(value, "priceTo");
                }}
              />
            </Col>
          </Row>
        </Col>
        <Col xl={4} lg={4} md={4} xs={11} style={{ marginTop: 21 }}>
          <SelectMultiple
            url="/product/list-name"
            placeholder="Tên sản phẩm"
            value={params.name}
            onChange={(value) => {
              let name = value;
              getQuery(name, "name");
            }}
          />
        </Col>
        <Col xl={4} lg={4} md={4} xs={11} style={{ marginTop: 21 }}>
          <SelectMultiple
            url="/branch/list-name"
            placeholder="Thương hiệu"
            value={params.branch}
            onChange={(value) => {
              let branch = value;
              getQuery(branch, "branch");
            }}
          />
        </Col>
        <Col xl={2} lg={2} md={2} xs={11} style={{ marginTop: 21 }}>
          <Select
            value={params.sex}
            onChange={(value) => {
              let sex = value;
              getQuery(sex, "sex");
            }}
          >
            <Option value={1}>Nữ</Option>
            <Option value={2}>Nam</Option>
            <Option value={0}>Tất cả</Option>
          </Select>
        </Col>
        <Col className="clearParams" xxl={1} xl={1} lg={1} md={1} sm={1} xs={2}>
          <Tooltip placement="topLeft" title="Xóa bộ lọc">
            <Button style={{ marginTop: 21 }} type="link" onClick={clearParams}>
              <AiOutlineClose />
            </Button>
          </Tooltip>
        </Col>
      </Row>
    </div>
  );
});
export default styled(Fillter)`
  .buttonCustomer {
    .ant-btn {
      border-color: ${style.color.success.border};
      color: ${style.color.success.color};
      background: ${style.color.success.default};
    }
    .ant-btn :hover {
      color: ${style.color.success.colorHover};
      background: ${style.color.success.background};
    }
  }
  .buttonCustomerPush {
    .ant-btn {
      border-color: ${style.color.primary.border};
      color: ${style.color.primary.color};
      background: ${style.color.primary.default};
    }
    .ant-btn :hover {
      color: ${style.color.primary.colorHover};
      background: ${style.color.primary.background};
    }
  }
  .clearParams {
    text-align: right;
  }
`;
