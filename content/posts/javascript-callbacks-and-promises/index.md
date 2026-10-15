---
title: "Escaping Callback Hell with Promises"
author: "Dhymas Julyan Riyanto"
date: 2026-06-05T10:20:00Z
draft: true
tags: ["javascript", "async", "promises", "learn"]
categories: ["Javascript"]
---

Welcome back! Today we tackle a rite of passage for every JavaScript developer: the journey from tangled nested callbacks into the clean land of **Promises**. :')

JavaScript is non-blocking. When it requests data from a file or network, it doesn't freeze your screen while waiting. Instead, it says: *"I'll let you know when it's ready."*

How did we handle that back in the day? With callbacks. And oh boy, did things get out of hand quickly.

---

## The Nightmare: Callback Hell (Pyramid of Doom)

Imagine doing three asynchronous operations in sequence: loading a user profile, fetching their orders, and then downloading the invoice PDF.

With traditional callbacks, your code starts looking like an aggressive sideways triangle:

```javascript
getUser(userId, (user) => {
    getOrders(user.id, (orders) => {
        getInvoice(orders[0].id, (invoice) => {
            renderInvoice(invoice, () => {
                // We are trapped 5 levels deep in indentation! :v
                console.log("Done!");
            });
        });
    });
});
```

Hard to read, impossible to debug, and error handling for each step is pure suffering.

---

## The Solution: What is a Promise?

A **Promise** is literally an object representing the eventual completion (or failure) of an asynchronous task.

Think of it like ordering food at a fast-food counter:
1. You pay and receive a **buzzer** (the Promise).
2. While waiting, the Promise is **pending**.
3. When your meal is ready, the buzzer rings — your Promise is **fulfilled** (`resolved`).
4. If they ran out of burgers, you get an apology — the Promise is **rejected**.

---

## Creating a Promise

```javascript
const checkServerHealth = new Promise((resolve, reject) => {
    const isOnline = true;

    if (isOnline) {
        resolve("Server is running smoothly!");
    } else {
        reject(new Error("Server is unreachable."));
    }
});
```

---

## Consuming Promises: `.then()`, `.catch()`, `.finally()`

Instead of nesting functions inside arguments, we chain them cleanly in a flat sequence:

```javascript
getUser(userId)
    .then(user => getOrders(user.id))
    .then(orders => getInvoice(orders[0].id))
    .then(invoice => renderInvoice(invoice))
    .catch(err => {
        // One single error handler catches failures anywhere in the chain!
        console.error("Oops, something broke along the way:", err.message);
    })
    .finally(() => {
        console.log("All done, cleanup time.");
    });
```

Look at that. Linear, readable from top to bottom, and zero sideways pyramids.

---

Promises changed modern JavaScript forever. Once you wrap your head around chaining `.then()`, async code stops feeling like a minefield.

Have you ever had to maintain legacy callback hell? Tell me I'm not the only one traumatized by it! Wkwk...

See you on the next page! :)
