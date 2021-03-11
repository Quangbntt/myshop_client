import moment from "moment";
import _ from "lodash";

// làm dữ liệu tính đầu vào tài chính
const setDataFinance = async (dataNew) => {
  _.map(dataNew, (item, index) => {
    item.key = index + 1;
    if (index == 0 || index == 1 || index == 3 || index == 5) {
      item.show = true;
    }
    return item;
  });
};
// tính dữ liệu nhập của tài chính
const dataFinance = async ({ newData, index, rowItem, params }) => {
  // thực hiện tháng này
  let presentOne = 0;
  let presentTwo = 0;
  let presentThree = 0;
  let presentFor = 0;
  let presentFive = 0;
  let presentSix = 0;
  let presentSeven = 0;
  // dự kiến tháng này
  let planOne = 0;
  let planTwo = 0;
  let planThree = 0;
  let planFor = 0;
  let planFive = 0;
  let planSix = 0;
  let planSeven = 0;

  // thực hiện tháng trước
  let last_monthOne = 0;
  let last_monthSeven = 0;
  //cùng kỳ năm trước
  let same_periodOne = 0;
  let same_periodSeven = 0;

  // thực hiện tháng này 2
  let cf_presentOne = 0;
  let cf_presentTwo = 0;
  let cf_presentThree = 0;
  let cf_presentFor = 0;
  let cf_presentFive = 0;
  let cf_presentSix = 0;
  // dự kiến tháng này 2
  let cf_planOne = 0;
  let cf_planTwo = 0;
  let cf_planThree = 0;
  let cf_planFor = 0;
  let cf_planFive = 0;
  let cf_planSix = 0;
  await _.map(newData, (item, key) => {
    item.key = key + 1;
    if (key == 0) {
      // Doanh thu từ bán hàng hoá dịch vụ
      //Thực hiện tháng này
      presentOne = item.present;
      planOne = item.plan;
      // show input
      item.show = true;
      // thực hiện tháng trước
      last_monthOne = item.last_month;
      // cùng kỳ năm trước
      same_periodOne = item.same_period;

      //Thực hiện tháng này 2
      cf_presentOne = item.cf_present;
      //dự kiến tháng này 2
      cf_planOne = item.cf_plan;
      //%TH/DK
      item.percent = item.plan > 0 ? (item.present / item.plan) * 100 : "";
      //% so tháng trước
      item.percent_last =
        item.last_month > 0 ? (item.present / item.last_month) * 100 : "";
      //% Tỷ lệ Ngân sách so dòng tiền
      item.ratio =
        _.isNumber(cf_presentOne) && (item.present / cf_presentOne) * 100;
    } else if (key == 1) {
      // show input
      item.show = true;

      // nếu thực hiện tháng này chưa nhập ( status = 0 ) thì tính công thứ đệ quy
      if (item.status == 0) {
        let countPresent = planOne > 0 && (presentOne * item.plan) / planOne;
        item.present =
          countPresent && Math.round((countPresent + 0.00001) * 100) / 100;
        presentTwo = item.present;
        planTwo = item.plan;
      } else {
        // Giá vốn (CP vận hành)
        presentTwo = item.present;
        planTwo = item.plan;
      }

      //thực hiện tháng này 2
      cf_presentTwo = item.cf_present;
      //đự kiến tháng này 2
      cf_planTwo = item.cf_plan;

      //%TH/DK
      item.percent = item.plan > 0 ? (item.present / item.plan) * 100 : "";
      //% so tháng trước
      item.percent_last =
        item.last_month > 0 ? (item.present / item.last_month) * 100 : "";
      //% Tỷ lệ Ngân sách so dòng tiền
      item.ratio =
        _.isNumber(cf_presentTwo) && (item.present / cf_presentTwo) * 100;
    } else if (key == 2) {
      //Lợi nhuận gộp
      item.present = presentOne - presentTwo;
      item.plan = planOne - planTwo;

      presentThree = item.present;
      planThree = item.plan;
      // thực hiện tháng này 2
      item.cf_present = cf_presentOne - cf_presentTwo;
      cf_presentThree = item.cf_present;
      //dự kiến tháng này
      item.cf_plan = cf_planOne - cf_planTwo;
      cf_planThree = item.cf_plan;
      //%TH/DK
      item.percent = item.plan > 0 ? (item.present / item.plan) * 100 : "";
      //% so tháng trước
      item.percent_last =
        item.last_month > 0 ? (item.present / item.last_month) * 100 : "";
      //% Tỷ lệ Ngân sách so dòng tiền
      item.ratio =
        _.isNumber(cf_presentThree) && (item.present / cf_presentThree) * 100;
    } else if (key == 3) {
      // show input
      item.show = true;

      // nếu thực hiện tháng này chưa nhập ( status = 0 ) thì tính công thứ đệ quy
      if (item.status == 0) {
        let countPresent = planOne > 0 && (presentOne * item.plan) / planOne;
        item.present =
          countPresent && Math.round((countPresent + 0.00001) * 100) / 100;
        presentFor = item.present;
        planFor = item.plan;
      } else {
        //Các chi phí hoạt động khác
        presentFor = item.present;
        planFor = item.plan;
      }

      // thực hiện tháng này 2
      cf_presentFor = item.cf_present;
      //dự kiến tháng này2
      cf_planFor = item.cf_plan;
      //%TH/DK
      item.percent = item.plan > 0 ? (item.present / item.plan) * 100 : "";
      //% so tháng trước
      item.percent_last =
        item.last_month > 0 ? (item.present / item.last_month) * 100 : "";
      //% Tỷ lệ Ngân sách so dòng tiền
      item.ratio =
        _.isNumber(cf_presentFor) && (item.present / cf_presentFor) * 100;
    } else if (key == 4) {
      //LN thuần từ HĐ kinh doanh
      item.present = presentThree - presentFor;
      item.plan = planThree - planFor;
      presentFive = item.present;
      planFive = item.plan;
      // thực hiện tháng này 2
      item.cf_present = cf_presentThree - cf_presentFor;
      cf_presentFive = item.cf_present;
      //dự kiến tháng này2
      item.cf_plan = cf_planThree - cf_planFor;
      cf_planFive = item.cf_plan;

      //%TH/DK
      item.percent = item.plan > 0 ? (item.present / item.plan) * 100 : "";
      //% so tháng trước
      item.percent_last =
        item.last_month > 0 ? (item.present / item.last_month) * 100 : "";
      //% Tỷ lệ Ngân sách so dòng tiền
      item.ratio =
        _.isNumber(cf_presentFive) && (item.present / cf_presentFive) * 100;
    } else if (key == 5) {
      // show input
      item.show = true;
      // nếu thực hiện tháng này chưa nhập ( status = 0 ) thì tính công thứ đệ quy
      if (item.status == 0) {
        let countPresent = planOne > 0 && (presentOne * item.plan) / planOne;
        item.present =
          countPresent && Math.round((countPresent + 0.00001) * 100) / 100;
        presentSix = item.present;
        planSix = item.plan;
      } else {
        //Lãi/lỗ HĐ khác
        presentSix = item.present;
        planSix = item.plan;
      }

      // thực hiện tháng này 2
      cf_presentSix = item.cf_present;
      //dự kiến tháng này2
      cf_planSix = item.cf_plan;
      //%TH/DK
      item.percent = item.plan > 0 ? (item.present / item.plan) * 100 : "";
      //% so tháng trước
      item.percent_last =
        item.last_month > 0 ? (item.present / item.last_month) * 100 : "";
      //% Tỷ lệ Ngân sách so dòng tiền
      item.ratio =
        _.isNumber(cf_presentSix) && (item.present / cf_presentSix) * 100;
    } else if (key == 6) {
      //LN Trước thuế
      // thực hiện tháng này
      item.present = presentFive + presentSix;
      presentSeven = item.present;
      //dự kiến tháng này
      item.plan = planFive + planSix;
      planSeven = item.plan;
      // thực hiện tháng này 2
      item.cf_present = cf_presentFive + cf_presentSix;
      //dự kiến tháng này 2
      item.cf_plan = cf_planFive + cf_planSix;
      // thực hiện tháng trước
      last_monthSeven = item.last_month;
      // cùng kỳ năm trước
      same_periodSeven = item.same_period;
      //%TH/DK
      item.percent = _.isNumber(item.plan) && (item.present / item.plan) * 100;
      //% so tháng trước
      item.percent_last =
        _.isNumber(item.last_month) && (item.present / item.last_month) * 100;
      //% Tỷ lệ Ngân sách so dòng tiền
      item.ratio =
        _.isNumber(item.cf_present) && (item.present / item.cf_present) * 100;
    } else if (key == 7) {
      //ROS
      // thực hiện tháng này
      item.present =
        _.isNumber(presentOne) && (presentSeven / presentOne) * 100;
      //dự kiến tháng này
      item.plan = _.isNumber(planOne) && (planSeven / planOne) * 100;
      //thực hiện tháng trước
      item.last_month =
        _.isNumber(last_monthOne) && (last_monthSeven / last_monthOne) * 100;
      //cùng kỳ năm trước
      item.same_period =
        _.isNumber(same_periodOne) && (same_periodSeven / same_periodOne) * 100;
      //%TH/DK
      item.percent = item.plan > 0 ? (item.present / item.plan) * 100 : "";
      //% so tháng trước
      item.percent_last =
        item.last_month > 0 ? (item.present / item.last_month) * 100 : "";
    }
    return item;
  });

  return newData;
};

