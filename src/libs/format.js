/**
 * @param {*} value  处理的值
 * @description 保留一位小数
 */
export const decimal1 = (value) => {
  return Math.round(value * 10) / 10;
};
/**
 * @param {*} value  处理的值
 * @description 保留两位小数
 */
export const decimal2 = (value) => {
  return Math.round(value * 100) / 100;
};
/**
 * @param {*} value  处理的值
 * @description 保留四位小数
 */
export const decimal4 = (value) => {
  return Math.round(value * 10000) / 10000;
};
/**
 * @param {*} value  处理的值
 * @description 保留六位小数
 */
export const decimal6 = (value) => {
  return Math.round(value * 1000000) / 1000000;
};

/**
 * @description 数字相加（限制25个参数）
 */
export function add() {
  let num = 0;
  for (let i = 0; i < arguments.length; i++) {
    num = Number(arguments[i]) + Number(num);
    if (i == arguments.length - 1) {
      return num;
    }
  }
}
/**
 * @description 数字相乘
 */
export function multiplyNoSplice() {
  let num = 1;
  for (let i = 0; i < arguments.length; i++) {
    num = Number(arguments[i]) * Number(num);
    if (i == arguments.length - 1) {
      return num;
    }
  }
}
/**
 * @description 数字相除不截取
 */
export function divisionNoSplice(molecule, denominator) {
  if (denominator == 0) {
    return 0;
  } else {
    return molecule / denominator;
  }
}
