/* Validator core */

const get = (p) => (object) => object[p];

// Compose function for the rules definition object
// compose :: fns[] -> (field -> fieldErrors)
const compose = (...validators) => {
  if (!validators.length) return null;
  return (field) => filterErrors(applyValidators(field, validators));
}

// applyValidators :: field -> validators -> validationResults[]
const applyValidators = (field, validators) => validators.map(v => v(field));
const filterErrors = (errors) => errors.filter(get('info'));

// mergeErrors :: sourceObject -> rulesObject -> validationResults
const mergeErrors = (source, rules) => {
  return Object.keys(source).reduce((acc, c) => {
    acc[c] = rules[c](source[c]);
    return acc;
  }, {});
}

module.exports = {
  compose,
  mergeErrors
}
