---
title: "Understanding Closures & Scope"
author: "Dhymas Julyan Riyanto"
date: 2026-07-31T10:00:00Z
draft: true
tags: ["javascript", "scope", "closures", "advanced"]
categories: ["Javascript"]
---

If you've ever prepped for a front-end interview, you already know the dreaded question: *"Can you explain what a closure is?"* :v

For the longest time, textbook definitions made my head spin. *"A closure is the combination of a function bundled together with references to its surrounding lexical state."* ...Yeah, thanks for clearing that up! Wkwk...

Let's strip away the academic jargon and look at what actually happens.

---

## The Backpack Analogy

Think of a function in JavaScript like a traveler going on a road trip.

Normally, when a function finishes running, all its local variables get thrown into the garbage collector and vanish forever. 

**Except** when that function returns an *inner* function. 

When an inner function is born, JavaScript packs a tiny "backpack" containing all the variables from the outer parent scope. Wherever that inner function travels in your codebase, it keeps that backpack strapped to its back!

That persistent backpack is what we call a **Closure**.

---

## Seeing It in Action

Here is the classic counter example:

```javascript
function createCounter() {
    let count = 0; // Lives inside parent scope

    return function() {
        count += 1;
        return count;
    };
}

const myCounter = createCounter();

console.log(myCounter()); // 1
console.log(myCounter()); // 2
console.log(myCounter()); // 3
```

Notice what happened here? `createCounter()` finished executing long ago! 

Yet, `myCounter` still remembers `count` and keeps modifying it. The variable `count` is completely private — outside code cannot touch it directly or overwrite it.

---

## Real World Use: Data Privacy (Factory Functions)

Before modern private class fields existed, closures were the standard way to build private variables in JavaScript:

```javascript
function createBankAccount(initialBalance) {
    let balance = initialBalance; // Private variable

    return {
        deposit(amount) {
            balance += amount;
            console.log(`Deposited ${amount}. New balance: ${balance}`);
        },
        getBalance() {
            return balance;
        }
    };
}

const account = createBankAccount(100);
account.deposit(50); // Balance: 150
console.log(account.balance); // undefined! Cannot tamper from outside :')
```

---

## Watch Out for Memory Leaks

Because closures retain references to their outer variables, those variables cannot be garbage collected as long as the inner function is alive. 

If you store huge arrays or DOM elements inside a closure that never gets cleaned up, you might accidentally leave memory leaks behind.

---

Once you picture that backpack of outer variables, closures stop feeling like black magic.

Did closures ever confuse you when starting out, or did they click right away? Drop your take in the comments below!

Until the next log... happy tinkering! :)