//set lại dữ liệu khi đầu vào khách hàng

const setDataUser = async (newData) => {
  // khi set xong làm lại dữ liệu
  let sumTotal = 0;
  let sumHaiLong = 0;
  let sumTdHaiLong = 0;
  let hailong = 0;
  let tdHailong = 0;
  let totalHaiLong = 0;
  let totalTdHaiLong = 0;
  let objHaiLong = {};
  let objTdHaiLong = {};
  await _.map(newData, (item, _index) => {
    let sumTotalMonth = 0;
    item.key = _index + 1;
    // khi for item obj thi for de lay 12 thang
    for (let i = 1; i <= 12; i++) {
      if (_index == 0) {
        if (item[`monthly_${i}`] > 0) {
          hailong++;
          sumHaiLong += item[`monthly_${i}`];
        }
        objHaiLong = item;
        let total = hailong > 0 && sumHaiLong / hailong;
        totalHaiLong = total;
        item[`monthly_tong`] =
          total > 0 ? Math.round((total + 0.00001) * 100) / 100 : 0;
      } else if (_index == 1) {
        if (item[`monthly_${i}`] > 0) {
          tdHailong++;
          sumTdHaiLong += item[`monthly_${i}`];
        }
        objTdHaiLong = item;
        let total = tdHailong > 0 && sumTdHaiLong / tdHailong;
        totalTdHaiLong = total;
        item[`monthly_tong`] =
          total > 0 ? Math.round((total + 0.00001) * 100) / 100 : 0;
      } else if (_index == 2) {
        // lấy dòng 1 và dòng 2 cộng vào và lấy 100 trừ đi

        let dayHl = _.get(objHaiLong, `monthly_${i}`);
        let dayTdHl = _.get(objTdHaiLong, `monthly_${i}`);

        let total =
          totalHaiLong || totalTdHaiLong
            ? 100 - (totalHaiLong + totalTdHaiLong)
            : "";
        let totalDay = dayHl || dayTdHl ? 100 - (dayHl + dayTdHl) : "";
        item[`monthly_tong`] = _.isNumber(total)
          ? Math.round((total + 0.00001) * 100) / 100
          : 0;
        item[`monthly_${i}`] = _.isNumber(totalDay)
          ? Math.round((totalDay + 0.00001) * 100) / 100
          : 0;
      }
    }
    if (_index > 2) {
      // tính tổng của 2 cột hàng đầu

      // tính tổng hàng 1 và 2
      _.forEach(item, (value, key) => {
        // khi for item obj thi for de lay 12 thang
        for (let i = 1; i <= 12; i++) {
          if (key == `monthly_${i}`) {
            sumTotalMonth += value;
          }
        }
      });
      item[`monthly_tong`] = sumTotalMonth;
      // tính tổng của 2 dòng tổng đầu tiên
      if (_index < 2) {
        sumTotal += item[`monthly_tong`];
      }
    } else if (_index == 2) {
      // set lại dữ liệu tại dòng 2 theo hàng và cột
    }
    return item;
  });

  // console.log("newData set", newData);
  return newData;
};

