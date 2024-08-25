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
	isOk(): this is Ok<T> {
		return (this instanceof Ok);
	}

	/**
	 * Check if this Result is of the Err variant
	 */
	isErr(): this is Err<E> {
		return (this instanceof Err);
	}

	/**
	 * Check if this Result is of the Ok variant and predicate returns true
	 */
	isOkAnd(predicate: (value: T) => boolean): this is Ok<T> {
		return (this instanceof Ok) && predicate(this.expectOk());
	}

	/**
	 * Check if this Result is of the Err variant and predicate returns true
	 */
	isErrAnd(predicate: (error: E) => boolean): this is Err<E> {
		return (this instanceof Err) && predicate(this.expectErr());
	}

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
	mapOk<U>(fn: (value: T) => U): Result<U, E> {
		return (this instanceof Ok) ? Result.Ok(fn(this.expectOk())) : Result.Err((this as unknown as Err<E>).expectErr());
	}

	/**
	 * Map this Result<T, E> to Result<T, F> by applying the function to the error if this Result is of the Err variant
	 */
	mapErr<F>(fn: (error: E) => F): Result<T, F> {
		return (this instanceof Ok) ? Result.Ok(this.expectOk()) : Result.Err(fn((this as unknown as Err<E>).expectErr()));
	}

	/**
	 * Pattern match on this Result and return the result of the appropriate function
	 */
	match<R>(on_ok: (value: T) => R, on_err: (error: E) => R): R {
		if (this instanceof Ok) {
			return on_ok(this.expectOk());
		}
		else {
			return on_err((this as unknown as Err<E>).expectErr());
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
	 * Unwrap the value if it is of the Ok variant, otherwise panic with the given error
	 */
	expectOk(): T {
		return this._value;
	}

	/**
	 * Unwrap the error if it is of the Err variant, otherwise panic with the given error
	 */
	expectErr(error: Error): never {
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
	 * Unwrap the value if it is of the Ok variant, otherwise panic with the given error
	 */
	expectOk(error: Error): never {
		panic(error);
	}

	/**
	 * Unwrap the error if it is of the Err variant, otherwise panic with the given error
	 */
	expectErr(): E {
		return this._error;
	}
}
