---
title: "Modern Lazy Loading with Intersection Observer"
author: "Dhymas Julyan Riyanto"
date: 2026-09-14T10:10:00Z
draft: true
tags: ["javascript", "web-api", "performance", "lazy-loading"]
categories: ["Javascript"]
---

Remember how we used to build lazy loading before 2019? 

We would attach an event listener to `window.addEventListener('scroll', ...)`, repeatedly call `element.getBoundingClientRect()`, and calculate offsets manually. 

Every single scroll event caused browser layout thrashing. It worked, but it felt clunky and consumed unnecessary battery on mobile devices. :')

Enter the **Intersection Observer API**.

---

## What Does It Do?

Instead of continuously polling scroll coordinates on the main thread, the browser itself asynchronously monitors when a target element enters or exits the visible screen viewport!

It notifies your code only when the intersection threshold is crossed. Completely offloaded, hardware-accelerated, zero stutter.

---

## Anatomy of an Observer

Setting one up requires three quick steps:

```javascript
// Step 1: Define what happens when visibility changes
const callback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            console.log("Element is visible on screen!", entry.target);

            // Step 2: Swap the real image src!
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add("loaded");

            // Step 3: Stop watching once loaded!
            observer.unobserve(img);
        }
    });
};

// Create the observer instance
const observer = new IntersectionObserver(callback, {
    root: null, // null = the browser viewport
    rootMargin: "0px 0px 200px 0px", // Trigger 200px BEFORE it enters viewport!
    threshold: 0.1 // Triggers when 10% is visible
});
```

Notice that `rootMargin` trick? By setting a 200px bottom margin, the images start loading slightly *before* the user scrolls to them, creating a completely seamless experience with zero visible placeholder pop-in!

---

## Step 4: Watch Your Elements

In your HTML:
```html
<img class="lazy-image" data-src="/images/photo-hd.jpg" src="/images/placeholder.jpg" alt="Photo">
```

In your script:
```javascript
const lazyImages = document.querySelectorAll(".lazy-image");

lazyImages.forEach(img => {
    observer.observe(img);
});
```

That's literally the entire implementation. When an image appears, it swaps the `src` and automatically unobserves itself.

---

## Other Great Use Cases

- **Infinite Scrolling**: Stick an invisible `<div id="sentinel"></div>` at the bottom of your post list. When the sentinel intersects, fetch the next 10 items.
- **Scroll Spy**: Automatically highlight active sidebar menu items based on which section header is currently on screen.
- **Animation on Scroll**: Add fade-in classes when cards slide into view.

---

Native, lightweight, and saves massive amounts of mobile data.

Are you already using Intersection Observer or still using third-party scroll libraries? Let's chat below!

Until the next note... keep exploring! :)
