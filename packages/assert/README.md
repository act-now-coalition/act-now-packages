# @covid-projections/assert

Assertion functions

## API

### `assert(condition:any, msg?: string): asserts condition`

Test if the `condition` is truthy. If `condition` is false, it throws an error with an optional message. If the message parameter is missing, it throws an error with a default message.

### `fail(msg?:string): never`

Throws an Error with the (optionally) provided error message.
