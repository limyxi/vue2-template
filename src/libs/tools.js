/**
 * @param {*} obj1 对象
 * @param {*} obj2 对象
 * @description 判断两个对象是否相等，这两个对象的值只能是数字或字符串
 */
export const objEqual = (obj1, obj2) => {
  const keysArr1 = Object.keys(obj1);
  const keysArr2 = Object.keys(obj2);
  if (keysArr1.length !== keysArr2.length) return false;
  else if (keysArr1.length === 0 && keysArr2.length === 0) return true;
  /* eslint-disable-next-line */ else
    return !keysArr1.some((key) => obj1[key] != obj2[key]);
};
/**
 * @param {*} json 对象
 * @description 清楚json对象的属性值
 */
export const resetJson = (json) => {
  for (var obj in json) {
    if (isArray(json[obj])) {
      json[obj] = [];
    } else if (isObject(json[obj])) {
      json[obj] = {};
    } else if (typeof json[obj] === "boolean") {
      json[obj] = false;
    } else {
      json[obj] = "";
    }
  }
  return json;
};
/**
 * @param {*}v vue实例
 * @description 重置vue实例的data对象为初始data
 */
export const resetData = (v) => {
  Object.assign(v.$data, v.$options.data.call(v));
  return v.$data;
};
/**
 * @param {*} array 对象
 * @description 數據array的平均值
 */
export const getArrayAverage = (array, len) => {
  var sum = 0;
  for (var i = 0; i < array.length; i++) {
    sum += array[i];
  }
  var average = sum / array.length;

  if (len) {
    return parseFloat(average.toFixed(len));
  } else {
    return average;
  }
};
/**
 * @param {*} param 对象
 * @description 对象转url参数
 */
export const urlEncode = (param, key, encode) => {
  if (param == null) return "";
  var paramStr = "";
  var t = typeof param;
  if (t == "string" || t == "number" || t == "boolean") {
    paramStr +=
      "&" +
      key +
      "=" +
      (encode == null || encode ? encodeURIComponent(param) : param);
  } else {
    for (var i in param) {
      var k =
        key == null
          ? i
          : key + (param instanceof Array ? "[" + i + "]" : "." + i);
      paramStr += urlEncode(param[i], k, encode);
    }
  }
  return paramStr;
};
/**
 * @param {*} array 对象
 * @description 判读数组的值是否相等
 */
export const isAllEqual = (array) => {
  var hash = {};
  for (var i in array) {
    if (hash[array[i]]) {
      return true;
    }
    // 不存在该元素，则赋值为true，可以赋任意值，相应的修改if判断条件即可
    hash[array[i]] = true;
  }
  return false;
};
/**
 * @param {*} param 对比的参数值
 * @param {*} array 对比的数组
 * @param {*} key 对比的数组的key值
 * @description 返回数组中对应属性值一样的序列号，若未找到，返回false
 */
export const isInChoose = (param, array, key) => {
  for (let i = 0, len = array.length; i < len; i++) {
    if (array[i][key] === param) {
      return i;
    }
  }
  return false;
};
/**
 * @param {*} arr 处理的数组
 * @param {*} keyName 需要相加的属性
 * @description 计算对象数组中某个属性相加
 */
export const countTotal = (arr, keyName) => {
  let total = 0;
  total = arr.reduce(function (total, currentValue) {
    return currentValue[keyName] || Number(currentValue[keyName]) === 0
      ? Number(total) + Number(currentValue[keyName])
      : Number(total) + Number(currentValue);
  }, 0);
  return total;
};
/**
 * @param {*} arr 处理的数组
 * @description 数组去重
 */
export const uniq = (arr) => {
  let temp = [];
  let index = [];
  let l = arr.length;
  for (var i = 0; i < l; i++) {
    for (var j = i + 1; j < l; j++) {
      if (arr[i] === arr[j]) {
        i++;
        j = i;
      }
    }
    temp.push(arr[i]);
    index.push(i);
  }
  return temp;
};

/**
 * @description 数组从大到小排序
 */
export const maxSort = (arr) => {
  let sortArr = arr.sort((a, b) => {
    return b - a;
  });
  return sortArr;
};
/**
 * @description 数组指定属性值从大到小排序
 */
export const maxSortByProperty = (arr, property) => {
  let sortArr = arr.sort((a, b) => {
    var value1 = a[property];
    var value2 = b[property];
    return value1 - value2;
  });
  return sortArr;
};
/**
 * @param {*} param 指定日期
 * @description 获取指定日期时间戳
 * **/
export const getTimestamp = (param) => {
  if (param) {
    return new Date(param).valueOf();
  } else {
    return new Date().valueOf();
  }
};
/**
 * @param {*} param 格式化参数
 * @param {*} type 日期格式
 * @description 格式化指定日期
 * **/
export const formmatT = (param, type) => {
  if (!param) {
    return "";
  }
  var d = new Date(param);
  var year = d.getFullYear();
  var month =
    d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
  var date = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
  if (type == "month") {
    return year + "-" + month;
  } else if (type == "date") {
    return year + "-" + month + "-" + date;
  } else {
    var hour = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
    var minute = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
    var second = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
    return (
      year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second
    );
  }
};