// set lại nhập dữ liệu khách hàng
const dataUser = async (newData, month, index) => {
  let sumTotalMonth = 0;
  let sumTotal = 0;
  let sumkh = 0;
  let sumHaiLong = 0;
  let sumTdHaiLong = 0;
  let hailong = 0;
  let tdHailong = 0;
  await _.map(newData, (item, _index) => {
    // tính trung bình của 2 dòng đầu
    for (let i = 1; i <= 12; i++) {
      if (_index == 0) {
        if (item[`monthly_${i}`] > 0) {
          hailong++;
          sumHaiLong += item[`monthly_${i}`];
        }
        let total = hailong > 0 && sumHaiLong / hailong;
        item[`monthly_tong`] =
          total > 0 ? Math.round((total + 0.00001) * 100) / 100 : 0;
      } else if (_index == 1) {
        if (item[`monthly_${i}`] > 0) {
          tdHailong++;
          sumTdHaiLong += item[`monthly_${i}`];
        }
        let total = tdHailong > 0 && sumTdHaiLong / tdHailong;
        item[`monthly_tong`] =
          total > 0 ? Math.round((total + 0.00001) * 100) / 100 : 0;
      }
    }
    if (_index > 2) {
      // tính tổng của 2 cột hàng đầu
      sumTotalMonth += item[`monthly_${month}`];
      // tính tổng hàng 1 và 2
      if (_index == index) {
        _.forEach(item, (value, key) => {
          // khi for item obj thi for de lay 12 thang
          for (let i = 1; i <= 12; i++) {
            if (key == `monthly_${i}`) {
              sumkh += value;
            }
          }
        });
      }
      // khi lấy dc tổng cả tháng của dòng thì set data

      if (_index == index) {
        item[`monthly_tong`] = sumkh;
      }
      // tính tổng của 2 dòng tổng đầu tiên
      if (_index < 2) {
        sumTotal += item[`monthly_tong`];
      }
    } else if (_index == 2) {
      // set lại dữ liệu tại dòng 2 theo hàng và cột
      item[`monthly_${month}`] = 100 - sumTotalMonth;
      item[`monthly_tong`] = 100 - sumTotal;
    }
    return item;
  });
  return newData;
};

