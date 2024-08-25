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
    is_ok(): this is Ok<T>;
    /**
     * Check if this Result is of the Err variant
     */
    is_err(): this is Err<E>;
    /**
     * Check if this Result is of the Ok variant and the value passes the predicate
     */
    is_ok_and(predicate: (value: T) => boolean): this is Ok<T>;
    /**
     * Check if this Result is of the Err variant and the error passes the predicate
     */
    is_err_and(predicate: (error: E) => boolean): this is Err<E>;
    /**
     * Unwrap the value if it is of the Ok variant, otherwise this method will panic
     */
    abstract expect_ok(error: Error): T | never;
    /**
     * Unwrap the error if it is of the Err variant, otherwise this method will panic
     */
    abstract expect_err(error: Error): E | never;
    /**
     * Map this Result<T, E> to Result<U, E> by applying the function to the value if this Result is of the Ok variant
     */
    map_ok<U>(fn: (value: T) => U): Result<U, E>;
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
     * Unwrap the value if it is of the Ok variant, otherwise this method will panic
     */
    expect_ok(): T;
    /**
     * Unwrap the error if it is of the Err variant, otherwise this method will panic
     */
    expect_err(error: Error): never;
}
export declare class Err<E> extends Result<never, E> {
    private _error;
    constructor(error: E);
    /**
     * Unwrap the value if it is of the Ok variant, otherwise this method will panic
     */
    expect_ok(error: Error): never;
    /**
     * Unwrap the error if it is of the Err variant, otherwise this method will panic
     */
    expect_err(): E;
}
