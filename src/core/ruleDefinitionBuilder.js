// @flow

import type {
  ValidatorFn,
  ValidationError,
  ValidationResult }  from '../types/validation';

// Allow higher-level abstraction
const get = (p: string): Function => (object: Object): any => object[p]; // eslint-disable-line flowtype/no-weak-types
const call = (...param: any): Function => (fn: Function): any => fn(...param); // eslint-disable-line flowtype/no-weak-types

const applyValidators = (field: any, validators: Array<ValidatorFn>): Array<ValidationResult<*>> => validators.map(call(field));
const filterErrors = (errors: Array<ValidationResult<*>>): Array<ValidationResult<*>> => errors.filter(get('info'));

const compose = (...validators: Array<ValidatorFn>): Function | null => { // eslint-disable-line flowtype/no-weak-types
  if (!validators.length) {
    return null;
  }
  return (field: any): Array<ValidationResult<*>> => filterErrors(applyValidators(field, validators));
}

module.exports = {
  compose
}
