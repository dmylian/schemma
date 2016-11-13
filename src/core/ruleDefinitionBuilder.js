// @flow
'use strict';

import type {
  ValidatorFn,
  ValidationError,
  ValidationResult }  from '../types/validation';

const { Mixin, mix } = require('mixwith')

// Allow higher-level abstraction
const get = (p: string): Function => (object: Object): any => object[p]; // eslint-disable-line flowtype/no-weak-types
const call = (...param: any): Function => (fn: Function): any => fn(...param); // eslint-disable-line flowtype/no-weak-types

const RuleDefBuilder = Mixin((sup) => class extends sup {
  static applyValidators(field: any, validators: Array<ValidatorFn>): Array<ValidationResult<*>> {
    return validators.map(call(field));
  }

  static filterErrors(errors: Array<ValidationResult<*>>): Array<ValidationResult<*>> {
    return errors.filter(get('info'));
  }

  static compose(validators: Array<ValidatorFn>): Function | null { // eslint-disable-line flowtype/no-weak-types
    if (!validators.length) {
      return null;
    }
    const composedValidators = Array.isArray(validators)
      ? validators
      : [ validators ];

    return (field: any): Array<ValidationResult<*>> =>
      // this references RuleDefBuilder
      this.filterErrors(this.applyValidators(field, composedValidators));
  }
});

module.exports = {
  RuleDefBuilder
}
