# Result
A rust-like result type

## Installation

```bash
npm install @serum-enterprises/result
```

## Usage

This module exports an abstract class `Result` which is a rust-like result type. It has two subclasses, `Ok` and `Err`, which represent success and failure respectively.

```typescript
import { Result, Ok, Err } from '@serum-enterprises/result';
```

The `Ok` and `Err` classes can be created from either the Result class or directly using the constructors.

```typescript
const ok = new Ok(42);
const err = new Err(new Error('Something went wrong'));

const ok = Result.Ok(42);
const err = Result.Err(new Error('Something went wrong'));
```

There are multiple methods available on the `Result` class to work with the result.

```typescript
Result.prototype.is_ok(): this is Ok<T>;
Result.prototype.is_err(): this is Err<E>;
Result.prototype.is_ok_and(predicate: (value: T) => boolean): this is Ok<T> & ReturnType<typeof predicate>;
Result.prototype.is_err_and(predicate: (error: E) => boolean): this is Err<E> & ReturnType<typeof predicate>;
Result.prototype.expect_ok(error: Error): T | never;
Result.prototype.expect_err(error: Error): E | never;
Result.prototype.map_ok<U>(fn: (value: T) => U): Result<U, E>;
Result.prototype.map_err<F>(fn: (error: E) => F): Result<T, F>;
Result.prototype.match<R>(on_ok: (value: T) => R, on_err: (error: E) => R): R;
```

Please note that `expect_ok` and `expect_err` will panic and crash the Thread or Process if the calling instance is not of the expected type. This is intentional and should be used with caution.

## License

MIT License

Copyright (c) 2024 Serum Enterprises

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
