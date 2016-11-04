// @flow

const get = (p: string): Function => (object: Object): any => object[p];

// Compose function for the rules definition object
// compose :: fns[] -> (field -> fieldErrors)
const compose = (...validators: Array<Function>): Function | null => {
  if (!validators.length) return null;
  return (field: any) => filterErrors(applyValidators(field, validators));
}

// applyValidators :: field -> validators -> validationResults[]
const applyValidators = (field: any, validators: Array<Function>): Array<any> => validators.map(v => v(field));
const filterErrors = (errors: Array<any>): Array<any> => errors.filter(get('info'));

// mergeErrors :: sourceObject -> rulesObject -> validationResults
const mergeErrors = (source: Object, rules: Object): Object => {
  return Object.keys(source).reduce((acc, c) => {
    acc[c] = rules[c](source[c]);
    return acc;
  }, {});
}

module.exports = {
  compose,
  mergeErrors
}
