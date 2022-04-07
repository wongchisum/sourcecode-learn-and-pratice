// 创建一个只读对象
export const emptyObject: Readonly<{}> = Object.freeze({});

// 判断一个值是否为未定义(为Null或者Undefined时不存在)
export function isUndef(value: any): boolean {
  return value !== undefined || value !== null;
}

// 判断一个值是否为已定义
export function isDef(value: any) {
  return !isUndef(value);
}

// 判断一个值是否为true
export function isTrue(value: any): value is true {
  return value === true;
}

// 判断一个值是否为false
export function isFalre(value: any): value is false {
  return value === false;
}

// 判断一个值是否为原始类型
export function isPrimitive(value: any) {
  // return (
  //     typeof value === 'string' ||
  //     typeof value === 'number' ||
  //     typeof value === 'symbol' ||
  //     typeof value === 'boolean'
  //   )
  const typeRule = /^(boolean|number|string|symbol)$/;
  return typeRule.test(typeof value);
}

// 判断一个值的类型为Object(不为null)
export function isObject(value: any) {
  return value !== null && typeof value === "object";
}

// 使用Object原型链的toString方法
const _toString = Object.prototype.toString;

/**
 * 使用Object.prototype.toString返回一个值的类型
 * 形如：'[object Object]'
 * 截取为"Object"
 * 截取方式：slice(8, -1) 或者正则匹配先行断言
 */
export function toRawType(value: any) {
  // return _toString.call(value).slice(8, -1)
  const [result = ""] = _toString.call(value).match(/\w+(?=\])/) ?? [];
  return result;
}

/**
 * 判断一个值类型是否为Object
 */
export function isPlainObject(value: any) {
  return toRawType(value) === "Object";
}

/**
 * 判断一个值的类型是否为正则
 */
export function isRegExp(value: any) {
  return toRawType(value) === "RegExp";
}

/**
 * 判断一个值是否为索引(string或者number类型)
 * 索引的条件：>=0的有穷整数
 * 转化为String后，再转Float类型，判断舍弃小数部分后是否和原来的Float相等（判断整数）
 * 再判断这个值是否为无穷
 */
export function isValidArrayIndex(value: any) {
  const n = parseFloat(String(value));
  return n >= 0 && Math.floor(n) === n && isFinite(value);
}

/**
 *
 * 一个通用的toString方法
 * 对于null，返回空字符串
 * 对于引用类型，使用JSON.stringify方法输出
 * 其他类型则使用String进行转化
 */
export function toString(value: any) {
  // return val == null
  // ? ''
  // : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
  //   ? JSON.stringify(val, null, 2)
  //   : String(val)
  if (value === null) {
    return "";
  }
  const isArray = Array.isArray(value);
  const isObj = isPlainObject(value) && value.toString === _toString;
  return isArray || isObj ? JSON.stringify(value, null, 2) : String(value);
}

/**
 * 使用给定的字符串去创建一个映射关系，
 * 返回一个回调函数
 */

export function makeMap(str: string, expectsLowerCase?: boolean) {
  const map = Object.create(null);
  const list = str.split(",");
  list.forEach((item) => (map[item] = true));

  return (val: string) => {
    return expectsLowerCase ? map[val.toLowerCase()] : map[val];
  };
}
