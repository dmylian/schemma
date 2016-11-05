// @flow

import type { ValidationResult }  from '../types/validation';

import type { Map }   from '../types/shared';

import type {
  ConfigError,
  ConfigProper,
  ConfigStatus }      from '../types/config';

const STATUS_ERROR: string = 'error';
const STATUS_OK: string = 'ok';

const _mergeErrors = (source: Map<*>, rules: Map<*>): Map<Array<ValidationResult<*>>> =>
  Object.keys(source).reduce((acc: Map<Array<ValidationResult<*>>>, c: string) => {
    acc[c] = rules[c](source[c]);
    return acc;
  }, {});

const _raiseConfigError = (error: string) => {
  throw new SyntaxError(error);
}

const _validateInputConfig = (source: Map<*>, rules: Map<*>, callback: (result: ConfigStatus) => void) => {
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
  _validateInputConfig(source, rules, (result: ConfigStatus) => {
    switch (result.status) {
      case STATUS_ERROR:
        return _raiseConfigError(result.errorString);
      default:
        return _mergeErrors(source, rules);
    }
  });

module.exports = {
  validate
}
