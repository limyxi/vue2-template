const V = {
  /**
   * @param {*} value 校验的值
   * @description 判断是否为正整数
   */
  int(value) {
    if (/^\+?[1-9][0-9]*$/.test(value) || Number(value) === 0) {
      return true;
    } else {
      return false;
    }
  },
  /**
   * @param {*} value 校验的值
   * @description 判断是否最多为两位小数的数字
   */
  num2(value) {
    if (/^\d+(\.\d{1,2})?$/.test(value)) {
      return true;
    } else {
      return false;
    }
  },
  /**
   * @param {*} value 校验的值
   * @description 校验邮件
   */
  testMail(value) {
    let reg =
      /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/;
    if (reg.test(value)) {
      return true;
    } else {
      return false;
    }
  },
};
export default V;
