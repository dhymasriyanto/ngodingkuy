---
title: "Event Delegation & Bubbling"
author: "Dhymas Julyan Riyanto"
date: 2026-05-08T11:20:00Z
draft: true
tags: ["javascript", "events", "performance", "dom"]
categories: ["Javascript"]
---

Here's a puzzle for you: what happens if you have a list of 500 items and each needs a delete button? 

Do you run a loop and attach 500 individual `addEventListener` calls to each button? 

Well... you *could*, but your browser's memory won't be too thrilled with you. :v 

There's a smarter, much more elegant trick: **Event Delegation**.

---

## How Events Travel: Bubbling Up

When you click an element nested deep inside the DOM, the event doesn't just stop there. 

It triggers on your target first, then travels all the way up through each parent element — up to the `<body>`, `<html>`, and finally `window`.

This phenomenon is called **Event Bubbling**.

Imagine dropping a pebble at the bottom of a pond. The splash happens at the bottom, but the ripples bubble all the way up to the surface.

---

## The Delegation Pattern

Because clicks bubble upward to their parents, we don't need 500 listeners. 

We only attach **one single listener** to the common parent wrapper, and inspect `e.target` to see which child actually got clicked!

Check this out:

```javascript
const parentList = document.querySelector("#todo-list");

parentList.addEventListener("click", (e) => {
    // Check if the clicked child is a delete button
    if (e.target.matches("button.btn-delete")) {
        // Grab the closest <li> ancestor and delete it
        const item = e.target.closest("li");
        item.remove();
        console.log("Deleted item via delegation!");
    }
});
```

Look at how clean that is.

---

## Why You Should Care

1. **Zero Memory Bloat**: One listener in memory instead of hundreds or thousands.
2. **Handles Dynamic Elements Automatically**: If you append a new `<li>` with a delete button tomorrow, it already works! You don't have to re-bind any listeners.

---

## Stopping the Ripple: `e.stopPropagation()`

Sometimes you have a nested modal or an inner dropdown where you *don't* want the parent container to hear the click. 

In those rare cases, you can stop the bubble from climbing further:

```javascript
modalContent.addEventListener("click", (e) => {
    e.stopPropagation(); // Parent backdrop won't receive this click!
});
```

Use it sparingly though, because stopping propagation everywhere can mess up analytics and delegation setups.

---

Delegation is easily one of my favorite DOM patterns. Saves memory, keeps code tidy, and works seamlessly with dynamic data.

Hope this clears up bubbling for anyone wrestling with dynamic lists!

Catch you around for the next chapter! :')
