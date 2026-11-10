# Block Scope in JavaScript

Block scope means a variable is accessible only within the block `{}` in which it is declared.

`let` and `const` are block-scoped, whereas `var` is function-scoped.

## 1. var vs let vs const

```javascript
{
    var a = 10;
    let b = 20;
    const c = 30;
}

console.log(a);
console.log(b);
console.log(c);
```

**Output:**
```text
10
ReferenceError: b is not defined
```

The execution stops at `console.log(b)`, so `console.log(c)` is never executed.

## 2. var Inside a Function

Although `var` is not block-scoped, it is function-scoped.

```javascript
function display() {
    if (true) {
        var message = "Hello";
    }

    console.log(message);
}

display();
```

**Output:**
```text
Hello
```

The variable is accessible throughout the function, including outside the `if` block.

## Comparison

| Declaration | Scope |
|---|---|
| `var` | Function scope |
| `let` | Block scope |
| `const` | Block scope |

## Key Takeaways

- A block is defined using `{}`.
- `let` and `const` are accessible only within their enclosing block.
- `var` ignores block boundaries but respects function boundaries.
- Top-level `var` behaviour differs between browser scripts and JavaScript modules/Node.js environments.