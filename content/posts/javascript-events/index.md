---
title: "JavaScript Event Listeners in Action"
author: "Dhymas Julyan Riyanto"
date: 2026-04-21T09:11:28Z
draft: true
tags: ["javascript", "events", "dom", "frontend"]
categories: ["Javascript"]
---

Alright, following up on our previous note about DOM and BOM... 

So we already know how to select an element and swap its text. Cool. But a webpage where nothing reacts when you click or scroll? Kinda lifeless, isn't it? :v

To actually make elements respond when users interact with the page, we need **Event Listeners**.

---

## Wait, what is an event anyway?

An "event" is basically anything that happens inside the browser. 

A user clicking a button? That's an event. 
Someone pressing a key on their keyboard? An event. 
Scrolling down the page? Resizing the browser window? Submitting a form? 

All of those are events. 

By default, the browser notices these actions, but it won't do anything special unless we explicitly tell it: *"Hey, keep an ear out for this specific action, and run this code when it happens."*

That "ear" is what we call an event listener.

---

## Meet `addEventListener()`

The most common (and cleanest) way to listen to events in modern JavaScript is using `addEventListener()`. 

The syntax looks like this:

```javascript
element.addEventListener(eventType, callbackFunction);
```

Simple, right? We just need two main ingredients:
1. What kind of event we're waiting for (like `'click'`, `'keydown'`, etc.).
2. What function should run once that event actually happens.

Let's try a quick example. Say we have a button and a simple text element:

```javascript
// 1. Grab the elements first
const actionBtn = document.querySelector("#action-btn");
const statusText = document.querySelector("#status-text");

// 2. Attach our listener
actionBtn.addEventListener("click", () => {
    statusText.innerText = "Button clicked! System is alive :')";
    statusText.style.color = "seagreen";
});
```

Now, whenever someone clicks `#action-btn`, the callback function fires immediately, updates the text, and turns it green. Done! Hehe...

---

## Wait, what's inside that `(e)` parameter?

Whenever an event triggers, the browser doesn't just run your function blindly... It actually hands you a package of useful details about what just happened. 

We usually catch it by adding `e` (or `event`) into our callback:

```javascript
const box = document.querySelector(".interactive-box");

box.addEventListener("mousemove", (e) => {
    // See where the cursor is right now!
    console.log(`Cursor coordinates: X = ${e.clientX}, Y = ${e.clientY}`);
});
```

A few properties you'll probably reach for all the time:

- `e.target` : Points to the exact element that triggered the event (super useful when handling dynamic lists).
- `e.type` : Tells you the event name (e.g. `'click'`, `'submit'`).
- `e.key` : Tells you which key got pressed when working with keyboard events.

---

## `e.preventDefault()` ... Stop right there!

Some elements in HTML have built-in default habits. 

For instance:
- When someone clicks a link (`<a>`), the browser immediately jumps to that URL.
- When someone submits a `<form>`, the browser reloads the entire page.

Back in the day, that was fine. But in modern web apps, reloading the whole page just to submit a form feels clumsy and slow. 

That's where `e.preventDefault()` comes in handy:

```javascript
const loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit", (e) => {
    // Don't reload the page, please!
    e.preventDefault();

    const username = document.querySelector("#username-input").value;
    console.log(`Logging in user: ${username}...`);
    // Send data via fetch() or do your magic here
});
```

With `e.preventDefault()`, the browser stops its default reload behavior, and lets our JavaScript handle everything smoothly in the background.

---

## Events you'll probably use everyday

You don't need to memorize every single event out there (there are tons!), but here are the ones you'll end up using 90% of the time:

- **Mouse**: `'click'`, `'dblclick'`, `'mouseenter'`, `'mouseleave'`
- **Keyboard**: `'keydown'`, `'keyup'` (useful for detecting `Enter`, `Escape`, etc.)
- **Forms**: `'submit'`, `'input'` (fires on every keystroke), `'change'` (great for dropdowns and checkboxes)
- **Window**: `'scroll'`, `'resize'`, `'DOMContentLoaded'` (fires when HTML finishes parsing)

For example, closing a modal dialog when the user hits the `Escape` key:

```javascript
window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        console.log("Escape pressed. Closing popup modal...");
    }
});
```

---

And that's pretty much the foundation of event listeners. Once you get the hang of `addEventListener` and how to inspect the `(e)` object, building interactive widgets suddenly feels way less intimidating.

Got any questions or spotted a silly typo? Drop it in the comments below!

Catch you in the next one, hehe... :')
