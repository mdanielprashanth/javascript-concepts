# How JavaScript Works

## 1. JavaScript Is a Synchronous, Single-Threaded Language

JavaScript is commonly described as a **synchronous, single-threaded language**.

- **Single-threaded:** JavaScript executes one piece of JavaScript code at a time on its main execution thread.
- **Synchronous:** Code is executed one statement at a time, in the order it is encountered, unless asynchronous mechanisms are involved.

## 2. Execution Context

An **Execution Context** is the environment in which JavaScript code is evaluated and executed.

Whenever JavaScript runs, it creates an Execution Context.

The Global Execution Context (GEC) is created first when a JavaScript program starts.

An Execution Context can be understood using two main components:

1. **Memory Component (Variable Environment):** Stores variables and function declarations.
2. **Code Component (Thread of Execution):** Executes JavaScript code one statement at a time.

## 3. Phases of Execution Context

An Execution Context is created and executed in two phases.

### A. Memory Creation Phase

During this phase, JavaScript allocates memory for variables and functions.

For example:

```javascript
var name = "Daniel";

function greet() {
    var message = "Hello";
    console.log(message, name);
}

greet();
```

During the Global Execution Context's memory creation phase:

| Identifier | Initial value |
|---|---|
| `name` | `undefined` |
| `greet` | Function definition |

Variables declared using `var` are initially assigned `undefined`, while function declarations are available with their function definition.

### B. Code Execution Phase

During this phase, JavaScript executes the code line by line and assigns actual values.

For the previous example:

1. `name` is assigned `"Daniel"`.
2. `greet()` is invoked.
3. A new Function Execution Context is created for `greet`.
4. The function executes its statements.
5. `message` is assigned `"Hello"`.
6. `console.log()` prints `Hello Daniel`.
7. The function returns, and its Function Execution Context is removed from the Call Stack.

## 4. Function Execution Context

Whenever a function is invoked, JavaScript creates a new Function Execution Context.

Consider:

```javascript
var a = 10;

function multiply(x) {
    var result = x * 2;
    return result;
}

var output = multiply(a);

console.log(output);
```

### Global Execution Context

During the creation phase:

| Identifier | Initial value |
|---|---|
| `a` | `undefined` |
| `multiply` | Function definition |
| `output` | `undefined` |

During execution:

- `a` is assigned `10`.
- `multiply(a)` is invoked.
- A Function Execution Context is created.

### Function Execution Context

Inside `multiply`:

| Identifier | Value |
|---|---|
| `x` | `10` |
| `result` | Initially `undefined`, then `20` |

The function returns `20`, and its Execution Context is removed from the Call Stack.

Back in the Global Execution Context:

- `output` receives `20`.
- `console.log(output)` prints `20`.

**Output:**

```text
20
```

## 5. Call Stack

The **Call Stack** is a mechanism JavaScript uses to keep track of Execution Contexts.

It follows the LIFO principle:

**Last In, First Out**

- When an Execution Context is created, it is pushed onto the Call Stack.
- When execution of that context is complete, it is popped from the Call Stack.
- The currently executing context is at the top of the stack.

### Example

```javascript
function first() {
    second();
}

function second() {
    console.log("Inside second");
}

first();
```

The execution flow:

1. Global Execution Context is pushed.
2. `first()` is invoked, so its Function Execution Context is pushed.
3. `second()` is invoked, so its Function Execution Context is pushed.
4. `second()` completes and is popped.
5. `first()` completes and is popped.
6. The Global Execution Context remains until the program finishes.

### Call Stack Representation

```text
        ┌──────────────────┐
        │ second()         │  ← Top
        ├──────────────────┤
        │ first()          │
        ├──────────────────┤
        │ Global Context   │
        └──────────────────┘
```

After `second()` completes, its context is removed. The same happens when `first()` completes.

## 6. Key Takeaways

- JavaScript executes code using Execution Contexts.
- The Global Execution Context is created first.
- An Execution Context has a Memory Component and a Code Component in the simplified teaching model.
- Execution Context creation involves a Memory Creation Phase followed by a Code Execution Phase.
- Every function invocation creates a new Function Execution Context.
- The Call Stack manages the order in which Execution Contexts execute.
- The Call Stack follows LIFO (Last In, First Out).

---

*More concepts will be added as we explore how JavaScript works internally.*