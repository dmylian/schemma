// @flow
'use strict';
/* eslint-disable flowtype/no-weak-types */

import type { ValidationError, ValidationResult }  from '../types/validation';

type ValidationFn<T> = (x: T) => ValidationResult<T>;

type ValidationRule = {
  kind: 'pred',
  constraint: <A, B>(x: A) => (y: B) => ValidationResult<B>
};

// not:: x -> boolean
const _not = (x: any) => !x;

// isNil (pred.):: forall a. a -> boolean
const isNil = (v: any): ValidationResult<*> => (v != null)
  ? { info: `non-nil value provided`, input: v }
  : true;

// isType (pred.):: Constructor -> x -> boolean
const isType = (type: Function): Function => (v: any): ValidationResult<*> => v == null
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

/*
const validationRuleBuilder = (fn: Function): ValidationRule => {
  return {
    kind: 'pred',
    constraint: fn
  }
}

const typePred = validationRuleBuilder(isType);
*/

module.exports = {
  isNil, isType, pattern, gt, lt
}