// set lại dữ liệu đầu vào nhân sự
const setDataPersonnel = async (newData, month, index) => {
  // khi set xong làm lại dữ liệu
  let sumLaiXe = 0;
  let sumBeginning = 0;
  let sumRatioHT = 0;
  let sumNoLaiXe = 0;
  let sumStewardess = 0;
  let sumNoBeginning = 0;
  let sumAmountStewardess = 0;
  let sumNoBeginningRatio = 0;
  let sumRatioStewardess = 0;
  let laixe = 0;
  let beginning = 0;
  let ratioHT = 0;
  let noLaiXe = 0;
  let stewardess = 0;
  let ratioStewardess = 0;
  let amountStewardess = 0;
  let noBeginning = 0;
  let noBeginningRatio = 0;

  let objDriver = {};
  let objBeginning = {};
  let objNoBeginningRatio = {};
  let objNoBeginning = {};
  let objRatioStewardess = {};
  let objAmountStewardess = {};
  let objStewardess = {};

  let totalEducate = 0;
  let totalPerform = 0;
  await _.map(newData, (item, _index) => {
    item.key = _index + 1;
    // khi for item obj thi for de lay 12 thang
    for (let i = 1; i <= 12; i++) {
      // tính tổng của 2 dòng đầu
      if (_index == 0) {
        totalEducate += item[`monthly_${i}`];
        item[`monthly_tong`] = totalEducate;
      } else if (_index == 1) {
        totalPerform += item[`monthly_${i}`];
        item[`monthly_tong`] = totalPerform;
      }
      // tính trung bình cộng của cách dòng lại
      else if (_index == 2) {
        if (item[`monthly_${i}`] > 0) {
          laixe++;
          sumLaiXe += item[`monthly_${i}`];
        }
        item[`monthly_tong`] = laixe > 0 && sumLaiXe / laixe;
        objDriver = item;
      } else if (_index == 3) {
        if (item[`monthly_${i}`] > 0) {
          beginning++;
          sumBeginning += item[`monthly_${i}`];
        }
        item[`monthly_tong`] = beginning > 0 && sumBeginning / beginning;
        objBeginning = item;
      } else if (_index == 4) {
        let totalDay =
          _.get(objDriver, `monthly_${i}`) > 0 &&
          (_.get(objBeginning, `monthly_${i}`) /
            _.get(objDriver, `monthly_${i}`)) *
            100;
        item[`monthly_${i}`] = _.isNumber(totalDay)
          ? Math.round((totalDay + 0.00001) * 100) / 100
          : 0;
        if (item[`monthly_${i}`] > 0) {
          ratioHT++;
          sumRatioHT += item[`monthly_${i}`];
        }
        let total =
          _.get(objDriver, `monthly_tong`) > 0 &&
          (_.get(objBeginning, `monthly_tong`) /
            _.get(objDriver, `monthly_tong`)) *
            100;
        item[`monthly_tong`] = _.isNumber(total)
          ? Math.round((total + 0.00001) * 100) / 100
          : 0;
      } else if (_index == 5) {
        if (item[`monthly_${i}`] > 0) {
          stewardess++;
          sumStewardess += item[`monthly_${i}`];
        }
        let total = stewardess > 0 && sumStewardess / stewardess;
        item[`monthly_tong`] =
          total > 0 ? Math.round((total + 0.00001) * 100) / 100 : 0;
        objStewardess = item;
      } else if (_index == 6) {
        if (item[`monthly_${i}`] > 0) {
          amountStewardess++;
          sumAmountStewardess += item[`monthly_${i}`];
        }
        let total =
          amountStewardess > 0 && sumAmountStewardess / amountStewardess;
        item[`monthly_tong`] =
          total > 0 ? Math.round((total + 0.00001) * 100) / 100 : 0;
        objAmountStewardess = item;
      } else if (_index == 7) {
        let totalDay =
          _.get(objStewardess, `monthly_${i}`) > 0 &&
          (_.get(objAmountStewardess, `monthly_${i}`) /
            _.get(objStewardess, `monthly_${i}`)) *
            100;

        if (totalDay) {
          ratioStewardess++;
          sumRatioStewardess += totalDay;
          item[`monthly_${i}`] = Math.round((totalDay + 0.00001) * 100) / 100;
        }
        let total =
          _.get(objStewardess, `monthly_tong`) > 0 &&
          (_.get(objAmountStewardess, `monthly_tong`) /
            _.get(objStewardess, `monthly_tong`)) *
            100;
        item[`monthly_tong`] =
          total > 0 ? Math.round((total + 0.00001) * 100) / 100 : 0;
      } else if (_index == 8) {
        if (item[`monthly_${i}`] > 0) {
          noLaiXe++;
          sumNoLaiXe += item[`monthly_${i}`];
        }
        let total = noLaiXe > 0 && sumNoLaiXe / noLaiXe;
        item[`monthly_tong`] =
          total > 0 ? Math.round((total + 0.00001) * 100) / 100 : 0;
        objNoBeginningRatio = item;
      } else if (_index == 9) {
        if (item[`monthly_${i}`] > 0) {
          noBeginning++;
          sumNoBeginning += item[`monthly_${i}`];
        }
        let total = noBeginning > 0 && sumNoBeginning / noBeginning;
        item[`monthly_tong`] =
          total > 0 ? Math.round((total + 0.00001) * 100) / 100 : 0;
        objNoBeginning = item;
      } else if (_index == 10) {
        let totalDay =
          _.get(objNoBeginningRatio, `monthly_${i}`) > 0 &&
          (_.get(objNoBeginning, `monthly_${i}`) /
            _.get(objNoBeginningRatio, `monthly_${i}`)) *
            100;

        if (totalDay) {
          noBeginningRatio++;
          sumNoBeginningRatio += totalDay;
          item[`monthly_${i}`] = Math.round((totalDay + 0.00001) * 100) / 100;
        }
        let total =
          _.get(objNoBeginningRatio, `monthly_tong`) > 0 &&
          (_.get(objNoBeginning, `monthly_tong`) /
            _.get(objNoBeginningRatio, `monthly_tong`)) *
            100;
        item[`monthly_tong`] =
          total > 0 ? Math.round((total + 0.00001) * 100) / 100 : 0;
      }
    }
    return item;
  });

  return newData;
};
// set lại nhập dữ liệu nhân sự
const dataPersonnel = async (newData, month, index, rowItem) => {
  // khi set xong làm lại dữ liệu
  let sumLaiXe = 0;
  let sumBeginning = 0;
  let sumRatioHT = 0;
  let sumNoLaiXe = 0;
  let sumNoBeginning = 0;
  let sumNoBeginningRatio = 0;
  let laixe = 0;
  let beginning = 0;
  let ratioHT = 0;
  let noLaiXe = 0;
  let noBeginning = 0;
  let noBeginningRatio = 0;

  let objDriver = {};
  let objBeginning = {};
  let objNoBeginningRatio = {};
  let objNoBeginning = {};

  let totalEducate = 0;
  let totalPerform = 0;
  newData[index][`monthly_${month}`] = rowItem[`monthly_${month}`];
  await _.map(newData, (item, _index) => {
    for (let i = 1; i <= 12; i++) {
      if (_index == 0) {
        // tính tổng của 2 cột hàng đầu
        totalEducate += item[`monthly_${i}`];
        item[`monthly_tong`] = totalEducate;
      } else if (_index == 1) {
        totalPerform += item[`monthly_${i}`];
        item[`monthly_tong`] = totalPerform;
      } // tính trung bình cộng của cách dòng lại
      else if (_index == 2) {
        if (item[`monthly_${i}`] > 0) {
          laixe++;
          sumLaiXe += item[`monthly_${i}`];
        }
        objDriver = item;
        item[`monthly_tong`] = laixe > 0 && sumLaiXe / laixe;
      } else if (_index == 3) {
        if (item[`monthly_${i}`] > 0) {
          beginning++;
          sumBeginning += item[`monthly_${i}`];
        }
        objBeginning = item;
        item[`monthly_tong`] = beginning > 0 && sumBeginning / beginning;
      } else if (_index == 4) {
        if (item[`monthly_${i}`] > 0) {
          ratioHT++;
          sumRatioHT += item[`monthly_${i}`];
        }
        let totalDay =
          _.get(objDriver, `monthly_${i}`) > 0 &&
          (_.get(objBeginning, `monthly_${i}`) /
            _.get(objDriver, `monthly_${i}`)) *
            100;

        item[`monthly_${i}`] = totalDay
          ? Math.round((totalDay + 0.00001) * 100) / 100
          : 0;
        let total =
          _.get(objDriver, `monthly_tong`) > 0 &&
          (_.get(objBeginning, `monthly_tong`) /
            _.get(objDriver, `monthly_tong`)) *
            100;
        item[`monthly_tong`] =
          total > 0 ? Math.round((total + 0.00001) * 100) / 100 : 0;
      } else if (_index == 5) {
        if (item[`monthly_${i}`] > 0) {
          noLaiXe++;
          sumNoLaiXe += item[`monthly_${i}`];
        }
        objNoBeginningRatio = item;
        let total = noLaiXe > 0 && sumNoLaiXe / noLaiXe;
        item[`monthly_tong`] =
          total > 0 ? Math.round((total + 0.00001) * 100) / 100 : 0;
      } else if (_index == 6) {
        if (item[`monthly_${i}`] > 0) {
          noBeginning++;
          sumNoBeginning += item[`monthly_${i}`];
        }
        objNoBeginning = item;
        let total = noBeginning > 0 && sumNoBeginning / noBeginning;
        item[`monthly_tong`] =
          total > 0 ? Math.round((total + 0.00001) * 100) / 100 : 0;
      } else if (_index == 7) {
        if (item[`monthly_${i}`] > 0) {
          noBeginningRatio++;
          sumNoBeginningRatio += item[`monthly_${i}`];
        }
        let totalDay =
          _.get(objNoBeginningRatio, `monthly_${i}`) > 0 &&
          (_.get(objNoBeginning, `monthly_${i}`) /
            _.get(objNoBeginningRatio, `monthly_${i}`)) *
            100;
        item[`monthly_${i}`] = totalDay
          ? Math.round((totalDay + 0.00001) * 100) / 100
          : 0;
        let total =
          noBeginningRatio > 0 && sumNoBeginningRatio / noBeginningRatio;
        item[`monthly_tong`] =
          total > 0 ? Math.round((total + 0.00001) * 100) / 100 : 0;
      }
    }

    return item;
  });
  return newData;
};

