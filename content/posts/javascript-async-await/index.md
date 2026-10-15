---
title: "Cleaner Code with Async and Await"
author: "Dhymas Julyan Riyanto"
date: 2026-06-14T08:45:00Z
draft: true
tags: ["javascript", "async", "es8", "clean-code"]
categories: ["Javascript"]
---

Just when we thought Promises with `.then()` and `.catch()` were peak elegance, ES2017 dropped a game changer: **`async` and `await`**.

If you've ever looked at long Promise chains and wished you could just write asynchronous code that reads like everyday synchronous code... well, your wish was granted. :D

---

## The Magic Formula

Under the hood, `async / await` is just comfortable syntactic sugar built right on top of Promises. 

Two simple rules to remember:
1. Put `async` before a function declaration. That function will now automatically return a Promise.
2. Inside an `async` function, you can pause execution with `await` until a Promise settles!

Look at the contrast:

```javascript
// Old Promise style
function fetchProfile() {
    getUser()
        .then(user => getOrders(user.id))
        .then(orders => console.log(orders));
}

// Modern async/await style
async function fetchProfile() {
    const user = await getUser();
    const orders = await getOrders(user.id);
    console.log(orders);
}
```

Notice how clean that is? No nested callbacks, no chaining brackets. It reads straight down line by line.

---

## Error Handling: Good Old `try...catch`

How do we handle rejections? Instead of chaining `.catch()`, we just wrap our operations in standard JavaScript `try...catch` blocks:

```javascript
async function loadUserData(userId) {
    try {
        const response = await fetch(`/api/users/${userId}`);
        const data = await response.json();
        return data;
    } catch (err) {
        console.error("Failed to load user data:", err.message);
        // Handle fallback UI here
    }
}
```

Familiar, robust, and matches how you handle errors across the rest of the language.

---

## The Common Trap: Accidental Sequential Delays!

Here's an easy mistake to make when you get too excited with `await`:

```javascript
// BAD: These two requests do not depend on each other!
// They will run one after the other, doubling your wait time!
const posts = await fetchPosts();
const comments = await fetchComments();
```

If both requests are independent, don't make the second wait for the first! Run them in parallel using `Promise.all()`:

```javascript
// GOOD: Fire both simultaneously!
const [posts, comments] = await Promise.all([
    fetchPosts(),
    fetchComments()
]);
```

This cuts your waiting time in half. Always ask yourself: *"Does B actually need data from A before starting?"*

---

Mastering `async/await` was the turning point where asynchronous JavaScript truly became enjoyable for me.

Are you still using `.then()` chains or have you gone full `async/await`? Let me know in the comments!

Stay tuned for the next note, cheers! :)
