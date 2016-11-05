type ValidationError<T> = { info: string, input: T };

type ValidationResult<T> = ValidationError<T> | true;

type ValidatorFn = (x: any) => (y: any) => ValidationResult<*>;

type Map<T> = {[key: string]: T};
