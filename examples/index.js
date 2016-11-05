const { isNil, isType, pattern, gt, lt }  = require('../dist/predicates');
const { compose, mergeErrors: validate }  = require('../dist/index');

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
