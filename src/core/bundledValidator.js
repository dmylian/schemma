// @flow
'use strict';

const { AbstractValidator } = require('./abstractValidator');
const { RuleDefBuilder }    = require('./ruleDefinitionBuilder');
const { Mixin, mix }        = require('mixwith');

/* Bundled validator class, mixed with ruleDefBuilder, ...
 * Mixins in es6:
 * http://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/
 */
class Validator extends mix(AbstractValidator).with(RuleDefBuilder) {
  constructor(...args: any) {
    super(...args);
    // automatically compose rules (reduces boilerplate in rules definition obj)
    this.rules = Object.keys(this.rules).reduce((acc, property) => {
      acc[property] = Validator.compose(this.rules[property]);
      return acc;
    }, {});
  }
}

module.exports = {
  Validator
}
