# JavaScript Promises

Promises help us manage asynchronous operations in JavaScript.

Before understanding Promises, let's look at two problems commonly found in callback-based asynchronous code:

1. Callback Hell
2. Inversion of Control (IoC)

## 1. Callback Hell

Callback Hell occurs when multiple asynchronous operations depend on one another and callbacks become deeply nested.

This makes code difficult to read, maintain, and debug.

### Example

```javascript
function getUser(userId, callback) {
    setTimeout(() => {
        console.log("User fetched");
        callback({ id: userId, name: "Daniel" });
    }, 1000);
}

function getOrders(user, callback) {
    setTimeout(() => {
        console.log("Orders fetched for " + user.name);
        callback(["Order 1", "Order 2"]);
    }, 1000);
}

function getOrderDetails(order, callback) {
    setTimeout(() => {
        console.log("Details fetched for " + order);
        callback({ item: "Laptop", price: 50000 });
    }, 1000);
}

// Callback Hell
getUser(1, function (user) {
    getOrders(user, function (orders) {
        getOrderDetails(orders[0], function (details) {
            console.log(details);
        });
    });
});
```

Each operation depends on the result of the previous operation, resulting in nested callbacks.

This structure is commonly known as Callback Hell.

### What this example demonstrates

- Fetch a user.
- Use that user to fetch their orders.
- Use the first order to fetch its details.
- Each operation waits for the previous callback.

## 2. Inversion of Control (IoC)

Inversion of Control occurs when we pass control of a function's execution to another function or external code.

When we pass a callback to another function, we trust that function to decide when and how to execute our callback.

### Example

```javascript
function processOrder(callback) {
    // The external function controls when the callback executes
    callback();
}

processOrder(() => {
    console.log("Order processed");
});
```

Here, `processOrder()` controls when the callback is executed.

The calling code hands over control of the callback to `processOrder()`.

### Why is this a problem?

- We depend on another function to invoke our callback.
- It might invoke the callback multiple times.
- It might never invoke the callback.
- It might invoke the callback at an unexpected time.

This makes callback-based asynchronous code harder to control and manage.

Promises provide a more structured way to handle asynchronous operations and reduce this dependency on externally managed callbacks.

## 3. Promise Creation and Consumption

A Promise is an object representing the eventual completion or failure of an asynchronous operation.

A Promise has three states:

- **Pending:** Initial state; operation is still in progress.
- **Fulfilled:** Operation completed successfully.
- **Rejected:** Operation failed.

### Creating a Promise

A Promise is created using the `Promise` constructor, which accepts an executor function with two arguments:

- `resolve()` – fulfills the Promise with a value.
- `reject()` – rejects the Promise with a reason.

```javascript
const promise = new Promise((resolve, reject) => {
    // Asynchronous operation
});
```

### Example

```javascript
const employee = {
    id: 101,
    name: "Daniel",
    role: "Senior Software Engineer"
};

const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        if (!employee) {
            reject("Employee not found");
            return;
        }

        resolve(employee);
    }, 2000);
});

promise
    .then((employee) => {
        console.log(employee);
    })
    .catch((error) => {
        console.log(error);
    });
```

### Consuming a Promise

- `.then()` handles successful fulfillment.
- `.catch()` handles rejection.
- `.finally()` executes after the Promise settles, regardless of whether it fulfilled or rejected.

**Important:**

- A Promise executor executes synchronously.
- `.then()`, `.catch()`, and `.finally()` handlers execute asynchronously as microtasks.
- A Promise can settle only once. Subsequent calls to `resolve()` or `reject()` do not change its settled state or result.

## 4. Promise Chaining

Promise chaining allows us to execute multiple asynchronous operations sequentially without deeply nesting callbacks.

Each `.then()` can return a value or another Promise, which becomes the input for the next `.then()`.

### Example

```javascript
function getUser(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id: userId, name: "Daniel" });
        }, 1000);
    });
}

function getOrders(user) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`${user.name}'s orders are being fetched`);

            if (user.id === 101) {
                resolve(["Order 1", "Order 2"]);
            } else {
                reject("Orders not found");
            }
        }, 1000);
    });
}

function getOrderDetails(order) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ item: "Laptop", price: 50000 });
        }, 1000);
    });
}

getUser(101)
    .then((user) => {
        return getOrders(user);
    })
    .then((orders) => {
        return getOrderDetails(orders[0]);
    })
    .then((details) => {
        console.log(details);
    })
    .catch((error) => {
        console.log(error);
    })
    .finally(() => {
        console.log("Promise execution completed");
    });
```

### How Promise chaining works

1. `getUser()` returns a Promise containing the user details.
2. The first `.then()` receives the user and returns the Promise from `getOrders()`.
3. The second `.then()` receives the orders and returns the Promise from `getOrderDetails()`.
4. The third `.then()` receives and prints the order details.
5. `.catch()` handles errors from any earlier operation in the chain.
6. `.finally()` executes after the chain settles, regardless of success or failure.

### Important: Always return the Promise

```javascript
.then((user) => {
    return getOrders(user);
})
```

Returning the Promise ensures that the next `.then()` waits for the asynchronous operation to complete.

If we omit `return`, the callback implicitly returns `undefined`, and the next `.then()` does not wait for `getOrders()`.

## 5. Error Handling with Promise Chaining

If a Promise is rejected or an error is thrown inside a `.then()` callback, the rejection propagates through the chain until a `.catch()` handles it.

### Example

```javascript
Promise.resolve(10)
    .then((value) => {
        console.log(value);
        throw new Error("Something went wrong");
    })
    .then((value) => {
        console.log("Second then:", value);
        return value * 2;
    })
    .catch((error) => {
        console.log("Caught:", error.message);
        return 50;
    })
    .then((value) => {
        console.log("Final:", value);
    });
```

### Output

```text
10
Caught: Something went wrong
Final: 50
```

### Important concepts

- When an error is thrown, the Promise returned by that `.then()` becomes rejected.
- Subsequent fulfillment handlers are skipped until a rejection handler is encountered.
- `.catch()` handles the rejection.
- Returning a normal value from `.catch()` recovers the chain and fulfills the next Promise with that value.

## 6. The finally() Method

The `.finally()` method executes after a Promise settles, regardless of whether it was fulfilled or rejected.

It is commonly used for cleanup operations, such as hiding a loading indicator or releasing resources.

### Example

```javascript
Promise.resolve("Success")
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    })
    .finally(() => {
        console.log("Operation completed");
    });
```

### Important concepts

- `.finally()` does not receive the fulfillment value or rejection reason as an argument.
- It normally preserves the original Promise's value or rejection.
- If its callback throws an error or returns a rejected Promise, the resulting Promise becomes rejected.

## Summary

| Method | Purpose |
|---|---|
| `new Promise()` | Creates a Promise |
| `resolve()` | Fulfills a Promise |
| `reject()` | Rejects a Promise |
| `.then()` | Handles fulfillment |
| `.catch()` | Handles rejection |
| `.finally()` | Executes after settlement |

Promises provide a cleaner and more manageable way to handle asynchronous operations compared to deeply nested callbacks.