/**
 * @param {*} param 格式化参数
 * @param {*} start 结果返回的是开始时间的的key
 * @param {*} end 结果返回的是结束时间的的key
 * @description 格式化日期范围
 * **/
export const formmatDatarange = (param, start, end, type) => {
  let res = {};
  if (param) {
    res[start] = param[0] ? formmatT(param[0], type) : "";
    res[end] = param[1] ? formmatT(param[1], type) : "";
  }
  return res;
};
/**
 * @description
 * 若是当前日期的为(0,1,0);明天(0,1,1);加一个月(0,2,0);加一年(1,1,0)
 * 不能为负值
 * **/
export const getCurrentDate = (addYear, addMonth, addDay) => {
  if (Number(addYear) < 0) {
    addYear = 0;
  }
  if (Number(addMonth) < 0) {
    addMonth = 1;
  }
  if (Number(addDay) < 0) {
    addDay = 0;
  }
  let time = new Date();
  time.setDate(time.getDate() + addDay);
  let y = time.getFullYear() + addYear;
  let m = time.getMonth() + addMonth;
  let d = time.getDate();
  let date = y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d);
  return date;
};

/**
 * @param {*} oldDate 初始日期
 * @param {*} addTime 需要加上的时间
 * @param {*} type 需要加上的时间类型【's','m','h','d'】
 * @description 返回日期加上指定的时间的日期
 * **/
export const addTime = (oldDate, addTime, type) => {
  let addTimeStamps = 0;
  switch (type) {
    case "s":
      addTimeStamps = addTime * 1000;
      break;
    case "m":
      addTimeStamps = addTime * 60 * 1000;
      break;
    case "h":
      addTimeStamps = addTime * 60 * 60 * 1000;
      break;
    case "d":
      addTimeStamps = addTime * 60 * 60 * 24 * 1000;
      break;
    default:
      addTimeStamps = addTime * 1000;
      break;
  }
  let date = new Date(oldDate);
  let myDate = new Date(date.getTime() + addTimeStamps);
  return formmatT(myDate);
};
/**
 * @param {*} value 需要处理的日期
 * @param {*} type 截取的类型
 * @description 返回日期加上指定的时间的日期
 * **/
export const cutTime = (value, type) => {
  let time = value;
  switch (type) {
    case "time":
      value = time ? time.substring(12, 19) : "";
      break;
    default:
      value = time ? time.substring(0, 10) : "";
      break;
  }
  return value;
};
/**
 * @param {*} value 需要判断的值
 * @description 判断是否值是否不为null undefined ''
 * **/
export const ifConsist = (value) => {
  if (value === "" || value === undefined || value === null) {
    return false;
  }
  return true;
};

/**
 * @description 返回序列后的值
 */
export const guid = () => {
  let S4 = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
};

/**
 * @description 去掉字符串前后空格
 */
export const trim = (str) => {
  if (str == null) {
    return "";
  }
  return str.replace(/^\s*(.*?)[\s\n]*$/g, "$1");
};

/**
 * @param {*} targetJson 需要赋值的json
 * @param {*} dataJson 取数的json
 * @description 从dataJson中找到targetjson中存在key值并赋值给targetJson
 */
export const assignJsonData = (targetJson, dataJson) => {
  Object.keys(targetJson).forEach((key) => {
    if (dataJson[key]) {
      targetJson[key] = dataJson[key];
    }
  });
};

/**
 * @description 时间秒转为时分秒
 */
export const getSeconds = (s) => {
  var sTime = parseInt(s); // 秒
  var mTime = 0; // 分
  var hTime = 0; // 时
  if (sTime > 60) {
    //如果秒数大于60，将秒数转换成整数
    //获取分钟，除以60取整数，得到整数分钟
    mTime = parseInt(sTime / 60);
    //获取秒数，秒数取佘，得到整数秒数
    sTime = parseInt(sTime % 60);
    //如果分钟大于60，将分钟转换成小时
    if (mTime > 60) {
      //获取小时，获取分钟除以60，得到整数小时
      hTime = parseInt(mTime / 60);
      //获取小时后取佘的分，获取分钟除以60取佘的分
      mTime = parseInt(mTime % 60);
    }
  }
  var result = "";
  if (sTime >= 0 && sTime < 10) {
    result = "0" + parseInt(sTime) + "";
  } else {
    result = "" + parseInt(sTime) + "";
  }
  if (mTime >= 0 && mTime < 10) {
    result = "0" + parseInt(mTime) + "分" + result + "秒";
  } else {
    result = "" + parseInt(mTime) + "分" + result + "秒";
  }
  if (hTime >= 0 && hTime < 10) {
    result = "0" + parseInt(hTime) + "时" + result;
  } else {
    result = "" + parseInt(hTime) + "时" + result;
  }
  return result;
};
/**
 * @param {*} param 需要判断的值
 * @description 判断是否为数组
 */
export const isArray = (param) => {
  return Object.prototype.toString.call(param) === "[object Array]";
};

/**
 * @param {*} param 需要判断的值
 * @description 判断是否为对象
 */
export const isObject = (param) => {
  return Object.prototype.toString.call(param) === "[object Object]";
};

/**
 * @description 获取数组字典
 */
export const getDictionary = () => {
  return JSON.parse(sessionStorage.getItem("dictionaryList"));
};
