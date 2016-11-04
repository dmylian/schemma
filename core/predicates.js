// not:: x -> boolean
const not = (x) => !x;

// isNil (pred.):: forall a. a -> boolean
const isNil = (v) => (v != null)
  ? { info: `non-nil value provided`, input: v }
  : true;

// isType (pred.):: Constructor -> x -> boolean
const isType = (type) => (v) => v == null
  ? { info: `nil value provided`, input: v }
  : !(v.constructor === type || v instanceof type)
    ? { info: `value provided is not the instance of ${type.name}`, input: v }
    : true;

// match :: regexp -> string -> string[]
const match = (re) => (str) => !str.match(re)
  ? { info: `no match in the source string ${str}`, input: str }
  : true;

const gt = (x) => (y) => !(x < y)
  ? { info: `given value ${y} is not greater than ${x}`, input: y }
  : true;

const lt = (x) => (y) => !(x > y)
  ? { info: `given value ${y} is not less than ${x}`, input: y }
  : true;

  module.exports = {
    isNil, isType, match, gt, lt
  }