//làm conver theo ngày vận hành
const dayOperte = async (dataNew, date, params) => {
  let xetot = 0;
  let xenam = 0;
  let totalXeTot = 0;
  let totalXeNam = 0;
  let totalXe = 0;
  let totalSoLuot = 0;
  let dayXe = 0;
  let daySoLuot = 0;
  let dayDinhBien = 0;

  let objLuotXe = {};
  let objDinhBien = {};
  let arrData = await _.map(dataNew, (item, index) => {
    // tính trung bình cộng của dòng xe tốt xe nằm
    for (let _i = 1; _i <= date; _i++) {
      if (index == 1) {
        if (item[`daily_${_i}`] > 0) {
          xetot++;
          totalXeTot += item[`daily_${_i}`];
        }
        item.daily_tong = totalXeTot && totalXeTot / xetot;
      } else if (index == 2) {
        if (item[`daily_${_i}`] > 0) {
          xenam++;
          totalXeNam += item[`daily_${_i}`];
          item.daily_tong = totalXeNam && totalXeNam / xenam;
        }
      }
      // tính tổng của cách hàng còn lại
      if (index == 0) {
        if (item[`daily_${_i}`] > 0) {
          totalXe += item[`daily_${_i}`];
          dayXe = item[`daily_${_i}`];
          item.daily_tong = totalXe && totalXe;
          objLuotXe = item;
        }
      } else if (index == 3) {
        if (item[`daily_${_i}`] > 0) {
          totalSoLuot += item[`daily_${_i}`];
          daySoLuot = dayXe - item[`daily_${_i}`];
          objDinhBien = item;
          item.daily_tong = totalSoLuot && totalSoLuot;
        }
      } else if (index == 4) {
        if (item[`daily_${_i}`] > 0) {
          dayDinhBien = item[`daily_${_i}`];
          item[`daily_${_i}`] =
            _.get(objLuotXe, `daily_${_i}`, 0) -
            _.get(objDinhBien, `daily_${_i}`, 0);
          item.daily_tong = totalXe > 0 ? totalXe - totalSoLuot : "";
        }
      } else if (index == 5) {
        if (item[`daily_${_i}`] > 0) {
          item[`daily_${_i}`] =
            objLuotXe[`daily_${_i}`] > 0
              ? (objDinhBien[`daily_${_i}`] / objLuotXe[`daily_${_i}`]) * 100
              : 0;
          item.daily_tong = totalXe > 0 ? (totalSoLuot / totalXe) * 100 : "";
        }
      }
    }
  });
  return arrData;
};
// tính lại giá trị khi nhập data vận hành
const countOperte = async (newData, date, index, params, rowItem, day) => {
  let totalXe = 0;
  let tbXeTot = 0;
  let tbXeNam = 0;
  let dayXe = 0;
  let saidinhbien = 0;

  let soXeTot = 0;
  let soXeNam = 0;
  // set lại dữ liệu khi nhập vào
  newData[index][`daily_${day}`] = rowItem[`daily_${day}`];
  //  set xong là vào làm lại dữ liệu

  await _.map(newData, (item, key) => {
    let dayXeTot = 0;
    let dayXeNam = 0;
    for (let _i = 1; _i <= date; _i++) {
      // tính công thức và lấy từng dòng tức là index
      if (key == 0) {
        dayXe = item[`daily_${day}`];
      }

      // tính lại các công thức khi nhập dữ liệu
      if (key == 1) {
        // tính trung bình cộng của xe tốt
        if (item[`daily_${_i}`] > 0) {
          soXeTot++;
        }
        dayXeTot += item[`daily_${_i}`] > 0 && item[`daily_${_i}`];
        let tong = dayXeTot && dayXeTot / soXeTot;
        item.daily_tong =
          tong > 0 ? Math.round((tong + 0.00001) * 100) / 100 : 0;
      } else if (key == 2) {
        // tính trung bình cộng của xe năm
        if (item[`daily_${_i}`] > 0) {
          soXeNam++;
        }
        dayXeNam += item[`daily_${_i}`] > 0 && item[`daily_${_i}`];
        let tong = dayXeNam && dayXeNam / soXeNam;
        item.daily_tong =
          tong > 0 ? Math.round((tong + 0.00001) * 100) / 100 : 0;
      } else if (key == 3) {
        saidinhbien = dayXe - item[`daily_${day}`];
      } else if (key == 4) {
        item[`daily_${day}`] = saidinhbien;
        // item.daily_tong = tong > 0 && tong;
      }
    }
  });
  return newData;
};

