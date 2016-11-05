// @flow

import type {
  ValidatorFn, ValidationError, ValidationResult
} from './types';


const get = (p: string): Function => (object: Object): any => object[p];
const call = (...param: any): Function => (fn: Function): any => fn(...param);

const applyValidators = (field: any, validators: Array<ValidatorFn>): Array<ValidationResult<*>> => validators.map(call(field));
const filterErrors = (errors: Array<ValidationResult<*>>): Array<ValidationResult<*>> => errors.filter(get('info'));

const compose = (...validators: Array<ValidatorFn>): Function | null => {
  if (!validators.length) {
    return null;
  }
  return (field: any): Array<ValidationResult<*>> => filterErrors(applyValidators(field, validators));
}

const mergeErrors = (source: Object, rules: Object): Object =>
  Object.keys(source).reduce((acc: Object, c: string) => {
    acc[c] = rules[c](source[c]);
    return acc;
  }, {});

module.exports = {
  compose,
  mergeErrors
}
