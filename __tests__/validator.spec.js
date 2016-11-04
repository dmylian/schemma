const { isNil, isType, match, gt, lt }  = require('../core/predicates');
const { compose, mergeErrors: validate } = require('../core/index');

const noValidationErrors = {
  a: [],
  b: [],
  c: []
};

describe('valid data passed', () => {
  it('should pass data type checks', () => {
    expect(validate(
     {
       a: 1,
       b: 2,
       c: 'string'
     },
     {
       a: compose(isType(Number)),
       b: compose(isType(Number)),
       c: compose(isType(String))
     }
   )).toEqual(noValidationErrors);
  });

  it('should pass range checks', () => {
      expect(validate(
        {
          a: 5,
          b: 10,
          c: 1000
        },
        {
          a: compose(gt(0)),
          b: compose(lt(100)),
          c: compose(gt(500), lt(100000))
        }
      )).toEqual(noValidationErrors);
  });

  it('should pass string matching checks', () => {
    expect(validate(
      {
        a: 'this',
        b: 'is',
        c: 'a string'
      },
      {
        a: compose(match('this')),
        b: compose(match('is')),
        c: compose(match('string'))
      }
    )).toEqual(noValidationErrors);
  });

});