// làm cái này vì sever không làm được,tính lại tổng và cha của từng item khi render và filter ( doanh thu chi tiết theo ngày)
const totalDetailDate = async (setRow, result) => {
  let sumSoLuot = 0;
  let sumSoKhach = 0;
  let sumDtKhach = 0;
  let sumDtHang = 0;
  let sumKhachBqLuot = 0;
  let sumHsld = 0;
  let sumKehoachXePt = 0;
  let sumKehoachXe = 0;
  let sumTuantruocXePt = 0;
  let sumTuantruocXe = 0;
  let sumKehoachKhachPt = 0;
  let sumKehoachKhach = 0;
  let sumTuantruocKhachPt = 0;
  let sumTuantruocKhach = 0;
  let sumKehoachHangPt = 0;
  let sumKehoachHang = 0;
  let sumTuantruocHangPt = 0;
  let sumTuantruocHang = 0;
  let sumKehoachTongPt = 0;
  let sumKehoachTong = 0;
  let sumTuantruocTongPt = 0;
  let sumTuantruocTong = 0;
  let sumSolenh = 0;
  let sumKehoachDtKhachPt = 0;
  let sumKehoachDtKhach = 0;
  let sumTuantruocDtKhachPt = 0;
  let sumTuantruocDtKhach = 0;

  let keyNew = [];

  let totalGhe = _.get(result, "tong_ghe_thang");
  let totalKhach = _.get(result, "tong_khach_thang");
  let arrData = await _.map(_.get(result, "data"), (item, index) => {
    // tính tổng và push vào dữ liệu
    item.date = item.date ? moment(item.date).format("DD-MM-YYYY") : "";
    sumSoLuot += item.so_luot_day;
    sumSoKhach += item.so_khach_day;
    sumDtKhach += item.dt_khach_day;
    sumDtHang += item.dt_hang_day;
    sumKhachBqLuot += item.khach_bq_luot_day;
    sumHsld = (totalKhach / totalGhe) * 100;
    sumKehoachXe += item.luot_so_ke_hoach_day;
    sumTuantruocXe += item.luot_so_tuan_truoc_day;
    sumKehoachKhach += item.khach_so_ke_hoach_day;
    sumTuantruocKhach += item.khach_so_tuan_truoc_day;
    sumKehoachDtKhach += item.dt_khach_so_ke_hoach_day;
    sumTuantruocDtKhach += item.dt_khach_so_tuan_truoc_day;
    sumKehoachHang += item.dt_hang_so_ke_hoach_day;
    sumTuantruocHang += item.dt_hang_so_tuan_truoc_day;
    sumKehoachTong += item.dt_tong_so_ke_hoach_day;
    sumTuantruocTong += item.dt_tong_so_tuan_truoc_day;
    sumSolenh += item.so_lenh_chua_nt_day;
    sumKehoachXePt += item.luot_so_ke_hoach_day_pt;
    sumTuantruocXePt += item.luot_so_tuan_truoc_day_pt;
    sumKehoachKhachPt += item.khach_so_ke_hoach_day_pt;
    sumTuantruocKhachPt += item.khach_so_tuan_truoc_day_pt;
    sumKehoachHangPt += item.dt_hang_so_ke_hoach_day_pt;
    sumTuantruocHangPt += item.dt_hang_so_tuan_truoc_day_pt;
    sumKehoachTongPt += item.dt_tong_so_ke_hoach_day_pt;
    sumTuantruocTongPt += item.dt_tong_so_tuan_truoc_day_pt;
    sumKehoachDtKhachPt += item.dt_khach_so_ke_hoach_day_pt;
    sumTuantruocDtKhachPt += item.dt_khach_so_tuan_truoc_day_pt;

    keyNew.push(item.key);
    return item;
  });
  // tính tổng và làm tròn lấy 2 số thập phân
  let luot_kh_month = _.get(result, "luot_kh_month");
  let khach_kh_month = _.get(result, "khach_kh_month");
  let dt_khach_kh_month = _.get(result, "dt_khach_kh_month");
  let dt_hang_kh_month = _.get(result, "dt_hang_kh_month");
  let dt_tong_kh_month = _.get(result, "dt_tong_kh_month");
  let precentPlanCar = luot_kh_month > 0 && (sumSoLuot / luot_kh_month) * 100;
  let precentUser = khach_kh_month > 0 && (sumSoKhach / khach_kh_month) * 100;
  let precentDTUser =
    dt_khach_kh_month > 0 && (sumDtKhach / dt_khach_kh_month) * 100;
  let precentDTRow =
    dt_hang_kh_month > 0 && (sumDtHang / dt_hang_kh_month) * 100;
  let precentTotalRow =
    dt_tong_kh_month > 0 && ((sumDtKhach + sumDtHang) / dt_tong_kh_month) * 100;
  const objTotal = {
    date: "Tổng",
    key: 0,
    so_luot_day: sumSoLuot,
    so_khach_day: sumSoKhach,
    dt_khach_day: sumDtKhach,
    dt_hang_day: sumDtHang,
    khach_bq_luot_day: sumSoKhach / sumSoLuot,
    hso_lap_day_day: sumHsld ? Math.round((sumHsld + 0.0001) * 100) / 100 : 0,
    luot_so_ke_hoach_day: _.get(result, "luot_so_kh_thang"),
    luot_so_tuan_truoc_day: sumTuantruocXe
      ? Math.round((sumTuantruocXe + 0.0001) * 100) / 100
      : 0,
    khach_so_ke_hoach_day: _.get(result, "khach_so_kh_thang"),
    khach_so_tuan_truoc_day: sumTuantruocKhach,
    dt_khach_so_ke_hoach_day: _.get(result, "dt_khach_so_kh_thang"),
    dt_khach_so_tuan_truoc_day: sumTuantruocDtKhach,
    dt_hang_so_ke_hoach_day: _.get(result, "dt_hang_so_kh_thang"),
    dt_hang_so_tuan_truoc_day: sumTuantruocHang,
    dt_tong_so_ke_hoach_day: _.get(result, "dt_tong_so_kh_thang"),
    dt_tong_so_tuan_truoc_day: sumTuantruocTong,
    so_lenh_chua_nt_day: sumSolenh,
    luot_so_ke_hoach_day_pt: precentPlanCar > 0 ? precentPlanCar : 0,
    luot_so_tuan_truoc_day_pt: sumTuantruocXePt,
    khach_so_ke_hoach_day_pt: precentUser > 0 ? precentUser : 0,
    khach_so_tuan_truoc_day_pt: sumTuantruocKhachPt,
    dt_hang_so_ke_hoach_day_pt: precentDTRow > 0 ? precentDTRow : 0,
    dt_hang_so_tuan_truoc_day_pt: sumTuantruocHangPt,
    dt_tong_so_ke_hoach_day_pt: precentTotalRow > 0 ? precentTotalRow : 0,
    dt_tong_so_tuan_truoc_day_pt: sumTuantruocTongPt,
    dt_khach_so_ke_hoach_day_pt: precentDTUser > 0 ? precentDTUser : 0,
    dt_khach_so_tuan_truoc_day_pt: sumTuantruocDtKhachPt,
  };
  // tạo dữ liệu tổng rồi đẩy lên đầu
  arrData.unshift(objTotal);
  await setRow((preState) => {
    let nextState = { ...preState };
    nextState.arrKey = keyNew;
    nextState.data = arrData;
    nextState.dataOld = result;
    nextState.arrKeyOld = keyNew;
    return nextState;
  });
};

