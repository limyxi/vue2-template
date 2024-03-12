/**
 * 基础工具类
 */

/**
 * 判断是否为空值，undefined、null、'' 都视为空值
 *
 * @param str         不定参数
 * @return {boolean}  若为空值，返回true，否则返回false
 */
export function isEmpty(...str) {
  return str.some((i) => i === undefined || i === null || i === "");
}

/**
 * 根据传入值的类型，返回基础起始值
 *
 * @param v
 * @return {boolean|{}|string|*[]|number|null}
 */
export function getInitialValue(v) {
  if (v === undefined || v === null) return null;
  if (Array.isArray(v)) return [];
  if (typeof v === "string") return "";
  if (typeof v === "boolean") return false;
  if (typeof v === "number") return 0;
  if (typeof v === "object") return {};
}

/**
 * 将source合并到target中
 * 仅对target中存在的键进行合并
 * 仅当遇到对象值时进行递归
 *
 * @param target
 * @param source
 */
export function mergeObj(target, source) {
  if (isEmpty(target, source)) return;

  for (const key of Object.keys(target)) {
    if (!(key in source)) continue;

    //数组类型直接赋值，不做深拷贝
    if (Array.isArray(target[key])) {
      target[key] = source[key] || [];
      continue;
    }

    //number类型不考虑NaN
    if (typeof target[key] === "number") {
      target[key] = source[key] || 0;
      continue;
    }

    //非空对象递归处理
    if (target[key] !== null && typeof target[key] === "object") {
      mergeObj(target[key], source[key]);
      continue;
    }

    target[key] = source[key];
  }
}

/**
 * 简单重置对象属性，遇到对象时会递归重置
 * 重置方法使用{@link #getInitialValue}
 *
 * @param obj  需要重置的对象
 */
export function resetObj(obj) {
  if (isEmpty(obj)) return;
  Object.keys(obj).forEach((key) => {
    if (obj[key] !== null && typeof obj[key] === "object") {
      resetObj(obj[key]);
    } else obj[key] = getInitialValue(obj[key]);
  });
}

/**
 * 防抖
 *
 * @param func {function}      原函数
 * @param wait {number}        防抖间隔，单位毫秒
 * @param immediate {boolean}  是否立即执行一次
 * @return {function}          经过防抖包装后的函数
 */
export function debounce(func, wait = 100, immediate = false) {
  let timeout, args, context, timestamp, result;

  const later = function () {
    // 据上一次触发时间间隔
    const last = new Date().getTime() - timestamp;

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = window.setTimeout(later, wait - last);
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function () {
    context = this;
    args = arguments;
    timestamp = new Date().getTime();
    const callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = window.setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
}

/**
 * 找出第一个子串
 *
 * @param source {string}               父字符串
 * @param str {string}                  需要匹配的子串集合，不定参数
 * @return {[string,number]|undefined}  有结果则返回一个数组，第一个参数为子串，第二个为子串在父串的起始位置，否则返回undefined
 */
export function findIndexFirst(source, ...str) {
  let index = -1;
  for (const s of str) {
    index = source.indexOf(s);
    if (index >= 0) return [s, index];
  }
  return undefined;
}

/**
 * 返回一个指定长度并且填充后的数组
 *
 * @param length {number}
 * @return {[]}
 */
export function emptyList(length) {
  return length ? Array(length).fill(1) : [];
}

/**
 * 生成url参数，忽略空值
 *
 * @param map {Object} 键值对
 * @return {string}
 */
export function generateUrlParam(map) {
  return Object.entries(map).reduce((result, [k, v], i, arr) => {
    if (i === 0) result += "?";

    result += `${k}=${isEmpty(v) ? "" : v}`;

    if (i !== arr.length) result += "&";

    return result;
  }, "");
}

/**
 * 根据键名路径从对象中取值，键不存在时返回undefined
 *
 * @param obj {Object}
 * @param path {string}
 * @return {undefined|*}
 */
export function getValueByPath(obj, path) {
  if (!obj) return undefined;

  const pathArr = path.split(".");
  let temp = obj;
  for (let i = 0; i < pathArr.length; i++) {
    const key = pathArr[i];

    // 如果是数组下标取值
    if (key[key.length - 1] === "]") {
      const index = key.indexOf("[");
      // []中的内容
      const number = Number(key.slice(index + 1, key.length - 1));

      const array = temp[key.slice(0, index)];

      if (!Array.isArray(array)) return undefined;

      temp = array[number];
    }
    // 否则按对象键值取值
    else temp = temp[key];

    if (
      i !== pathArr.length - 1 &&
      (isEmpty(temp) || typeof temp !== "object")
    ) {
      return undefined;
    }
  }

  return temp;
}
