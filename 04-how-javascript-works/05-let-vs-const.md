# let vs const in JavaScript

Both `let` and `const` are block-scoped declarations introduced in ES6 (ES2015).

## 1. let

- Can be reassigned.
- Cannot be redeclared in the same scope.
- Can be declared without initialization.

```javascript
let age = 30;

age = 31;

console.log(age);
```

**Output:**
```text
31
```

## 2. const

- Cannot be reassigned.
- Cannot be redeclared in the same scope.
- Must be initialized during declaration.

```javascript
const name = "Daniel";

name = "Bruce";
```

**Output:**
```text
TypeError: Assignment to constant variable.
```

## 3. const with Objects

`const` prevents reassignment of the variable binding, but does not make objects immutable.

```javascript
const employee = {
    name: "Daniel"
};

employee.name = "Bruce";

console.log(employee.name);
```

**Output:**
```text
Bruce
```

Reassigning the object itself is not allowed.

## Comparison

| Behaviour | let | const |
|---|---|---|
| Block scoped | Yes | Yes |
| Reassignment | Allowed | Not allowed |
| Redeclaration in same scope | Not allowed | Not allowed |
| Declaration without initialization | Allowed | Not allowed |
| Must initialize at declaration | No | Yes |

## Key Takeaways

- Use `let` when a variable needs reassignment.
- Use `const` when a variable binding should not be reassigned.
- `const` does not make objects or arrays immutable.
- Both declarations are hoisted but remain uninitialized until execution reaches their declarations.