import { panic } from '@serum-enterprises/panic';

export abstract class Result<T, E> {
	/**
	 * Create a new Ok variant of Result
	 */
	static Ok<T>(value: T): Ok<T> {
		return new Ok(value);
	}

	/**
	 * Create a new Err variant of Result
	 */
	static Err<E>(error: E): Err<E> {
		return new Err(error);
	}

	/**
	 * Check if this Result is of the Ok variant
	 */
	is_ok(): this is Ok<T> {
		return (this instanceof Ok);
	}

	/**
	 * Check if this Result is of the Err variant
	 */
	is_err(): this is Err<E> {
		return (this instanceof Err);
	}

	/**
	 * Check if this Result is of the Ok variant and the value passes the predicate
	 */
	is_ok_and(predicate: (value: T) => boolean): this is Ok<T> {
		return (this instanceof Ok) && predicate(this.expect_ok());
	}

	/**
	 * Check if this Result is of the Err variant and the error passes the predicate
	 */
	is_err_and(predicate: (error: E) => boolean): this is Err<E> {
		return (this instanceof Err) && predicate(this.expect_err());
	}

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
	map_ok<U>(fn: (value: T) => U): Result<U, E> {
		return (this instanceof Ok) ? Result.Ok(fn(this.expect_ok())) : Result.Err((this as unknown as Err<E>).expect_err());
	}

	/**
	 * Map this Result<T, E> to Result<T, F> by applying the function to the error if this Result is of the Err variant
	 */
	mapErr<F>(fn: (error: E) => F): Result<T, F> {
		return (this instanceof Ok) ? Result.Ok(this.expect_ok()) : Result.Err(fn((this as unknown as Err<E>).expect_err()));
	}

	/**
	 * Pattern match on this Result and return the result of the appropriate function
	 */
	match<R>(on_ok: (value: T) => R, on_err: (error: E) => R): R {
		if (this instanceof Ok) {
			return on_ok(this.expect_ok());
		}
		else {
			return on_err((this as unknown as Err<E>).expect_err());
		}
	}
}

export class Ok<T> extends Result<T, never> {
	private _value: T;

	constructor(value: T) {
		super();
		this._value = value;
	}

	/**
	 * Unwrap the value if it is of the Ok variant, otherwise this method will panic
	 */
	expect_ok(): T {
		return this._value;
	}

	/**
	 * Unwrap the error if it is of the Err variant, otherwise this method will panic
	 */
	expect_err(error: Error): never {
		panic(error);
	}
}

export class Err<E> extends Result<never, E> {
	private _error: E;

	constructor(error: E) {
		super();
		this._error = error;
	}

	/**
	 * Unwrap the value if it is of the Ok variant, otherwise this method will panic
	 */
	expect_ok(error: Error): never {
		panic(error);
	}

	/**
	 * Unwrap the error if it is of the Err variant, otherwise this method will panic
	 */
	expect_err(): E {
		return this._error;
	}
}
