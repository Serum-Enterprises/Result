"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Err = exports.Ok = exports.Result = void 0;
const panic_1 = require("@serum-enterprises/panic");
class Result {
    /**
     * Create a new Ok variant of Result
     */
    static Ok(value) {
        return new Ok(value);
    }
    /**
     * Create a new Err variant of Result
     */
    static Err(error) {
        return new Err(error);
    }
    /**
     * Check if this Result is of the Ok variant
     */
    is_ok() {
        return (this instanceof Ok);
    }
    /**
     * Check if this Result is of the Err variant
     */
    is_err() {
        return (this instanceof Err);
    }
    /**
     * Check if this Result is of the Ok variant and the value passes the predicate
     */
    is_ok_and(predicate) {
        return (this instanceof Ok) && predicate(this.expect_ok());
    }
    /**
     * Check if this Result is of the Err variant and the error passes the predicate
     */
    is_err_and(predicate) {
        return (this instanceof Err) && predicate(this.expect_err());
    }
    /**
     * Map this Result<T, E> to Result<U, E> by applying the function to the value if this Result is of the Ok variant
     */
    map_ok(fn) {
        return (this instanceof Ok) ? Result.Ok(fn(this.expect_ok())) : Result.Err(this.expect_err());
    }
    /**
     * Map this Result<T, E> to Result<T, F> by applying the function to the error if this Result is of the Err variant
     */
    mapErr(fn) {
        return (this instanceof Ok) ? Result.Ok(this.expect_ok()) : Result.Err(fn(this.expect_err()));
    }
    /**
     * Pattern match on this Result and return the result of the appropriate function
     */
    match(on_ok, on_err) {
        if (this instanceof Ok) {
            return on_ok(this.expect_ok());
        }
        else {
            return on_err(this.expect_err());
        }
    }
}
exports.Result = Result;
class Ok extends Result {
    constructor(value) {
        super();
        this._value = value;
    }
    /**
     * Unwrap the value if it is of the Ok variant, otherwise this method will panic
     */
    expect_ok() {
        return this._value;
    }
    /**
     * Unwrap the error if it is of the Err variant, otherwise this method will panic
     */
    expect_err(error) {
        (0, panic_1.panic)(error);
    }
}
exports.Ok = Ok;
class Err extends Result {
    constructor(error) {
        super();
        this._error = error;
    }
    /**
     * Unwrap the value if it is of the Ok variant, otherwise this method will panic
     */
    expect_ok(error) {
        (0, panic_1.panic)(error);
    }
    /**
     * Unwrap the error if it is of the Err variant, otherwise this method will panic
     */
    expect_err() {
        return this._error;
    }
}
exports.Err = Err;
