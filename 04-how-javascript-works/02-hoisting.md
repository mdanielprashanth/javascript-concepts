# Hoisting in JavaScript

Hoisting is JavaScript's behaviour of processing variable and function declarations during the Execution Context creation phase before executing code.

## 1. Variable Hoisting (`var`)

Variables declared using `var` are initialized with `undefined` during the creation phase.

```javascript
console.log(a);

var a = 10;

console.log(a);
```

**Output:**
```text
undefined
10
```

## 2. Function Declaration Hoisting

Function declarations are hoisted with their complete function definition, allowing them to be called before their declaration.

```javascript
greet();

function greet() {
    console.log("Hello JavaScript");
}
```

**Output:**
```text
Hello JavaScript
```

## 3. Function Expression Hoisting

When a function is assigned to a `var` variable, only the variable declaration is hoisted. Its initial value is `undefined`.

```javascript
greet();

var greet = function () {
    console.log("Hello JavaScript");
};
```

**Output:**
```text
TypeError: greet is not a function
```

## Key Takeaways

- `var` declarations are hoisted and initialized with `undefined`.
- Function declarations are hoisted with their complete definitions.
- Function expressions follow the hoisting behaviour of their variable declarations.
- Hoisting does not physically move declarations to the top of the code.