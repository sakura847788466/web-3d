// 风向转换
function windDirectionSwitch (degrees) {
  var directArr = ["北", "东北偏北", "东北", "东北偏东", "东", "东南偏东", "东南", "东南偏南", "南",
  "西南偏南", "西南", "西南偏西", "西", "西北偏西", "西北", "西北偏北"]
  var index = 0;
  if (348.75 <= degrees && degrees <= 360) {
    index = 0;
  } else if (0 <= degrees && degrees <= 11.25) {
    index = 0;
  } else if (11.25 < degrees && degrees <= 33.75) {
    index = 1;
  } else if (33.75 < degrees && degrees <= 56.25) {
    index = 2;
  } else if (56.25 < degrees && degrees <= 78.75) {
    index = 3;
  } else if (78.75 < degrees && degrees <= 101.25) {
    index = 4;
  } else if (101.25 < degrees && degrees <= 123.75) {
    index = 5;
  } else if (123.75 < degrees && degrees <= 146.25) {
    index = 6;
  } else if (146.25 < degrees && degrees <= 168.75) {
    index = 7;
  } else if (168.75 < degrees && degrees <= 191.25) {
    index = 8;
  } else if (191.25 < degrees && degrees <= 213.75) {
    index = 9;
  } else if (213.75 < degrees && degrees <= 236.25) {
    index = 10;
  } else if (236.25 < degrees && degrees <= 258.75) {
    index = 11;
  } else if (258.75 < degrees && degrees <= 281.25) {
    index = 12;
  } else if (281.25 < degrees && degrees <= 303.75) {
    index = 13;
  } else if (303.75 < degrees && degrees <= 326.25) {
    index = 14;
  } else if (326.25 < degrees && degrees < 348.75) {
    index = 15;
  }
  return directArr[index];
}
function getRads(degrees){
  return (Math.PI * degrees) / 180;
} 
function getDegrees(rads){
  return (rads * 180) / Math.PI;
}
function dateFormat(date, format) {
  format = format || 'yyyy-MM-dd hh:mm:ss';
  if (date !== 'Invalid Date') {
    let o = {
      "M+": date.getMonth() + 1, //month
      "d+": date.getDate(), //day
      "h+": date.getHours(), //hour
      "m+": date.getMinutes(), //minute
      "s+": date.getSeconds(), //second
      "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
      "S": date.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
      if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1,
          RegExp.$1.length === 1 ? o[k] :
            ("00" + o[k]).substr(("" + o[k]).length));
    return format;
  }
  return '';
}

function isNumber (val) {
  let regPos = /^\d+(\.\d+)?$/ // 非负浮点数
  let regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/ // 负浮点数
  if (regPos.test(val) || regNeg.test(val)) {
    return true
  } else {
    return false
  }
}

export default {
  windDirectionSwitch,
  getRads,
  getDegrees,
  dateFormat,
  isNumber
}