// tính tổng khi render vào của khai bao nghiệm thu
const totalDeclare = (newData, setRow) => {
  let data = newData;
  // tính tổng của từng cột Trung Bình và TỔng
  //Số chuyến ngày thường
  let weekdayTrip = 0;
  //Số chuyến cuối tuần
  let weekendTrip = 0;
  //Số chuyến tăng cường
  let additionalTrip = 0;
  //Khách BQ lượt NT
  let weekdayAverage = 0;
  //Khách BQ lượt CT
  let weekendAverage = 0;
  //Khách BQ lượt tăng cường
  let additionalTripAverage = 0;
  //DT hàng NT/lượt
  let cargoRevenueWeekday = 0;
  //DT hàng CT/lượt
  let cargoRevenueWeekend = 0;
  //DT hàng tăng cường/lượt
  let cargoRevenueAdditional = 0;

  //Tổng lượt total_trip_plan
  let totalTripPlan = 0;
  //Tổng khách total_passenger_plan
  let totalPassengerPlan = 0;
  //Tổng DT khách total_ticket_revenue_plan
  let totalTicketPlan = 0;
  //Tổng DT hàng total_cargo_revenue_plan
  let totalCargoPlan = 0;

  //Khách BQ lượt average_passenger_count_plan
  let averagePassengerPlan = 0;
  //hệ số lấp đầy fulfilment_rate_plan
  let fulfilmentPlan = 0;
  //DT/Km kế hoạch cả tháng revenue_per_km_plan
  let revenueKmPlan = 0;
  //DT/Km kế hoạch chi khách revenue_per_km_passenger_only_plan
  let revenueOnlyPlan = 0;

  // lấy length của Trung Bình  Khách BQ lượt NT
  let weekdayAveragePassengerLength = _.filter(data, (e, index) => {
    if (index != 0) {
      return e.weekday_average_passenger_count_plan > 0;
    }
  }).length;
  // lấy length của Trung Bình Khách BQ lượt CT
  let weekendAveragePassengerLength = _.filter(data, (e, index) => {
    if (index != 0) {
      return e.weekend_average_passenger_count_plan > 0;
    }
  }).length;
  // lấy length của Trung Bình Khách BQ lượt tăng cường
  let additionalTripAverageLength = _.filter(data, (e, index) => {
    if (index != 0) {
      return e.weekday_average_passenger_count_plan > 0;
    }
  }).length;
  // lấy length của Trung Bình DT hàng NT/lượt
  let cargoRevenueWeekdayLength = _.filter(data, (e, index) => {
    if (index != 0) {
      return e.cargo_revenue_weekday_plan > 0;
    }
  }).length;
  // lấy length của Trung Bình DT hàng CT/lượt
  let cargoRevenueWeekendLength = _.filter(data, (e, index) => {
    if (index != 0) {
      return e.cargo_revenue_weekend_plan > 0;
    }
  }).length;
  // lấy length của Trung Bình DT hàng tăng cường/lượt
  let cargoRevenueAdditionalLength = _.filter(data, (e, index) => {
    if (index != 0) {
      return e.cargo_revenue_additional_trip_plan > 0;
    }
  }).length;

  // lấy length của Trung Bình Khách BQ lượt average_passenger_count_plan
  let averagePassengerPlanLength = _.filter(data, (e, index) => {
    if (index != 0) {
      return e.average_passenger_count_plan > 0;
    }
  }).length;
  // lấy length của Trung Bình hệ số lấp đầy fulfilment_rate_plan
  let fulfilmentPlanLength = _.filter(data, (e, index) => {
    if (index != 0) {
      return e.fulfilment_rate_plan > 0;
    }
  }).length;
  // lấy length của Trung Bình DT/Km kế hoạch cả tháng revenue_per_km_plan
  let revenueKmPlanLength = _.filter(data, (e, index) => {
    if (index != 0) {
      return e.revenue_per_km_plan > 0;
    }
  }).length;
  // lấy length của Trung Bình DT/Km kế hoạch chi khách revenue_per_km_passenger_only_plan
  let revenueOnlyPlanLength = _.filter(data, (e, index) => {
    if (index != 0) {
      return e.revenue_per_km_passenger_only_plan > 0;
    }
  }).length;
  data.forEach((item, index) => {
    item.key = index + 1;
    if (index != 0) {
      //Số chuyến ngày thường
      weekdayTrip += item.weekday_trip_count_plan;
      //Số chuyến cuối tuần
      weekendTrip += item.weekend_trip_count_plan;
      //Số chuyến tăng cường
      additionalTrip += item.additional_trip_count_plan;
      //Khách BQ lượt NT
      weekdayAverage +=
        item.weekday_average_passenger_count_plan /
        weekdayAveragePassengerLength;
      //Khách BQ lượt CT
      weekendAverage +=
        item.weekend_average_passenger_count_plan /
        weekendAveragePassengerLength;
      //Khách BQ lượt tăng cường
      additionalTripAverage +=
        item.additional_trip_average_passenger_count_plan /
        additionalTripAverageLength;
      //DT hàng NT/lượt
      cargoRevenueWeekday +=
        item.cargo_revenue_weekday_plan / cargoRevenueWeekdayLength;
      //DT hàng CT/lượt
      cargoRevenueWeekend +=
        item.cargo_revenue_weekend_plan / cargoRevenueWeekendLength;
      //DT hàng tăng cường/lượt
      cargoRevenueAdditional +=
        item.cargo_revenue_additional_trip_plan / cargoRevenueAdditionalLength;
      //Tổng lượt
      totalTripPlan += item.total_trip_plan;
      //Tổng khách
      totalPassengerPlan += item.total_passenger_plan;
      //Tổng DT khách
      totalTicketPlan += item.total_ticket_revenue_plan;
      //Tổng DT hàng
      totalCargoPlan += item.total_cargo_revenue_plan;

      //Khách BQ lượt average_passenger_count_plan
      averagePassengerPlan +=
        item.average_passenger_count_plan / averagePassengerPlanLength;
      //hệ số lấp đầy fulfilment_rate_plan
      fulfilmentPlan += item.fulfilment_rate_plan / fulfilmentPlanLength;
      //DT/Km kế hoạch cả tháng revenue_per_km_plan
      revenueKmPlan += item.revenue_per_km_plan / revenueKmPlanLength;
      //DT/Km kế hoạch chi khách revenue_per_km_passenger_only_plan
      revenueOnlyPlan +=
        item.revenue_per_km_passenger_only_plan / revenueOnlyPlanLength;
    }
  });
  //tổng khách -> tổng hảng
  data[0]["total_trip_plan"] = totalTripPlan;
  data[0]["total_passenger_plan"] = totalPassengerPlan;
  data[0]["total_ticket_revenue_plan"] = totalTicketPlan;
  data[0]["total_cargo_revenue_plan"] = totalCargoPlan;
  //khách bq lượt -> dt km kế hoạch
  data[0]["average_passenger_count_plan"] = averagePassengerPlan;
  data[0]["fulfilment_rate_plan"] = fulfilmentPlan;
  data[0]["revenue_per_km_plan"] = revenueKmPlan;
  data[0]["revenue_per_km_passenger_only_plan"] = revenueOnlyPlan;
  //số chuyến -> dt hàng tăng cường
  data[0]["weekday_trip_count_plan"] = weekdayTrip;
  data[0]["weekend_trip_count_plan"] = weekendTrip;
  data[0]["additional_trip_count_plan"] = additionalTrip;
  data[0]["weekday_average_passenger_count_plan"] = weekdayAverage
    ? Math.round((weekdayAverage + 0.00001) * 100) / 100
    : 0;
  data[0]["weekend_average_passenger_count_plan"] = weekendAverage
    ? Math.round((weekendAverage + 0.00001) * 100) / 100
    : 0;
  data[0][
    "additional_trip_average_passenger_count_plan"
  ] = additionalTripAverage
    ? Math.round((additionalTripAverage + 0.00001) * 100) / 100
    : 0;
  // data[0]['cargo_revenue_weekday_plan'] =cargoRevenueWeekday ?  Math.round((cargoRevenueWeekday + 0.00001) * 100) / 100 : 0
  // data[0]['cargo_revenue_weekend_plan'] = cargoRevenueWeekend ? Math.round((cargoRevenueWeekend + 0.00001) * 100) / 100 : 0
  // data[0]['cargo_revenue_additional_trip_plan'] =cargoRevenueAdditional ?  Math.round((cargoRevenueAdditional + 0.00001) * 100) / 100 : 0
  data[0]["cargo_revenue_weekday_plan"] = cargoRevenueWeekday
    ? Math.round(cargoRevenueWeekday)
    : 0;
  data[0]["cargo_revenue_weekend_plan"] = cargoRevenueWeekend
    ? Math.round(cargoRevenueWeekend)
    : 0;
  data[0]["cargo_revenue_additional_trip_plan"] = cargoRevenueAdditional
    ? Math.round(cargoRevenueAdditional)
    : 0;

  setRow((preState) => {
    let nextState = { ...preState };
    nextState.data = data;
    return nextState;
  });
};

