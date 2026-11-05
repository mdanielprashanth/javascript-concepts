# JavaScript Function Methods: call(), apply(), and bind()

JavaScript provides three important function methods that allow us to explicitly control the `this` context and pass arguments.

## 1. call()

`call()` invokes a function immediately with a specified `this` context.

**Syntax:**

```javascript
functionName.call(thisArg, arg1, arg2, ...);
```

**Example:**

```javascript
const employee = {
    name: "Daniel",
    role: "Senior Software Engineer"
};

function introduceEmployee(company) {
    return `${this.name} works as ${this.role} at ${company}`;
}

console.log(introduceEmployee.call(employee, "Altimetrik"));
```

**Output:**

```text
Daniel works as Senior Software Engineer at Altimetrik
```

Key points:
- Executes the function immediately.
- First argument specifies the `this` context.
- Remaining arguments are passed individually.
- Useful when invoking a function with a different object context.

## 2. apply()

`apply()` works similarly to `call()`, but accepts function arguments as an array or array-like object.

**Syntax:**

```javascript
functionName.apply(thisArg, [arg1, arg2, ...]);
```

**Example:**

```javascript
const employee = {
    name: "Daniel"
};

function calculateSalary(basicSalary, bonus, allowance) {
    return {
        employee: this.name,
        totalSalary: basicSalary + bonus + allowance
    };
}

const result = calculateSalary.apply(employee, [50000, 10000, 5000]);

console.log(result);
```

**Output:**

```text
{ employee: 'Daniel', totalSalary: 65000 }
```

### Practical example with Math.max()

```javascript
const numbers = [10, 25, 5, 80, 40];

console.log(Math.max.apply(null, numbers));
```

**Output:**

```text
80
```

`apply()` passes the array elements as individual arguments to `Math.max()`.

## 3. bind()

`bind()` returns a new function with a permanently bound `this` context.

Unlike `call()` and `apply()`, it does not execute the function immediately.

**Syntax:**

```javascript
const newFunction = functionName.bind(thisArg, arg1, arg2, ...);
```

**Example:**

```javascript
const employee = {
    name: "Daniel",
    role: "Senior Software Engineer"
};

function introduceEmployee(company) {
    console.log(`${this.name} works as ${this.role} at ${company}`);
}

const boundFunction = introduceEmployee.bind(employee, "Altimetrik");

boundFunction();
```

**Output:**

```text
Daniel works as Senior Software Engineer at Altimetrik
```

### Handling lost this context in callbacks

When an object method is passed as a callback, its original `this` context can be lost.

```javascript
const employee = {
    name: "Daniel",

    getDetails: function () {
        console.log(this.name);
    }
};

function executeCallback(callback) {
    callback();
}

// Context can be lost
executeCallback(employee.getDetails);

// Fix using bind()
const boundFunction = employee.getDetails.bind(employee);

executeCallback(boundFunction);
```

### Partial application using bind()

`bind()` can also pre-fill function arguments.

```javascript
function calculateProjectCost(developmentCost, testingCost, deploymentCost) {
    return developmentCost + testingCost + deploymentCost;
}

const projectResult = calculateProjectCost.bind(null, 50000, 15000);

console.log(projectResult(5000));
console.log(projectResult(10000));
```

**Output:**

```text
70000
75000
```

Here:
- `null` is the `thisArg`.
- `50000` is pre-filled as `developmentCost`.
- `15000` is pre-filled as `testingCost`.
- The remaining argument is supplied when the new function is called.

## 4. Comparison: call(), apply(), and bind()

| Feature | call() | apply() | bind() |
|---|---|---|---|
| Executes immediately | Yes | Yes | No |
| Returns | Function result | Function result | New function |
| Controls this | Yes | Yes | Yes |
| Argument format | Individual arguments | Array / array-like | Individual arguments |
| Partial application | No | No | Yes |

## 5. Important concepts and interview notes

- The first argument of all three methods is `thisArg`.
- A bound function's `this` cannot be overridden using another `call()`, `apply()`, or `bind()`.
- Arrow functions have lexical `this`; these methods cannot override it.
- `call()` and `apply()` can invoke the same function with different object contexts.
- Modern JavaScript supports the spread operator as an alternative to `apply()` when passing iterable arguments.

Example:

```javascript
const numbers = [10, 25, 5, 80, 40];

console.log(Math.max.apply(null, numbers));
console.log(Math.max(...numbers));
```

Both produce:

```text
80
```

## 6. When to use each method

- **call():** When you need immediate invocation and want to pass arguments individually.
- **apply():** When you need immediate invocation and already have arguments in an array or array-like structure.
- **bind():** When you need a new function with a fixed `this` context or pre-filled arguments, particularly for callbacks.

---

**Learning status:** Completed the fundamentals and practical exercises for `call()`, `apply()`, and `bind()`.