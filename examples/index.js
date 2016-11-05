const { isNil, isType, pattern, gt, lt }  = require('../dist/predicates');
const { validate }  = require('../dist/index');
const { compose } = require('../dist/ruleDefinitionBuilder');

let res = validate(
 {
   a: 1,
   b: 2,
   c: 'string'
 },
 {
   a: compose(isType(Number)),
   b: compose(isType(Number)),
   c: compose(isType(String), pattern(/string/))
 }
);

console.log(res);
