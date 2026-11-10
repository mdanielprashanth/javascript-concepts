# Closures in JavaScript

## 1. What Is a Closure?

A closure is the combination of a function and its surrounding lexical environment.

It allows an inner function to retain access to variables from its outer scope even after the outer function has finished executing.

### Example

```javascript
function outer() {
    let count = 10;

    function inner() {
        console.log(count);
    }

    return inner;
}

const myFunction = outer();

myFunction(); // 10
```

**How it works:**

- `outer()` creates the variable `count` and the function `inner`.
- `outer()` returns `inner`.
- Its execution context finishes.
- However, `inner` retains access to the lexical environment containing `count`.
- Calling `myFunction()` prints `10`.

## 2. Closures and Persistent State

Closures retain access to variable bindings, not just snapshots of their initial values.

### Example

```javascript
function counter() {
    let count = 0;

    return function increment() {
        count++;
        console.log(count);
    };
}

const incrementCounter = counter();

incrementCounter(); // 1
incrementCounter(); // 2
incrementCounter(); // 3
```

The `count` variable is not recreated on every invocation of `incrementCounter()`.

The inner function retains access to the same variable binding, allowing its value to persist and change.

## 3. Multiple Closures and Independent State

Multiple inner functions created during the same outer function invocation can share the same lexical environment.

However, separate invocations of the outer function create independent lexical environments.

### Example

```javascript
function counter() {
    let count = 0;

    return {
        increment: function () {
            count++;
            console.log(count);
        },

        decrement: function () {
            count--;
            console.log(count);
        }
    };
}

const counter1 = counter();
const counter2 = counter();

counter1.increment(); // 1
counter1.increment(); // 2
counter1.decrement(); // 1

counter2.increment(); // 1
```

**Key points:**

- `increment` and `decrement` from `counter1` share the same `count`.
- `counter2` has its own independent `count`.
- Each invocation of `counter()` creates a separate lexical environment.

## 4. Closures and Function References

Assigning a function reference to another variable does not create a new closure.

### Example

```javascript
function createCounter() {
    let count = 0;

    return function () {
        count++;
        return count;
    };
}

const first = createCounter();
const second = first;

const third = createCounter();

console.log(first());  // 1
console.log(second()); // 2
console.log(third()); // 1
console.log(first());  // 3
console.log(third()); // 2
```

**Explanation:**

- `first` and `second` reference the same function and closure.
- `third` comes from a separate invocation of `createCounter()`.
- Therefore, `first` and `second` share state, while `third` maintains independent state.

## 5. Closures in Loops: var vs let

A common JavaScript interview question involves closures inside loops.

### Using var

```javascript
function createFunctions() {
    var functions = [];

    for (var i = 0; i < 3; i++) {
        functions.push(function () {
            console.log(i);
        });
    }

    return functions;
}

const result = createFunctions();

result[0](); // 3
result[1](); // 3
result[2](); // 3
```

**Why?**

- `var` is function-scoped.
- Only one `i` binding is created.
- All three functions close over the same `i`.
- After the loop finishes, `i` is `3`.

### Using let

```javascript
function createFunctions() {
    var functions = [];

    for (let i = 0; i < 3; i++) {
        functions.push(function () {
            console.log(i);
        });
    }

    return functions;
}

const result = createFunctions();

result[0](); // 0
result[1](); // 1
result[2](); // 2
```

**Why?**

- `let` is block-scoped.
- JavaScript creates a separate per-iteration binding for `i`.
- Each function retains access to its respective iteration's binding.

## 6. Fixing the var Loop Problem Using IIFE

An IIFE (Immediately Invoked Function Expression) can create a separate function scope for each iteration.

```javascript
function createFunctions() {
    var functions = [];

    for (var i = 0; i < 3; i++) {
        (function (i) {
            functions.push(function () {
                console.log(i);
            });
        })(i);
    }

    return functions;
}

const result = createFunctions();

result[0](); // 0
result[1](); // 1
result[2](); // 2
```

**Explanation:**

- The IIFE executes immediately during each iteration.
- Each invocation receives the current value of `i`.
- Every invocation creates a new execution context and parameter binding.
- The inner function retains access to that binding through its closure.

## 7. Data Privacy Using Closures

Closures can be used to implement data encapsulation by keeping variables private and exposing controlled access through returned methods.

### Example

```javascript
function bankAccount(initialBalance) {
    let balance = initialBalance;

    return {
        deposit: function (amount) {
            balance += amount;
            console.log("Balance:", balance);
        },

        withdraw: function (amount) {
            balance -= amount;
            console.log("Balance:", balance);
        }
    };
}

const account = bankAccount(1000);

account.deposit(500);  // Balance: 1500
account.withdraw(200); // Balance: 1300

console.log(account.balance); // undefined
```

**Explanation:**

- `balance` is a private variable inside `bankAccount()`.
- `deposit()` and `withdraw()` retain access to it through closures.
- The returned object exposes only the methods.
- External code cannot directly access the original `balance` variable.

## Key Takeaways

- A closure is a function combined with its surrounding lexical environment.
- Inner functions retain access to outer variables even after the outer function finishes executing.
- Closures retain access to variable bindings, not merely initial values.
- Multiple closures from the same invocation can share variables.
- Separate outer function invocations create independent lexical environments.
- Assigning a function reference does not create a new closure.
- `let` creates per-iteration bindings in loops, unlike `var`.
- IIFEs can create independent scopes to solve closure-related loop problems.
- Closures are useful for maintaining private state and implementing data encapsulation.