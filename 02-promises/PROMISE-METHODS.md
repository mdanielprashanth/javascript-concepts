# JavaScript Promise Methods

JavaScript provides four commonly used static Promise methods to handle multiple asynchronous operations.

- `Promise.all()`
- `Promise.allSettled()`
- `Promise.race()`
- `Promise.any()`

## 1. Promise.all()

`Promise.all()` accepts an iterable of Promises and returns a single Promise.

- Fulfils only when **all input Promises fulfil**.
- Rejects as soon as **any one input Promise rejects**.
- Returns an array containing the fulfilled values.
- Results maintain the original input order, not completion order.
- Other Promises are not cancelled when one rejects.

```javascript
Promise.all([
    getUser(),
    getOrders(),
    getPayments()
])
.then((results) => {
    console.log(results);
})
.catch((error) => {
    console.error(error);
});
```

**Use case:** When all API responses are required to complete an operation.

## 2. Promise.allSettled()

`Promise.allSettled()` waits until every input Promise has settled, regardless of whether it fulfils or rejects.

- Always fulfils with an array of settlement objects once all input Promises settle.
- Each object contains a `status` property.
- Fulfilled results contain a `value` property.
- Rejected results contain a `reason` property.
- Results maintain the original input order.

```javascript
Promise.allSettled([
    getUser(),
    getOrders(),
    getPayments()
])
.then((results) => {
    console.log(results);
});
```

Example result:

```javascript
[
    { status: "fulfilled", value: { id: 101, name: "Daniel" } },
    { status: "rejected", reason: "Orders API failed" },
    { status: "fulfilled", value: ["Payment 1", "Payment 2"] }
]
```

**Use case:** When we want results from every operation, even if some operations fail. For example, loading independent dashboard widgets.

## 3. Promise.race()

`Promise.race()` settles as soon as the first input Promise settles.

- The first fulfilled or rejected Promise determines the result.
- It does not wait for all Promises.
- Other Promises are not cancelled.

```javascript
Promise.race([
    getUser(),
    getOrders(),
    getPayments()
])
.then((result) => {
    console.log(result);
})
.catch((error) => {
    console.error(error);
});
```

**Use case:** Implementing timeout or first-response-wins behaviour.

## 4. Promise.any()

`Promise.any()` fulfils as soon as the first input Promise fulfils.

- Ignores rejected Promises while waiting for a successful fulfilment.
- Returns the first fulfilled value.
- If all input Promises reject, it rejects with an `AggregateError`.
- Individual rejection reasons are available through `error.errors`.
- Other Promises are not cancelled.

```javascript
Promise.any([
    getUser(),
    getOrders(),
    getPayments()
])
.then((result) => {
    console.log(result);
})
.catch((error) => {
    console.error(error.errors);
});
```

Example when all Promises reject:

```javascript
Promise.any([
    Promise.reject("API 1 failed"),
    Promise.reject("API 2 failed"),
    Promise.reject("API 3 failed")
])
.catch((error) => {
    console.log(error instanceof AggregateError); // true
    console.log(error.errors);
});
```

**Use case:** Trying multiple independent services and accepting the first successful response.

## Comparison of Promise Methods

| Method | When does it settle? | Behaviour |
|---|---|---|
| `Promise.all()` | All fulfil or first rejection | Fails fast if any Promise rejects |
| `Promise.allSettled()` | All Promises settle | Returns every outcome |
| `Promise.race()` | First Promise settles | First fulfilment or rejection wins |
| `Promise.any()` | First fulfilment or all reject | First successful result wins |

## Important Takeaways

1. All four methods accept an iterable, commonly an array of Promises.
2. `Promise.all()` and `Promise.any()` reject under different conditions.
3. `Promise.race()` considers both fulfilment and rejection.
4. `Promise.allSettled()` gives the outcome of every Promise.
5. These methods do not automatically cancel the remaining asynchronous operations.
6. `Promise.any()` uses `AggregateError` when every input Promise rejects.