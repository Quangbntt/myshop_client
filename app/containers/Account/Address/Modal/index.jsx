import React, { memo, useState, useEffect, useCallback } from "react";
import { Spin, Button, Form, Select, Modal, Row, Col } from "antd";
import _ from "lodash";
import {
  CloseOutlined,
  CheckOutlined,
  UploadOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { Ui } from "utils/Ui";
import ServiceBase from "utils/ServiceBase";
import TextArea from "antd/lib/input/TextArea";
import { useParams } from "react-router";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import topng from "images/10680260701556280914-128.png";

const { Option } = Select;
let time = null;
const ModalCreate = memo(
  ({ visible, setVisible, setRow, row, data, setData, setParams }) => {
    console.log("visible",visible);
    const [form] = Form.useForm();
    const [marker, setMarker] = useState({
      lat: visible.data.lat ? visible.data.lat : 20.9802148,
      lng: visible.data.long ? visible.data.long : 105.8414544,
    });
    console.log("marker",marker);
    const user_id = useParams();
    const [objForm, setObjForm] = useState({});
    const [center, setCenter] = useState({
      lat: visible.data.lat ? visible.data.lat : undefined,
      lng: visible.data.long ? visible.data.long : undefined,
    });
    const [nameP, setNameP] = useState("");
    const [address, setAddress] = useState("");
    const handleSelect = async (value) => {
      form.setFieldsValue({ address: value });
      const results = await geocodeByAddress(value);
      console.log("resultsresults", results);
      const latLng = await getLatLng(results[0]);
      setAddress(value);
      // onSelectAddress(value);
      setMarker({ lat: latLng.lat, lng: latLng.lng });
      // onClickAddress({ lat: latLng.lat, lng: latLng.lng });
      setCenter({ lat: latLng.lat, lng: latLng.lng });
      setNameP(value);
    };
    const handleChange = (value) => {
      console.log("valuevalue", value);
      setAddress(value);
    };
    const mapClicked = (mapProps, map, clickEvent) => {
      const latMarkers = clickEvent.latLng.lat();
      const lngMarkers = clickEvent.latLng.lng();
      setMarker({ lat: latMarkers, lng: lngMarkers });
      onClickAddress({ lat: latMarkers, lng: lngMarkers });
      setCenter({ lat: latLng.lat, lng: latLng.lng });
      const address = document.getElementById("address").value;
      geocoder.geocode({ address: address }, function(results, status) {
        if (status == "OK") {
          map.setCenter(results[0].geometry.location);
          const marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location,
          });
        } else {
          alert(
            "Geocode was not successful for the following reason: " + status
          );
        }
      });
    };
    const handleOk = () => {
      setVisible((preState) => {
        let nextState = { ...preState };
        nextState.isShow = false;
        return nextState;
      });
    };
    const handleCancel = () => {
      form.resetFields();
      setVisible((preState) => {
        let nextState = { ...preState };
        nextState.isShow = false;
        return nextState;
      });
    };

    const type = _.get(visible, "type");

    const onFinish = async (values) => {
      let row = _.get(visible, "data");
      let params = {};
      let url = "";
      if (type === "create") {
        url = "/shipplace/create";
        params = {
          user_id: user_id.id,
          address: address,
          lat: center.lat,
          long: center.lng,
        };
      } else {
        url = "/shipplace/update";
        params = {
          id: row.id,
          user_id: user_id.id,
          address: address,
          lat: center.lat,
          long: center.lng,
        };
      }
      let result = await ServiceBase.requestJson({
        url: url,
        method: "POST",
        data: params,
      });
      if (result.hasErrors) {
        Ui.showErrors(result.errors);
      } else {
        let message = "";
        if (type === "create") {
          message = "Thêm mới địa chỉ thành công";
        } else {
          message = "Cập nhật địa chỉ thành công";
        }
        Ui.showSuccess({ message: message });
        setVisible((preState) => {
          let nextState = { ...preState };
          nextState.isShow = false;
          return nextState;
        });
        setParams((preState) => {
          let nextState = { ...preState };
          nextState = nextState;
          return nextState;
        });
        form.resetFields();
      }
    };

    const boweload = useCallback(async () => {
      if (type === "edit") {
        setMarker((preState) => {
          let nextState = { ...preState };
          nextState.lat = _.get(visible, "data").lat;
          nextState.lng = _.get(visible, "data").long;
          return nextState;
        });
        form.setFieldsValue(_.get(visible, "data"));
      }
    }, [_.get(visible, "data")]);
    useEffect(() => {
      setTimeout(boweload, 0);
    }, [boweload]);

    return (
      <Modal
        title={type === "create" ? "Thêm mới địa chỉ" : "Cập nhật địa chỉ"}
        visible={_.get(visible, "isShow")}
        onCancel={handleCancel}
        width="50%"
        destroyOnClose
        footer={[]}
      >
        <Form form={form} name="control-ref" onFinish={onFinish}>
          <Row gutter={15}>
            <Col md={12}>
              <Form.Item shouldUpdate={true} noStyle>
                {({ getFieldValue }) => (
                  <Form.Item
                    name="address"
                    rules={[
                      { required: true, message: "Vui lòng nhập dữ liệu" },
                    ]}
                  >
                    <PlacesAutocomplete
                      value={address}
                      onChange={handleChange}
                      onSelect={handleSelect}
                    >
                      {({
                        getInputProps,
                        suggestions,
                        getSuggestionItemProps,
                        loading,
                      }) => (
                        <div>
                          <input
                            style={{ width: 300 }}
                            {...getInputProps({
                              placeholder: "Nhập tên địa chỉ...",
                            })}
                          />
                          <div>
                            {loading && <div>Loading...</div>}
                            {suggestions.map((suggestion) => {
                              const style = suggestion.active
                                ? {
                                    backgroundColor: "#3C7E55",
                                    cursor: "pointer",
                                  }
                                : {
                                    backgroundColor: "#ffffff",
                                    cursor: "pointer",
                                  };
                              return (
                                <div
                                  {...getSuggestionItemProps(suggestion, {
                                    style,
                                  })}
                                >
                                  {suggestion.description}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </PlacesAutocomplete>
                  </Form.Item>
                )}
              </Form.Item>
            </Col>
            <Col md={24}>
              <Form.Item shouldUpdate={true} noStyle>
                {({ getFieldValue }) => (
                  <Form.Item
                    name="address"
                    rules={[
                      { required: true, message: "Vui lòng nhập dữ liệu" },
                    ]}
                  >
                    <div style={{ height: "50vh" }}>
                      <div style={{ height: 10 }} />
                      {/* <div style={{ marginTop: 10 }}>
                        <PlacesAutocomplete
                          value={address}
                          onChange={handleChange}
                          onSelect={handleSelect}
                        >
                          {({
                            getInputProps,
                            suggestions,
                            getSuggestionItemProps,
                            loading,
                          }) => (
                            <div>
                              <input
                                style={{ width: 300 }}
                                {...getInputProps({
                                  placeholder: "Nhập tên địa chỉ...",
                                })}
                              />
                              <div>
                                {loading && <div>Loading...</div>}
                                {suggestions.map((suggestion) => {
                                  const style = suggestion.active
                                    ? {
                                        backgroundColor: "#3C7E55",
                                        cursor: "pointer",
                                      }
                                    : {
                                        backgroundColor: "#ffffff",
                                        cursor: "pointer",
                                      };
                                  return (
                                    <div
                                      {...getSuggestionItemProps(suggestion, {
                                        style,
                                      })}
                                    >
                                      {suggestion.description}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </PlacesAutocomplete>
                      </div>
                      <div style={{ height: 10 }} /> */}
                      <Map
                        google={google}
                        zoom={16}
                        center={center}
                        onClick={mapClicked}
                        initialCenter = {{
                          lat: marker? marker.lat: undefined,
                          lng: marker? marker.lng: undefined,
                        }}
                      >
                        <Marker
                          title={nameP}
                          position={{  lat: marker? marker.lat: undefined,
                            lng: marker? marker.lng: undefined, }}
                        />
                        <Marker />
                      </Map>
                    </div>
                  </Form.Item>
                )}
              </Form.Item>
            </Col>
            <Col md={24} />
          </Row>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ background: "#FF6F61" }}
            >
              {type === "create" ? "Tạo mới" : "Cập nhật"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
);
export default GoogleApiWrapper({
  apiKey: "AIzaSyDmN132rIdAeZOwpBcicXnArLWTrhbR_Lk",
})(ModalCreate);
