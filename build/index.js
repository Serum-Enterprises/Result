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
    isOk() {
        return (this instanceof Ok);
    }
    /**
     * Check if this Result is of the Err variant
     */
    isErr() {
        return (this instanceof Err);
    }
    /**
     * Check if this Result is of the Ok variant and predicate returns true
     */
    isOkAnd(predicate) {
        return (this instanceof Ok) && predicate(this.expectOk());
    }
    /**
     * Check if this Result is of the Err variant and predicate returns true
     */
    isErrAnd(predicate) {
        return (this instanceof Err) && predicate(this.expectErr());
    }
    /**
     * Map this Result<T, E> to Result<U, E> by applying the function to the value if this Result is of the Ok variant
     */
    mapOk(fn) {
        return (this instanceof Ok) ? Result.Ok(fn(this.expectOk())) : Result.Err(this.expectErr());
    }
    /**
     * Map this Result<T, E> to Result<T, F> by applying the function to the error if this Result is of the Err variant
     */
    mapErr(fn) {
        return (this instanceof Ok) ? Result.Ok(this.expectOk()) : Result.Err(fn(this.expectErr()));
    }
    /**
     * Pattern match on this Result and return the result of the appropriate function
     */
    match(on_ok, on_err) {
        if (this instanceof Ok) {
            return on_ok(this.expectOk());
        }
        else {
            return on_err(this.expectErr());
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
     * Unwrap the value if it is of the Ok variant, otherwise panic with the given error
     */
    expectOk() {
        return this._value;
    }
    /**
     * Unwrap the error if it is of the Err variant, otherwise panic with the given error
     */
    expectErr(error) {
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
     * Unwrap the value if it is of the Ok variant, otherwise panic with the given error
     */
    expectOk(error) {
        (0, panic_1.panic)(error);
    }
    /**
     * Unwrap the error if it is of the Err variant, otherwise panic with the given error
     */
    expectErr() {
        return this._error;
    }
}
exports.Err = Err;
