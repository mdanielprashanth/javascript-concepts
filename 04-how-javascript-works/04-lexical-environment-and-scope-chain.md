# Lexical Environment and Scope Chain

## 1. Lexical Environment

A Lexical Environment consists of:
- An Environment Record containing variables and function declarations.
- A reference to its outer Lexical Environment.

JavaScript determines the scope of a function based on where it is written, not where it is called.

## 2. Scope Chain

When JavaScript cannot find a variable in the current scope, it searches the outer Lexical Environment until it finds the variable or reaches the global scope.

```javascript
var name = "Global";

function outer() {
    var name = "Outer";

    function inner() {
        var message = "Hello";

        console.log(name);
        console.log(message);
    }

    inner();
}

outer();
```

**Output:**
```text
Outer
Hello
```

`inner()` accesses:
- `message` from its own scope.
- `name` from its outer function's scope.

## 3. Scope Chain Lookup

If a variable is not found in the current scope, JavaScript searches outward.

```javascript
var name = "Global";

function outer() {
    function inner() {
        console.log(name);
    }

    inner();
}

outer();
```

**Output:**
```text
Global
```

JavaScript searches from `inner()` to `outer()` and then to the Global Environment.

## Key Takeaways

- Lexical scope is determined by where code is written.
- Inner functions can access variables from their outer scopes.
- Outer functions cannot access variables declared inside inner functions.
- Variable lookup follows the scope chain from inner to outer scope.
- If an identifier cannot be found in the scope chain, accessing it results in a `ReferenceError`.