# JavaScript `this` Keyword

The JavaScript `this` keyword refers to the context in which a function is executed.

Its value depends on how a function is called, except for arrow functions, which inherit `this` from their enclosing lexical scope.

## 1. `this` in Global Space

### Browser

In a browser's classic global script, `this` refers to the global `window` object.

```javascript
console.log(this);        // Window object
console.log(this === window); // true
```

### Node.js

In a Node.js CommonJS module, top-level `this` refers to `module.exports`, which is initially an empty object.

```javascript
console.log(this);                    // {}
console.log(this === module.exports); // true
console.log(this === global);         // false
console.log(globalThis === global);   // true
```

In a Node.js ES module, top-level `this` is `undefined`.

**Important:** Top-level `this` behaves differently depending on the JavaScript environment and module system.

## 2. `this` Inside a Regular Function

The value of `this` depends on how the function is invoked.

```javascript
function display() {
    console.log(this);
}

display();
```

In a Node.js CommonJS module:

- Without strict mode, `this` refers to the Node.js global object (`global`).
- With strict mode, `this` is `undefined`.

## 3. Strict Mode and This Substitution

In non-strict mode, when a regular function is called without an explicit `this` value, JavaScript substitutes the global object for `this`.

In strict mode, this substitution does not happen.

```javascript
function display() {
    console.log(this);
}

display();
```

| Mode | Value of `this` in Node.js CommonJS |
|---|---|
| Non-strict | `global` |
| Strict | `undefined` |

**Important:** Strict mode does not change top-level `this` in a CommonJS module. It changes how `this` behaves inside regular function calls.

## 4. `this` Depends on How a Function Is Called

The same function can have different `this` values depending on how it is invoked.

### Standalone function call

```javascript
function display() {
    console.log(this);
}

display();
```

In a Node.js CommonJS module:

- Non-strict mode: `global`
- Strict mode: `undefined`

### Object method call

```javascript
const employee = {
    name: "Daniel",
    display: function () {
        console.log(this.name);
    }
};

employee.display(); // Daniel
```

When a regular function is invoked as `employee.display()`, `this` refers to `employee`.

### Extracting a method

```javascript
const anotherEmployee = employee.display;

anotherEmployee();
```

The extracted function no longer has the employee object as its `this` context.

- Non-strict mode: `this` refers to `global`; `this.name` is normally `undefined`.
- Strict mode: `this` is `undefined`; accessing `this.name` throws a `TypeError`.

## 5. `this` Inside an Object Method

When a regular function is called as an object method, `this` refers to the object used to invoke it.

```javascript
const employee = {
    name: "Daniel",
    role: "Senior Software Engineer",

    display: function () {
        console.log(this.name);
        console.log(this.role);
    }
};

employee.display();
```

Output:

```text
Daniel
Senior Software Engineer
```

This behaviour is called **implicit binding**.

## 6. call(), apply() and bind()

These methods allow us to explicitly control the `this` context of regular functions.

### call()

Invokes a function immediately, passing arguments individually.

```javascript
function display() {
    console.log(this.name);
}

const employee = { name: "Daniel" };

display.call(employee); // Daniel
```

### apply()

Invokes a function immediately, passing arguments as an array.

```javascript
function introduce(role, company) {
    console.log(`${this.name} works as ${role} at ${company}`);
}

const employee = { name: "Daniel" };

introduce.apply(employee, ["Developer", "Altimetrik"]);
```

### bind()

Returns a new function with the specified `this` context. It does not execute the function immediately.

```javascript
function display() {
    console.log(this.name);
}

const employee = { name: "Daniel" };

const boundFunction = display.bind(employee);

boundFunction(); // Daniel
```

### Method sharing

We can borrow a method from one object and execute it using another object's context.

```javascript
function display() {
    console.log(this.name);
}

const employee1 = {
    name: "Daniel",
    display
};

const employee2 = {
    name: "Bruce",
    display
};

employee1.display.call(employee2); // Bruce
```

This is called **explicit binding**.

## 7. `this` Inside Arrow Functions

Arrow functions do not have their own `this`.

They inherit `this` from their enclosing lexical scope.

```javascript
const employee = {
    name: "Daniel",

    display: () => {
        console.log(this);
    }
};

employee.display();
```

In a Node.js CommonJS module, the arrow function inherits the top-level `this`, which refers to `module.exports`.

It does not automatically refer to the `employee` object.

**Important:** `call()`, `apply()` and `bind()` cannot change the `this` value of an arrow function.

## 8. `this` Inside Nested Functions

### Nested regular function

A regular function nested inside an object method does not automatically inherit the outer function's `this`.

```javascript
const employee = {
    name: "Daniel",

    display: function () {
        function regularFunction() {
            console.log(this.name);
        }

        regularFunction();
    }
};

employee.display();
```

In a Node.js CommonJS module without strict mode, the output is normally:

```text
undefined
```

The nested regular function has its own `this`, determined by how it is called.

We can explicitly provide the context:

```javascript
regularFunction.call(employee);
```

### Nested arrow function

An arrow function inherits `this` from its enclosing lexical scope.

```javascript
const employee = {
    name: "Daniel",

    display: function () {
        const arrowFunction = () => {
            console.log(this.name);
        };

        arrowFunction();
    }
};

employee.display(); // Daniel
```

Here:

1. `employee.display()` establishes `this` as `employee`.
2. The arrow function inherits `this` from `display()`.
3. `this.name` therefore prints `Daniel`.

## 9. `this` Inside DOM Event Handlers

In browser JavaScript, when a regular function is used as an event handler, `this` refers to the element on which the event listener is registered.

### Inline event handler

```html
<button onclick="display()">Click me</button>

<script>
    function display() {
        console.log(this);
        console.log(this.tagName);
    }
</script>
```

Clicking the button prints the button element and:

```text
BUTTON
```

### addEventListener with a regular function

```javascript
button.addEventListener("click", function (event) {
    console.log(this);
    console.log(this === event.currentTarget);
});
```

Output:

```text
true
```

### addEventListener with an arrow function

```javascript
button.addEventListener("click", () => {
    console.log(this);
});
```

The arrow function inherits `this` from its enclosing lexical scope. It does not automatically refer to the button element.

### event.target vs event.currentTarget

- `event.target`: The element that originally triggered the event.
- `event.currentTarget`: The element whose event listener is currently executing.
- In a regular event-handler function, `this` generally refers to `event.currentTarget`.

## Summary: How `this` Is Determined

| Scenario | How `this` is determined |
|---|---|
| Browser classic global script | `window` |
| Node.js CommonJS top-level | `module.exports` |
| Standalone regular function, non-strict | Global object |
| Standalone regular function, strict | `undefined` |
| Regular object method | Calling object |
| `call()` / `apply()` | Explicitly supplied context |
| `bind()` | Context supplied when binding |
| Arrow function | Enclosing lexical scope |
| Nested regular function | Its own invocation |
| Nested arrow function | Enclosing lexical scope |
| DOM regular event handler | Event listener element |

## Key Takeaways

1. For regular functions, `this` depends on how the function is called.
2. In non-strict mode, a standalone regular function call substitutes the global object for `this`.
3. In strict mode, a standalone regular function call has `this` as `undefined`.
4. Object method calls use implicit binding.
5. `call()`, `apply()` and `bind()` provide explicit binding for regular functions.
6. Arrow functions do not have their own `this`; they inherit it lexically.
7. Nested regular functions do not automatically inherit their parent's `this`.
8. Nested arrow functions inherit `this` from their enclosing scope.
9. In DOM event handlers, regular functions and arrow functions have different `this` behaviour.