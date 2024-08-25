export declare abstract class Result<T, E> {
    /**
     * Create a new Ok variant of Result
     */
    static Ok<T>(value: T): Ok<T>;
    /**
     * Create a new Err variant of Result
     */
    static Err<E>(error: E): Err<E>;
    /**
     * Check if this Result is of the Ok variant
     */
    isOk(): this is Ok<T>;
    /**
     * Check if this Result is of the Err variant
     */
    isErr(): this is Err<E>;
    /**
     * Check if this Result is of the Ok variant and predicate returns true
     */
    isOkAnd(predicate: (value: T) => boolean): this is Ok<T>;
    /**
     * Check if this Result is of the Err variant and predicate returns true
     */
    isErrAnd(predicate: (error: E) => boolean): this is Err<E>;
    /**
     * Unwrap the value if it is of the Ok variant, otherwise panic with the given error
     */
    abstract expectOk(error: Error): T | never;
    /**
     * Unwrap the error if it is of the Err variant, otherwise panic with the given error
     */
    abstract expectErr(error: Error): E | never;
    /**
     * Map this Result<T, E> to Result<U, E> by applying the function to the value if this Result is of the Ok variant
     */
    mapOk<U>(fn: (value: T) => U): Result<U, E>;
    /**
     * Map this Result<T, E> to Result<T, F> by applying the function to the error if this Result is of the Err variant
     */
    mapErr<F>(fn: (error: E) => F): Result<T, F>;
    /**
     * Pattern match on this Result and return the result of the appropriate function
     */
    match<R>(on_ok: (value: T) => R, on_err: (error: E) => R): R;
}
export declare class Ok<T> extends Result<T, never> {
    private _value;
    constructor(value: T);
    /**
     * Unwrap the value if it is of the Ok variant, otherwise panic with the given error
     */
    expectOk(): T;
    /**
     * Unwrap the error if it is of the Err variant, otherwise panic with the given error
     */
    expectErr(error: Error): never;
}
export declare class Err<E> extends Result<never, E> {
    private _error;
    constructor(error: E);
    /**
     * Unwrap the value if it is of the Ok variant, otherwise panic with the given error
     */
    expectOk(error: Error): never;
    /**
     * Unwrap the error if it is of the Err variant, otherwise panic with the given error
     */
    expectErr(): E;
}
