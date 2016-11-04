// @flow

type ValidationError<T> = { info: string, input: T };
type ValidationResult<T> = ValidationError<T> | true;

// not:: x -> boolean
const not = (x: any) => !x;

// isNil (pred.):: forall a. a -> boolean
const isNil = (v: any): ValidationResult<*> => (v != null)
  ? { info: `non-nil value provided`, input: v }
  : true;

// isType (pred.):: Constructor -> x -> boolean
const isType = (type: Function): Function => (v: Object): ValidationResult<Object> => v == null
  ? { info: `nil value provided`, input: v }
  : !(v.constructor === type || v instanceof type)
    ? { info: `value provided is not the instance of ${type.name}`, input: v }
    : true;

// match :: regexp -> string -> string[]
const pattern = (re: any): Function => (str: string): ValidationResult<string> => !re.test(str)
  ? { info: `no match in the source string ${str}`, input: str }
  : true;

const gt = (x: number): Function => (y: number): ValidationResult<number> => !(x < y)
  ? { info: `given value ${y} is not greater than ${x}`, input: y }
  : true;

const lt = (x: number): Function => (y: number): ValidationResult<number> => !(x > y)
  ? { info: `given value ${y} is not less than ${x}`, input: y }
  : true;

  module.exports = {
    isNil, isType, pattern, gt, lt
  }
