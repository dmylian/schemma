export type ValidationError<T> = { info: string, input: T };

export type ValidationResult<T> = ValidationError<T> | true;

export type ValidatorFn = (x: any) => (y: any) => ValidationResult<*>;
