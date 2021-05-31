import React, { memo, useState, useEffect, useMemo } from "react";
import { Row, Form, Button, Col, Rate } from "antd";
import TextArea from "antd/lib/input/TextArea";
import classNames from "classnames";
import _ from "lodash";
import styled from "styled-components";
import { $Cookies } from "utils/cookies";
import ServiceBase from "utils/ServiceBase";
import { Ui } from "utils/Ui";
import { useHistory } from "react-router-dom";

const List = memo(({ className, setParams, data, params }) => {
  const [form] = Form.useForm();
  const history = useHistory();
  const onFinish = async (values) => {
    if ($Cookies.get("ERP_REPORT") != undefined) {
      const token = JSON.parse($Cookies.get("ERP_REPORT"));
      let params = {
        customerid: token.parentId,
        comment: _.get(values, "comment"),
        rate: _.get(values, "rate"),
      };
      let url = "";
      url = "/feedback/create";
      let result = await ServiceBase.requestJson({
        url: url,
        method: "POST",
        data: params,
      });
      if (result.hasErrors) {
        let message = "";
        message = ["Bạn đã đánh giá trang rồi"];
        Ui.showErrors(message);
      } else {
        let message = "";
        message = "Cảm ơn bạn đã đóng góp ý kiến";
        Ui.showSuccess({ message: message });
        form.resetFields();
      }
    } else {
      Ui.showErrors(["Bạn phải đăng nhập để có thể đánh giá"]);
      history.push("/signin");
    }
  };
  const desc = ["Hài lòng", "Tốt", "Yêu thích", "Tuyệt vời", "Siêu tuyệt vời"];
  return (
    <div
      className={classNames({
        [className]: true,
      })}
    >
      <div className="contact">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4">
              <div className="contact-info">
                <h2>Trụ sở</h2>
                <h3>
                  <i className="fa fa-map-marker" />
                  125 Hoàng Ngân, Định Công, Thanh Xuân, Hà Nội
                </h3>
                <h3>
                  <i className="fa fa-envelope" />
                  office@gmail.com
                </h3>
                <h3>
                  <i className="fa fa-phone" />
                  +123-456-7890
                </h3>
                <div className="social">
                  <a href="">
                    <i className="fab fa-twitter" />
                  </a>
                  <a href="">
                    <i className="fab fa-facebook-f" />
                  </a>
                  <a href="">
                    <i className="fab fa-linkedin-in" />
                  </a>
                  <a href="">
                    <i className="fab fa-instagram" />
                  </a>
                  <a href="">
                    <i className="fab fa-youtube" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="contact-info">
                <h2>Cửa hàng</h2>
                <h3>
                  <i className="fa fa-map-marker" />7 ngõ 11, Nguyên Xá, Minh
                  Khai, Bắc Từ Liêm, Hà Nội
                </h3>
                <h3>
                  <i className="fa fa-envelope" />
                  qstore@gmail.com
                </h3>
                <h3>
                  <i className="fa fa-phone" />
                  +123-456-7890
                </h3>
                <div className="social">
                  <a href="">
                    <i className="fab fa-twitter" />
                  </a>
                  <a href="">
                    <i className="fab fa-facebook-f" />
                  </a>
                  <a href="">
                    <i className="fab fa-linkedin-in" />
                  </a>
                  <a href="">
                    <i className="fab fa-instagram" />
                  </a>
                  <a href="">
                    <i className="fab fa-youtube" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="contact-form">
                <h3>Đánh giá</h3>
                <Form
                  name="basic"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                >
                  <Row gutter={15}>
                    <Col md={24}>
                      <Form.Item shouldUpdate={true} noStyle>
                        {({ getFieldValue }) => (
                          <Form.Item
                            name="comment"
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng nhập dữ liệu",
                              },
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
                    <Col md={24}>
                      <Form.Item shouldUpdate={true} noStyle>
                        {({ getFieldValue }) => (
                          <Form.Item
                            name="rate"
                            rules={[
                              { required: true, message: "Vui lòng đánh giá" },
                            ]}
                          >
                            <Rate
                              tooltips={desc}
                              value={getFieldValue("rate")}
                            />
                          </Form.Item>
                        )}
                      </Form.Item>
                    </Col>

                    <Form.Item>
                      <Button type="primary" htmlType="submit" className="btn">
                        Xác nhận
                      </Button>
                    </Form.Item>
                  </Row>
                </Form>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="contact-map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.591679931078!2d105.80436741476294!3d21.008998686009107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac9f9c48186f%3A0x1b03c622388f8e0b!2zMTI1IEhvw6BuZyBOZ8OibiwgxJDhu4tuaCBDw7RuZywgVGhhbmggWHXDom4sIEjDoCBO4buZaSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1619601281536!5m2!1svi!2s"
                  width="600"
                  height="450"
                  allowFullScreen=""
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default styled(List)``;
