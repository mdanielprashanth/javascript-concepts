# Shadowing in JavaScript

## 1. What Is Shadowing?

Shadowing occurs when a variable declared in an inner scope has the same name as a variable in an outer scope.

Inside the inner scope, the inner variable takes precedence. The outer variable remains unchanged.

### Example

```javascript
let name = "Daniel";

{
    let name = "Bruce";
    console.log(name);
}

console.log(name);
```

**Output:**
```text
Bruce
Daniel
```

The inner `name` shadows the outer `name` inside the block. Once the block ends, the outer variable is accessible again.

## 2. Illegal Shadowing

Illegal shadowing occurs when a `var` declaration inside a block conflicts with a `let` or `const` declaration in the surrounding scope.

### Example

```javascript
let x = 10;

{
    var x = 20;
}
```

**Output:**
```text
SyntaxError: Identifier 'x' has already been declared
```

**Why?**

- `let` is block-scoped.
- `var` is not block-scoped; it belongs to the surrounding function or global scope.
- The `var x` declaration conflicts with the existing `let x` declaration.

## 3. Legal vs Illegal Shadowing

| Scenario | Result |
|---|---|
| `let` inside `let` (different scopes) | Legal |
| `const` inside `const` (different scopes) | Legal |
| `let` inside `var` (different scopes) | Legal |
| `var` inside outer `let` with the same name | Illegal |

## Key Takeaways

- Shadowing happens when an inner scope declares a variable with the same name as an outer variable.
- The inner variable takes precedence within its scope.
- Shadowing does not modify the outer variable.
- `let` and `const` can legally shadow variables in outer scopes.
- Be careful when using `var` because it is not block-scoped and can cause illegal shadowing.