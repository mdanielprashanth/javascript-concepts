# Async/Await in JavaScript

Async/await provides a cleaner way to work with Promises in JavaScript. It makes asynchronous code easier to read and maintain without relying on multiple `.then()` callbacks.

## 1. Async Functions

An `async` function always returns a Promise, even when it returns a regular JavaScript value.

```javascript
async function getEmployee() {
    return {
        id: 101,
        name: "Daniel",
        role: "Senior Software Engineer"
    };
}

const result = getEmployee();

console.log(result);
```

**Output:**

```text
Promise {
  {
    id: 101,
    name: 'Daniel',
    role: 'Senior Software Engineer'
  }
}
```

JavaScript automatically wraps the returned value in a fulfilled Promise.

Conceptually, this is similar to:

```javascript
function getEmployee() {
    return Promise.resolve({
        id: 101,
        name: "Daniel",
        role: "Senior Software Engineer"
    });
}
```

## 2. Await Keyword

The `await` keyword waits for a Promise to settle and returns its fulfilled value.

It can only be used inside an `async` function (apart from supported top-level await contexts).

```javascript
async function getEmployee() {
    return {
        id: 101,
        name: "Daniel",
        role: "Senior Software Engineer"
    };
}

async function displayEmployee() {
    const employee = await getEmployee();
    console.log(employee);
}

displayEmployee();
```

**Output:**

```text
{
  id: 101,
  name: 'Daniel',
  role: 'Senior Software Engineer'
}
```

- `getEmployee()` returns a Promise.
- `await getEmployee()` gives the resolved employee object.
- `await` pauses the execution of the surrounding async function until the Promise settles.

**Important:** `await` does not block the entire JavaScript thread. It suspends only the surrounding async function.

## 3. Sequential Execution

Sequential execution means each asynchronous operation waits for the previous operation to complete.

This is useful when one operation depends on the result of another.

```javascript
async function displayEmployeeDetails() {
    const employee = await getEmployee();

    const projects = await getProjects(employee.id);

    console.log(employee);
    console.log(projects);
}
```

**Execution flow:**

1. Fetch employee details.
2. Wait for the employee Promise to resolve.
3. Extract the employee ID.
4. Fetch projects using that ID.
5. Wait for the projects Promise to resolve.

If each API call takes 1 second, the total execution time is approximately 2 seconds.

## 4. Concurrent Execution

When asynchronous operations are independent, they can be started without waiting for one another.

```javascript
async function displayDetails() {
    const employeePromise = getEmployee();
    const projectsPromise = getProjects(101);

    const employee = await employeePromise;
    const projects = await projectsPromise;

    console.log(employee);
    console.log(projects);
}
```

Both operations start immediately when their respective functions are called.

If the employee API takes 2 seconds and the projects API takes 3 seconds, the approximate total execution time is 3 seconds.

**Comparison:**

| Execution | Approximate time |
|---|---:|
| Sequential (2s + 3s) | 5 seconds |
| Concurrent (2s and 3s together) | 3 seconds |

**Important:** Concurrent execution is suitable when operations are independent. If fetching projects requires the employee ID returned by the employee API, the operations must be sequential.

## 5. Error Handling with try...catch

Rejected Promises can be handled using `try...catch`.

When an awaited Promise rejects, `await` throws the rejection reason, and execution moves to the nearest matching `catch` block.

```javascript
async function getOrders(user) {
    if (user.id !== 101) {
        throw new Error("Orders not found");
    }

    return ["Order 1", "Order 2"];
}

async function displayOrders() {
    try {
        const user = { id: 102, name: "Daniel" };

        const orders = await getOrders(user);

        console.log(orders);
    } catch (error) {
        console.error(error.message);
    }
}

displayOrders();
```

**Output:**

```text
Orders not found
```

Throwing an error inside an async function causes the returned Promise to reject.

## 6. finally Block

The `finally` block executes regardless of whether the Promise operations succeed or fail.

It is useful for cleanup operations, loading indicators, and completion messages.

```javascript
async function displayOrders() {
    try {
        const user = { id: 102, name: "Daniel" };

        const orders = await getOrders(user);

        console.log(orders);
    } catch (error) {
        console.error(error.message);
    } finally {
        console.log("Order processing completed");
    }
}

displayOrders();
```

**Output:**

```text
Orders not found
Order processing completed
```

The `finally` block executes after either the `try` or `catch` block.

## 7. Practical Example – Employee, Orders and Order Details

This example demonstrates sequential API calls, async/await, error handling, and finally.

```javascript
const orders = ["Order 1", "Order 2"];

const items = {
    "Order 1": {
        item: "Laptop",
        price: 50000
    }
};

const delay = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

async function getUser(userId) {
    await delay(1000);

    return {
        id: userId,
        name: "Daniel"
    };
}

async function getOrders(user) {
    await delay(1000);

    if (user.id === 101) {
        return orders;
    }

    throw new Error("Orders not found");
}

async function getOrderDetails(order) {
    await delay(1000);

    return items[order];
}

async function displayOrderDetails() {
    try {
        const user = await getUser(101);
        console.log(user);

        const userOrders = await getOrders(user);
        console.log(userOrders);

        const orderDetails = await getOrderDetails(userOrders[0]);
        console.log(orderDetails);

    } catch (error) {
        console.error(error.message);

    } finally {
        console.log("Order processing completed");
    }
}

displayOrderDetails();
```

**Output:**

```text
{ id: 101, name: 'Daniel' }
[ 'Order 1', 'Order 2' ]
{ item: 'Laptop', price: 50000 }
Order processing completed
```

Each API call takes approximately 1 second, and the operations execute sequentially because each depends on the previous result.

---

## Key Takeaways

- `async` functions always return Promises.
- `await` waits for a Promise to settle and provides its fulfilled value.
- Sequential execution is required when operations depend on previous results.
- Independent operations can be started concurrently.
- `try...catch` handles rejected Promises.
- `throw new Error()` rejects the Promise returned by an async function.
- `finally` executes regardless of success or failure.