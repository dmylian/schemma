// @flow

import type {
  ValidatorFn,
  ValidationError,
  ValidationResult }  from './types/validation';

import type { Map }   from './types/shared';

import type {
  ConfigError,
  ConfigProper,
  ConfigStatus }      from './types/config';

  const STATUS_ERROR: string = 'error';
  const STATUS_OK: string = 'ok';

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

const mergeErrors = (source: Map<*>, rules: Map<*>): Map<Array<ValidationResult<*>>> =>
  Object.keys(source).reduce((acc: Map<Array<ValidationResult<*>>>, c: string) => {
    acc[c] = rules[c](source[c]);
    return acc;
  }, {});

const raiseConfigError = (error: string) => {
  throw new SyntaxError(error);
}

const validateInputConfig = (source: Map<*>, rules: Map<*>, callback: (result: ConfigStatus) => void) => {
  if (Object.keys(source).length > Object.keys(rules).length) {
    return callback({
      status: STATUS_ERROR,
      errorCode: 1,
      errorString: 'Rules object doesn\'t match the source'
    });
  } else {
    return callback({
      status: STATUS_OK
    });
  }
}

const validate = (source: Map<*>, rules: Map<*>): Map<Array<ValidationResult<*>>> =>
  validateInputConfig(source, rules, (result: ConfigStatus) => {
    switch (result.status) {
      case STATUS_ERROR:
        return raiseConfigError(result.errorString);
      default:
        return mergeErrors(source, rules);
    }
  });

module.exports = {
  compose,
  validate
}
