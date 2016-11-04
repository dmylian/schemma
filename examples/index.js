// Import predicate helper functions
const { isNil, isType, pattern, gt, lt }  = require('../core/predicates');
const { compose, mergeErrors:validate } = require('../core/index');

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
