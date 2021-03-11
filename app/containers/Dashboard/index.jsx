import React, { memo, useCallback, useState, useEffect } from "react";

import Pie from "./PieSeries/index";
import Bar from "./BarSeries/index";
import { Table, Affix } from "antd";
import classNames from "classnames";
import styled from "styled-components";

const index = memo(({ className }) => {
  // useEffect(() => {
  //   var headerTabel = document.querySelector(".rowOne");
  //   var header = document.querySelector(".header");
  //   var header1 = document.querySelector(".header1");
  //   var origOffsetY = headerTabel.offsetTop;
  //   function onScroll(e) {
  //     window.scrollY >= origOffsetY
  //       ? header.classList.add("sticky")
  //       : header.classList.remove("sticky");
  //   }
  //   function onScroll1(e) {
  //     console.log("window.scrollX", window);
  //     window.scrollY >= origOffsetY
  //       ? header1.classList.add("sticky1")
  //       : header1.classList.remove("sticky1");
  //     window.scrollX >= 0 && header1.classList.remove("sticky1");
  //   }
  //   window.addEventListener("scroll", onScroll1);
  //   window.addEventListener("scroll", onScroll);
  // }, []);

  // const columns = [
  //   {
  //     title: "Name",
  //     dataIndex: "name",
  //     key: "name",
  //     width: 500,
  //     className: "header",
  //     filters: [
  //       {
  //         text: "Joe",
  //         value: "Joe",
  //       },
  //       {
  //         text: "John",
  //         value: "John",
  //       },
  //     ],
  //     onFilter: (value, record) => record.name.indexOf(value) === 0,
  //   },
  //   {
  //     title: "Other",
  //     className: "header1",
  //     width: 1000,
  //     children: [
  //       {
  //         title: "Age",
  //         dataIndex: "age",
  //         key: "age",
  //         width: 300,
  //         sorter: (a, b) => a.age - b.age,
  //       },
  //       {
  //         title: "Address",
  //         width: 1000,
  //         children: [
  //           {
  //             title: "Street",
  //             dataIndex: "street",
  //             key: "street",
  //             width: 400,
  //           },
  //           {
  //             title: "Block",
  //             children: [
  //               {
  //                 title: "Building",
  //                 dataIndex: "building",
  //                 key: "building",
  //                 width: 400,
  //               },
  //               {
  //                 title: "Door No.",
  //                 dataIndex: "number",
  //                 key: "number",
  //                 width: 400,
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     title: "Company",
  //     width: 1000,
  //     children: [
  //       {
  //         title: "Company Address",
  //         dataIndex: "companyAddress",
  //         key: "companyAddress",
  //         width: 500,
  //       },
  //       {
  //         title: "Company Name",
  //         dataIndex: "companyName",
  //         key: "companyName",
  //         width: 500,
  //       },
  //     ],
  //   },
  //   {
  //     title: "Gender",
  //     dataIndex: "gender",
  //     key: "gender",
  //     width: 500,
  //   },
  // ];

  // const data = [];
  // for (let i = 0; i < 100; i++) {
  //   data.push({
  //     key: i,
  //     name: "John Brown",
  //     age: i + 1,
  //     street: "Lake Park",
  //     building: "C",
  //     number: 2035,
  //     companyAddress: "Lake Street 42",
  //     companyName: "SoftLake Co",
  //     gender: "M",
  //   });
  // }
  return (
    <div
      className={classNames({
        [className]: true,
      })}
    >
      {/* <Table
        columns={columns}
        dataSource={data}
        bordered
        size="middle"
        className="rowOne"
        scroll={{ x: "calc(2000px + 50%)" }}
        pagination={false}
      /> */}
    </div>
  );
});
export default styled(index)`
  .sticky {
    position: fixed;
    top: 0px;
    z-index: 1;
  }
  .sticky1 {
    position: fixed;
    top: 0px;
    margin-left: 500px;
    width: 800px;
    z-index: 1;
    background: #f6d565;
  }

  th.ant-table-cell.header {
    background: #f6d565;
  }
  .footer {
    width: 100%;
    background: #f9e6a7;
    padding: 25px 0;
  }
`;
