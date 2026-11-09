"use strict";

console.log(this);
console.log(this === module.exports);
console.log(this === global);
console.log(globalThis === global);

function display() {
    console.log(this);
}

display();