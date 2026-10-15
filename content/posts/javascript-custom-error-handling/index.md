---
title: "Robust Error Handling & Custom Errors"
author: "Dhymas Julyan Riyanto"
date: 2026-08-27T11:45:00Z
draft: true
tags: ["javascript", "error-handling", "debugging", "clean-code"]
categories: ["Javascript"]
---

Let's be real for a second: writing code when everything goes right is easy. 

The real test of a web application is how gracefully it behaves when things inevitably go wrong. The network drops, an API returns invalid JSON, or a user uploads a corrupted file. :')

If your app just silently crashes or leaves a blank white screen, users leave. 

Here is how to structure robust error handling in modern JavaScript.

---

## 1. Beyond Primitive Strings: Always `throw new Error()`

Never throw plain strings like `throw "User not found";`. 

Always instantiate the built-in `Error` object:

```javascript
// BAD: Loses stack trace and line numbers!
throw "Invalid email";

// GOOD: Preserves file, line number, and full stack trace!
throw new Error("Invalid email format provided.");
```

An `Error` object captures a snapshot of the execution call stack at the exact moment it was instantiated (`error.stack`), making debugging tenfold easier in production logs.

---

## 2. Catching and Dissecting Errors

In your `try...catch` block, examine the error before deciding what to do:

```javascript
try {
    parseUserData(userInput);
} catch (err) {
    console.error("Name:", err.name);       // e.g. "TypeError"
    console.error("Message:", err.message); // e.g. "Cannot read properties of null"
    
    // Fallback UI or notification
    showToastNotification("Failed to load user. Please try again.");
}
```

---

## 3. Creating Custom Application Errors

When your app grows, generic `Error` instances aren't descriptive enough. You want to distinguish between a *Validation Error*, a *Database Error*, and an *Authentication Error*.

You can extend the native `Error` class:

```javascript
class ValidationError extends Error {
    constructor(field, message) {
        super(message);
        this.name = "ValidationError";
        this.field = field;
    }
}

class NotFoundError extends Error {
    constructor(resource) {
        super(`${resource} could not be found.`);
        this.name = "NotFoundError";
    }
}
```

Now you can handle specific errors gracefully with `instanceof`:

```javascript
try {
    saveProfile(formData);
} catch (err) {
    if (err instanceof ValidationError) {
        // Highlight the specific input field in red!
        highlightInputField(err.field, err.message);
    } else if (err instanceof NotFoundError) {
        render404Message();
    } else {
        // Unknown catastrophic error
        console.error("Unexpected crash:", err);
    }
}
```

Notice how targeted and clean that is? No guessing string contents.

---

## The Catch-All Safety Net: Global Listeners

For errors that slip past your local `try...catch` blocks, set up window-level safety guards:

```javascript
// Catches unhandled synchronous exceptions
window.addEventListener("error", (event) => {
    console.warn("Global error caught:", event.message);
});

// Catches unhandled rejected Promises (like failed fetch calls)
window.addEventListener("unhandledrejection", (event) => {
    console.warn("Unhandled Promise rejection:", event.reason);
});
```

---

Good error handling turns an annoying app crash into a helpful user message.

What's your strategy for logging frontend production errors? Sentry, custom webhooks, or console logs? Tell me below!

Until the next entry... write resilient code! :)
