---
title: "Event Optimization: Debounce vs Throttle"
author: "Dhymas Julyan Riyanto"
date: 2026-09-05T15:20:00Z
draft: true
tags: ["javascript", "performance", "events", "optimization"]
categories: ["Javascript"]
---

Ever hooked an event listener to a search input or a window scroll, and watched your browser tab turn into an airplane jet engine? :v

Events like `input`, `scroll`, and `mousemove` fire dozens of times per second. 

If every single keystroke triggers an expensive API request or complex DOM recalculation, your interface will lag and your server will hate you.

The remedy? **Debounce** and **Throttle**. 

Let's break down the difference with practical code you can drop into any project.

---

## Debounce: "Wait until the user pauses"

Think of an elevator door:
Every time someone walks in, the sensor resets the timer. The doors only close once *nobody* has stepped in for 3 straight seconds.

**Debounce** clusters a burst of events into a single execution once the activity calms down.

Perfect for: **Search autocomplete inputs**, auto-saving form drafts, window resize recalculations.

```javascript
function debounce(fn, delayMs = 300) {
    let timerId;

    return function(...args) {
        // Reset timer on every single trigger
        clearTimeout(timerId);

        timerId = setTimeout(() => {
            fn.apply(this, args);
        }, delayMs);
    };
}

// Example usage:
const searchInput = document.querySelector("#search-box");

function executeSearch(query) {
    console.log("Fetching search results for:", query);
}

// Will ONLY run 400ms after the user completely stops typing!
searchInput.addEventListener("input", debounce((e) => {
    executeSearch(e.target.value);
}, 400));
```

---

## Throttle: "Run at most once every X milliseconds"

Now imagine a machine gun with a fixed firing rate:
No matter how hard you mash the trigger, it will only release a shot once every 200ms.

**Throttle** guarantees that your function executes steadily at a regular, capped pace during continuous activity.

Perfect for: **Infinite scrolling triggers**, canvas drawing, tracking scroll position progress bars.

```javascript
function throttle(fn, limitMs = 200) {
    let inThrottle = false;

    return function(...args) {
        if (!inThrottle) {
            fn.apply(this, args);
            inThrottle = true;

            setTimeout(() => {
                inThrottle = false;
            }, limitMs);
        }
    };
}

// Example usage:
window.addEventListener("scroll", throttle(() => {
    console.log("Scroll position checked at smooth 60fps limit!");
}, 200));
```

---

## Quick Decision Rule

- User typing in an input? **Debounce** (wait for them to finish).
- User scrolling or resizing continuously? **Throttle** (sample the action at steady intervals).

---

No external libraries needed — just twenty lines of vanilla utility code that will drastically boost your UI performance.

Have you benchmarked debounce on your search bars before? Drop your findings in the comments!

Stay smooth, and see you on the next page! :)
