# Functions and Asynchronous JavaScript

## 1. First-Class Functions

JavaScript treats functions as **first-class citizens**, meaning functions can be treated like ordinary values.

A function can be:

- Assigned to a variable.
- Passed as an argument to another function.
- Returned from another function.
- Stored in objects and arrays.

### Example 1: Assigning a function to a variable

```javascript
function multiply(a, b) {
    return a * b;
}

const calculate = multiply;

console.log(calculate(5, 4)); // 20
console.log(typeof calculate); // function
console.log(typeof multiply); // function
```

Here, `calculate` holds a reference to the same function object as `multiply`. No new function is created.

### Example 2: Passing a function as an argument

```javascript
function greet() {
    console.log("Hello!");
}

function execute(callback) {
    callback();
}

execute(greet); // Hello!
```

The `greet` function is passed as an argument and invoked inside `execute`.

### Interview takeaway

First-class functions allow functions to be assigned to variables, passed as arguments, and returned from other functions.

---

## 2. Callback Functions

A **callback function** is a function passed as an argument to another function and invoked by the receiving function.

### Example

```javascript
function greet(name, callback) {
    console.log("Hello " + name);

    callback();
}

function sayBye() {
    console.log("Goodbye!");
}

greet("Daniel", sayBye);
```

Output:

```text
Hello Daniel
Goodbye!
```

### Function reference vs function invocation

```javascript
greet("Daniel", sayBye);
```

- `sayBye` passes the function reference.
- `sayBye()` immediately invokes the function and passes its return value.

The receiving function decides when to execute the callback.

### Important points

- Callbacks can be synchronous or asynchronous.
- A callback does not automatically mean asynchronous execution.
- Callbacks allow us to control what happens after an operation.

### Interview takeaway

A callback is a function passed to another function to be executed later or at a specific point during that function's execution.

---

## 3. Event Listeners

Event listeners allow JavaScript to respond to browser events such as clicks, keyboard input, mouse movements, and form submissions.

### Example

```javascript
const button = document.getElementById("submitButton");

function handleClick() {
    console.log("Button clicked!");
}

button.addEventListener("click", handleClick);
```

### How it works

1. `addEventListener()` registers the callback with the browser's DOM event system.
2. The browser maintains the association between the DOM element and the callback.
3. When the user clicks the button, the browser detects the event.
4. The browser schedules the callback for execution.
5. When the call stack is available, the event callback executes.

The callback is not executed immediately when `addEventListener()` is called.

### Removing event listeners

```javascript
function handleClick() {
    console.log("Button clicked!");
}

button.addEventListener("click", handleClick);

// Remove the listener
button.removeEventListener("click", handleClick);
```

We need to pass the same function reference when removing the event listener.

### Garbage Collection and Event Listeners

JavaScript uses garbage collection to reclaim memory occupied by objects that are no longer reachable.

Event listeners can retain references to functions and their surrounding lexical environments.

If unnecessary listeners or references remain attached to long-lived objects, they can contribute to memory leaks.

Removing listeners when they are no longer needed helps prevent such issues.

### Interview takeaway

Event listeners register callbacks with the browser, and the browser invokes those callbacks when the corresponding events occur.

---

## 4. JavaScript Engine

A JavaScript engine is responsible for processing and executing JavaScript code.

Examples:

- V8 – Used by Google Chrome and Node.js.
- SpiderMonkey – Used by Firefox.
- JavaScriptCore – Used by Safari.

### How V8 works

At a high level, V8 uses the following components:

**1. Parsing**

- The source code is parsed.
- The parser generates an Abstract Syntax Tree (AST).

**2. Interpretation**

- Ignition converts the AST into bytecode.
- The bytecode is executed.

**3. Optimization**

- TurboFan optimizes frequently executed code using runtime feedback.
- Optimized machine code improves execution performance.

### Simplified flow

```text
JavaScript Source Code
          |
          v
       Parser
          |
          v
 Abstract Syntax Tree (AST)
          |
          v
       Ignition
          |
          v
        Bytecode
          |
          v
       Execution
          |
          v
   TurboFan Optimization
          |
          v
     Machine Code
```

Note: Modern JavaScript engines use multiple optimization techniques, and the exact implementation differs between engines.

### Interview takeaway

A JavaScript engine parses source code, generates executable instructions, executes them, and optimizes frequently executed code for better performance.

---

## 5. Event Loop

JavaScript executes code synchronously on its main execution thread. However, browsers and Node.js provide mechanisms to handle asynchronous operations.

The event loop coordinates the execution of asynchronous callbacks.

### Important components

- **Call Stack:** Executes JavaScript functions using LIFO (Last In, First Out).
- **Web APIs:** Browser-provided APIs that handle operations such as timers and DOM events.
- **Microtask Queue:** Holds Promise reactions, `queueMicrotask()` callbacks, and other microtasks.
- **Task Queue (Macrotask Queue):** Holds tasks such as timer callbacks and browser event callbacks.
- **Event Loop:** Coordinates when queued work can execute.

### Example

```javascript
console.log("Start");

setTimeout(() => {
    console.log("Timer");
}, 0);

Promise.resolve().then(() => {
    console.log("Promise");
});

console.log("End");
```

Output:

```text
Start
End
Promise
Timer
```

### Execution flow

1. Synchronous code executes first.
2. `setTimeout()` schedules its callback through the browser's timer API.
3. The Promise `.then()` callback is scheduled as a microtask.
4. Synchronous execution completes.
5. Microtasks are processed.
6. The next eligible task, such as the timer callback, executes.

### Microtask Queue examples

