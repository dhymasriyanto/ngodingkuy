---
title: "Demystifying the 'this' Keyword"
author: "Dhymas Julyan Riyanto"
date: 2026-08-09T14:15:00Z
draft: true
tags: ["javascript", "this", "functions", "oop"]
categories: ["Javascript"]
---

Ah, `this` in JavaScript... the single keyword that has probably produced more confusion and stack overflow threads than anything else in the entire language. :')

In languages like Java or C#, `this` always points to the current class instance. 

In JavaScript? `this` doesn't care where a function was *declared* — it only cares about **how the function was called**.

Here is the field guide I wish someone had handed me years ago.

---

## The Golden Rule: Look to the Left of the Dot

When invoking a method:

```javascript
const user = {
    name: "Dhymas",
    greet() {
        console.log(`Hello, I am ${this.name}`);
    }
};

user.greet(); // "Hello, I am Dhymas"
```

Look at the call site: `user.greet()`. 
What is immediately to the left of the dot? `user`. 
Therefore, inside `greet`, `this === user`. Simple, right?

---

## Where Everything Falls Apart: Detached Callbacks

Now watch what happens when you pass that method as a callback:

```javascript
const detachedGreet = user.greet;
detachedGreet(); // "Hello, I am undefined" :v
```

Why did it break? 
Because there is no dot on the left! It's just a standalone function call, so `this` defaults to `window` (or `undefined` in strict mode).

This bites developers constantly when working with `setTimeout` or event listeners:

```javascript
setTimeout(user.greet, 1000); // Fails! this is no longer 'user'
```

---

## Taking Control: `bind()`, `call()`, and `apply()`

To manually force `this` to point to a specific object, JavaScript gives us three utility tools:

### 1. `bind()`: Creates a permanently bound function
```javascript
const safeGreet = user.greet.bind(user);
setTimeout(safeGreet, 1000); // "Hello, I am Dhymas" -> Works!
```

### 2. `call()` and `apply()`: Execute immediately with custom `this`
```javascript
function introduce(city, role) {
    console.log(`${this.name} lives in ${city} as a ${role}.`);
}

// call() takes comma-separated arguments
introduce.call(user, "Pekanbaru", "Engineer");

// apply() takes arguments as an array
introduce.apply(user, ["Pekanbaru", "Engineer"]);
```

---

## The Modern Savior: Arrow Functions

Arrow functions `() => {}` do **not** have their own `this`. 

Instead, they inherit `this` lexically from their surrounding parent scope:

```javascript
const counter = {
    count: 0,
    start() {
        // Arrow function retains 'this' from start()!
        setInterval(() => {
            this.count++;
            console.log(this.count);
        }, 1000);
    }
};
```

No `.bind(this)` required. Modern, clean, and intuitive.

---

Remember: check the left of the dot, or reach for arrow functions when writing callbacks.

Have you ever spent hours debugging a rogue `undefined` because of `this`? Share your battle stories below! Hehe...

Catch you on the next page! :)
