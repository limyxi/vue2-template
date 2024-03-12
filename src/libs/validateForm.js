const VF = {
  /**
   * @description 判断是否为空
   */
  empty(rule, value, callback) {
    if (value === "" || value === undefined || value === null) {
      return callback(new Error("不能为空"));
    } else if (value instanceof Array) {
      if (value.length == 0) {
        return callback(new Error("不能为空"));
      } else {
        callback();
      }
    } else {
      callback();
    }
  },
  /**
   * @param {*} value 校验的值
   * @description 判断是否整数
   */
  int(rule, value, callback) {
    if (/^\+?[1-9][0-9]*$/.test(value)) {
      callback();
    } else {
      return callback(new Error("只能输入整数"));
    }
  },
  /**
   * @param {*} value 校验的值
   * @description 判断是否最多为两位小数的数字
   */
  num2(rule, value, callback) {
    if (/^\d+(\.\d{1,2})?$/.test(value)) {
      callback();
    } else if (!value) {
      return callback(new Error("不能为空"));
    } else {
      return callback(new Error("只能输入两位小数的数字"));
    }
  },
  /**
   * @param {*} value 校验的值
   * @description 判断是正整数或一位小数
   */
  validateADecimal(rule, value, callback) {
    var reg = /^\d+(?:\.\d{1})?$/;
    if (reg.test(value) || value === "" || value === null) {
      callback();
    } else {
      return callback(new Error("只能输入正整数或一位小数"));
    }
  },
  /**
   * @param {*} value 校验的值
   * @description 判断只能输入大于0的数
   */
  validateExistMinDemical(rule, value, callback) {
    if (value != "") {
      if (value > 0) {
        callback();
      } else {
        return callback(new Error("只能输入大于0的数"));
      }
    } else {
      callback();
    }
  },
  /**
   * @param {*} value 校验的值
   * @description 判断长度大于不能2000
   */
  validate2000(rule, value, callback) {
    if (value.length > 2000) {
      return callback(new Error("长度不能大于2000"));
    } else {
      callback();
    }
  },
};
export default VF;
