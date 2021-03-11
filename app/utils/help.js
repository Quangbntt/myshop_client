import moment from "moment";
import _ from "lodash";
const setDataPersonnel = async (newData) => {
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
      // tính trung bình cộng của các dòng lại
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
        let totalDay =
          _.get(objDriver, `monthly_${i}`) > 0 &&
          _.get(objBeginningobjDriver, `monthly_${i}`) /
            _.get(objDriver, `monthly_${i}`);
        item[`monthly_${i}`] = _.isNumber(totalDay)
          ? totalDay
          : 0;
        if (item[`monthly_${i}`] > 0) {
          ratioHT++;
          sumRatioHT += item[`monthly_${i}`];
        }
        let total = ratioHT > 0 && sumRatioHT / ratioHT;
        item[`monthly_tong`] = _.isNumber(total)
          ? total
          : 0;
      } else if (_index == 5) {
        if (item[`monthly_${i}`] > 0) {
          noLaiXe++;
          sumNoLaiXe += item[`monthly_${i}`];
        }
        objNoBeginningRatio = item;
        let total = noLaiXe > 0 && sumNoLaiXe / noLaiXe;
        item[`monthly_tong`] =
          total > 0 ? total : 0;
      } else if (_index == 6) {
        if (item[`monthly_${i}`] > 0) {
          noBeginning++;
          sumNoBeginning += item[`monthly_${i}`];
        }
        objNoBeginning = item;
        let total = noBeginning > 0 && sumNoBeginning / noBeginning;
        item[`monthly_tong`] =
          total > 0 ? total : 0;
      } else if (_index == 7) {
        let totalDay =
          _.get(objNoBeginningRatio, `monthly_${i}`) > 0 &&
          _.get(objNoBeginning, `monthly_${i}`) /
            _.get(objNoBeginningRatio, `monthly_${i}`);

        if (totalDay) {
          noBeginningRatio++;
          sumNoBeginningRatio += totalDay;
          item[`monthly_${i}`] = totalDay;
        }
        let total =
          noBeginningRatio > 0 && sumNoBeginningRatio / noBeginningRatio;
        item[`monthly_tong`] =
          total > 0 ? total : 0;
      }
    }
    return item;
  });
  return newData;
};
// set lại nhập dữ liệu nhân viên
const dataPersonnel = async (newData, month, index, rowItem) => {
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
      // tính trung bình cộng của các dòng lại
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
        let totalDay =
          _.get(objDriver, `monthly_${i}`) > 0 &&
          _.get(objBeginning, `monthly_${i}`) /
            _.get(objDriver, `monthly_${i}`);
        item[`monthly_${i}`] = _.isNumber(totalDay)
          ? totalDay
          : 0;
        if (item[`monthly_${i}`] > 0) {
          ratioHT++;
          sumRatioHT += item[`monthly_${i}`];
        }
        let total = ratioHT > 0 && sumRatioHT / ratioHT;
        item[`monthly_tong`] = _.isNumber(total)
          ? total
          : 0;
      } else if (_index == 5) {
        if (item[`monthly_${i}`] > 0) {
          noLaiXe++;
          sumNoLaiXe += item[`monthly_${i}`];
        }
        objNoBeginningRatio = item;
        let total = noLaiXe > 0 && sumNoLaiXe / noLaiXe;
        item[`monthly_tong`] =
          total > 0 ? total : 0;
      } else if (_index == 6) {
        if (item[`monthly_${i}`] > 0) {
          noBeginning++;
          sumNoBeginning += item[`monthly_${i}`];
        }
        objNoBeginning = item;
        let total = noBeginning > 0 && sumNoBeginning / noBeginning;
        item[`monthly_tong`] =
          total > 0 ? total : 0;
      } else if (_index == 7) {
        let totalDay =
          _.get(objNoBeginningRatio, `monthly_${i}`) > 0 &&
          _.get(objNoBeginning, `monthly_${i}`) /
            _.get(objNoBeginningRatio, `monthly_${i}`);

        if (totalDay) {
          noBeginningRatio++;
          sumNoBeginningRatio += totalDay;
          item[`monthly_${i}`] = totalDay;
        }
        let total =
          noBeginningRatio > 0 && sumNoBeginningRatio / noBeginningRatio;
        item[`monthly_tong`] =
          total > 0 ? total : 0;
      }
    }
    return item;
  });
  return newData;
};
export { dataPersonnel, setDataPersonnel };
