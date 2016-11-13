const { isNil, isType, pattern, gt, lt }  = require('../dist/predicates');
const { typePred } = require('../src/core/predicates');
const { Validator } = require('../src/core/bundledValidator');

let a = new Validator({
  a: isType(Number),
  b: isType(Number),
  c: [isType(String), pattern(/string/)]
}, {
  a: 1, b: 2, c: 'string'
});

 console.log(a.validate(), a.valid);
