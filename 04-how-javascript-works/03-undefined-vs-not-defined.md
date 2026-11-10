# Undefined vs Not Defined

## 1. Undefined

`undefined` means a variable has been declared but has not yet been assigned a value.

```javascript
var name;

console.log(name);
```

**Output:**
```text
undefined
```

## 2. Not Defined

A variable is not defined when no declaration for that identifier exists in the accessible scope chain.

```javascript
console.log(age);
```

**Output:**
```text
ReferenceError: age is not defined
```

## 3. Function Scope Example

Variables declared inside a function are not accessible outside that function.

```javascript
function display() {
    var role = "Developer";
}

console.log(role);
```

**Output:**
```text
ReferenceError: role is not defined
```

## Key Differences

| Undefined | Not Defined |
|---|---|
| Variable is declared but has no assigned value. | No accessible declaration exists. |
| Reading it returns `undefined`. | Reading it throws a `ReferenceError`. |
| Example: `var age;` | Example: `console.log(age);` when never declared. |

## Key Takeaway

`undefined` is a JavaScript value, whereas `not defined` refers to an identifier that cannot be found in the accessible scope chain.