const checkMoment = (input) => {
  if (_.isEmpty(input)) {
    return undefined;
  }
  if (moment.isMoment(input)) {
    return input;
  }
  return moment(input).clone();
};

const calculateTotalPage = (totalLength, pageLimit) => {
  if (!_.isNumber(totalLength)) {
    totalLength = _.parseInt(totalLength);
  }
  if (!_.isNumber(pageLimit)) {
    pageLimit = _.parseInt(pageLimit);
  }
  if (totalLength === 0 || pageLimit === 0) {
    return 0;
  }
  return _.parseInt(
    totalLength % pageLimit > 0
      ? totalLength / pageLimit + 1
      : totalLength / pageLimit
  );
};
const calculatePageInfo = (currentPage, pageLimit, totalLength) => {
  if (!_.isNumber(currentPage)) {
    currentPage = _.parseInt(currentPage);
  }
  if (!_.isNumber(pageLimit)) {
    pageLimit = _.parseInt(pageLimit);
  }
  if (!_.isNumber(totalLength)) {
    totalLength = _.parseInt(totalLength);
  }
  if (currentPage === 0 && pageLimit === 0) {
    return `0-0 của ${totalLength}`;
  }
  const start = currentPage * pageLimit + 1;
  let end = start + pageLimit - 1;
  if (end > totalLength) {
    end = totalLength;
  }
  return `${start}-${end} của ${totalLength}`;
};
const momentRange = {
  "Hôm nay": [moment(), moment()],
  "Tuần hiện tại": [moment().startOf("week"), moment().endOf("week")],
  "Tháng hiện tại": [moment().startOf("month"), moment().endOf("month")],
  "Tuần trước": [
    moment()
      .add(-1, "weeks")
      .startOf("week"),
    moment()
      .add(-1, "weeks")
      .endOf("week"),
  ],
  "Tháng trước": [
    moment()
      .add(-1, "months")
      .startOf("month"),
    moment()
      .add(-1, "months")
      .endOf("month"),
  ],
};
export {
  calculatePageInfo,
  calculateTotalPage,
  checkMoment,
  totalDeclare,
  momentRange,
  totalDetailDate,
  dayOperte,
  countOperte,
  dataUser,
  setDataUser,
  setDataPersonnel,
  dataPersonnel,
  setDataFinance,
  dataFinance,
};