- `Promise.then()`
- `Promise.catch()`
- `Promise.finally()`
- `queueMicrotask()`
- `MutationObserver` callbacks in browsers.

### Task Queue examples

- `setTimeout()` callbacks.
- `setInterval()` callbacks.
- Browser event callbacks, such as click events.

### Important distinction

Microtasks are processed before the next task is taken from the task queue. The browser also has rendering steps that are coordinated with the event loop.

### Interview takeaway

The event loop allows JavaScript to handle asynchronous operations without blocking the main execution thread while coordinating when callbacks execute.

---

## 6. setTimeout Behaviour

`setTimeout()` schedules a callback to execute after a specified delay.

However, the delay is not a guarantee that the callback will execute at that exact time.

### Example 1: Zero delay

```javascript
console.log("Start");

setTimeout(() => {
    console.log("Timer");
}, 0);

console.log("End");
```

Output:

```text
Start
End
Timer
```

Even with a delay of zero milliseconds, the callback does not execute immediately.

It is scheduled as a task and waits until synchronous execution and pending microtasks are completed.

### Example 2: Blocking the main thread

```javascript
console.log("Start");

setTimeout(() => {
    console.log("Timer");
}, 2000);

const start = Date.now();

while (Date.now() - start < 5000) {
    // Blocking the main thread
}

console.log("End");
```

Output:

```text
Start
End
Timer
```

### Why?

1. The timer is scheduled with a 2-second delay.
2. The `while` loop blocks the main thread for approximately 5 seconds.
3. The timer expires after approximately 2 seconds.
4. However, its callback cannot execute because the main thread is blocked.
5. The loop finishes and `End` is printed.
6. Once execution is available, the timer callback executes.

### Interview takeaway

`setTimeout()` specifies a minimum delay, not an exact execution time. A blocked call stack or other event-loop work can delay its callback.

---

## 7. Higher-Order Functions

A **Higher-Order Function (HOF)** is a function that:

1. Accepts another function as an argument, or
2. Returns another function.

### Example 1: Accepting a function as an argument

```javascript
function calculate(operation, a, b) {
    return operation(a, b);
}

function add(x, y) {
    return x + y;
}

console.log(calculate(add, 10, 20)); // 30
```

Here:

- `calculate` is a Higher-Order Function because it accepts another function.
- `add` is the callback function passed to `calculate`.

### Example 2: Returning a function

```javascript
function multiplyBy(multiplier) {
    return function (number) {
        return number * multiplier;
    };
}

const double = multiplyBy(2);

console.log(double(5)); // 10
console.log(double(10)); // 20
```

Here, `multiplyBy` returns another function, making it a Higher-Order Function.

### Common built-in Higher-Order Functions

JavaScript array methods such as:

- `map()`
- `filter()`
- `reduce()`
- `forEach()`

These methods accept callback functions.

### Interview takeaway

A Higher-Order Function either accepts another function as an argument or returns a function.

---

## 8. Functional Programming

Functional Programming is a programming paradigm that emphasizes using functions to build predictable and reusable logic.

JavaScript supports functional programming along with other programming paradigms.

### Important principles

**1. Pure Functions**

A pure function:

- Produces the same output for the same input.
- Does not cause side effects.

Example:

```javascript
function add(a, b) {
    return a + b;
}

console.log(add(10, 20)); // 30
console.log(add(10, 20)); // 30
```

The function always produces the same result for the same inputs.

**2. Immutability**

Immutability means avoiding modifications to existing data and instead creating new values.

Example:

```javascript
const prices = [100, 200, 300];

const discountedPrices = prices.map(price => price * 0.9);

console.log(prices);
// [100, 200, 300]

console.log(discountedPrices);
// [90, 180, 270]
```

The original array remains unchanged. `map()` returns a new array.

**3. Higher-Order Functions**

Functions can accept other functions as arguments or return functions.

Example:

```javascript
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(number => number * 2);

console.log(doubled);
// [2, 4, 6, 8, 10]
```

**4. Function Composition**

Function composition means combining smaller functions to create more complex operations.

Example:

```javascript
const double = number => number * 2;

const addTen = number => number + 10;

const result = addTen(double(5));

console.log(result); // 20
```

### Interview takeaway

Functional programming emphasizes pure functions, immutability, function composition, and higher-order functions to create predictable and reusable code.

JavaScript supports these principles but does not enforce them.

---

## Quick Interview Revision

| Concept | Key point |
|---|---|
| First-Class Functions | Functions are treated as values. |
| Callback Functions | Functions passed as arguments and invoked by another function. |
| Event Listeners | Browser invokes registered callbacks when events occur. |
| JavaScript Engine | Parses, executes, and optimizes JavaScript code. |
| Event Loop | Coordinates synchronous and asynchronous execution. |
| Microtask Queue | Promise reactions, `queueMicrotask()`, MutationObserver. |
| Task Queue | Timer and browser event callbacks. |
| setTimeout | Minimum delay, not guaranteed execution time. |
| Higher-Order Functions | Accept or return other functions. |
| Functional Programming | Pure functions, immutability, composition. |

## Key Differences to Remember

| Concept A | Concept B | Difference |
|---|---|---|
| First-Class Function | Higher-Order Function | First-class describes how functions are treated; higher-order describes functions that accept or return functions. |
| Callback | Higher-Order Function | Callback is the passed function; HOF is the function accepting or returning it. |
| Microtask | Task | Microtasks are processed before the next task. |
| `setTimeout(fn, 0)` | Immediate execution | A zero-delay timer still waits for event-loop scheduling. |
| Pure Function | Impure Function | Pure functions avoid side effects and return consistent results for the same inputs. |

---

**End of document**