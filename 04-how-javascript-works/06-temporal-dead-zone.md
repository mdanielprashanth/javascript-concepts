# Temporal Dead Zone (TDZ)

The Temporal Dead Zone is the period between entering a variable's scope and the point where its `let` or `const` declaration is initialized.

Accessing the variable during this period results in a `ReferenceError`.

## 1. Example with let

```javascript
console.log(name);

let name = "Daniel";
```

**Output:**
```text
ReferenceError: Cannot access 'name' before initialization
```

## 2. Example with const

```javascript
console.log(age);

const age = 30;
```

**Output:**
```text
ReferenceError: Cannot access 'age' before initialization
```

## 3. TDZ with Block Scope

```javascript
{
    console.log(name);

    let name = "Daniel";
}
```

The TDZ begins when execution enters the block and ends when the `let` declaration is initialized.

## Key Takeaways

- `let` and `const` declarations are hoisted.
- They are not initialized with `undefined`.
- Accessing them before initialization causes a `ReferenceError`.
- The TDZ exists from entering the variable's scope until its declaration is initialized.
- `var` does not have a Temporal Dead Zone.