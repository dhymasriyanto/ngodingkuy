---
title: "JavaScript Timers: setTimeout & setInterval"
author: "Dhymas Julyan Riyanto"
date: 2026-05-26T14:30:00Z
draft: true
tags: ["javascript", "async", "timers", "learn"]
categories: ["Javascript"]
---

Time in programming can be a sneaky beast. 

Sometimes you want a toast notification to fade out after 3 seconds, or maybe you want a live clock widget ticking every second. 

JavaScript gives us two built-in timer functions for this: `setTimeout` and `setInterval`. 

Let's look at how they work and the common traps to watch out for.

---

## 1. Run Once Later: `setTimeout`

`setTimeout` schedules a function to run **once** after a specified number of milliseconds (1 second = 1000 ms).

```javascript
console.log("Timer started...");

const timerId = setTimeout(() => {
    console.log("3 seconds passed! Action triggered.");
}, 3000);
```

If the user clicks away or navigates before the 3 seconds finish, you can cancel it with `clearTimeout`:

```javascript
// Cancel the scheduled execution!
clearTimeout(timerId);
```

---

## 2. Repeat Forever: `setInterval`

When you want an action to repeat continuously at fixed intervals, reach for `setInterval`:

```javascript
let counter = 1;

const intervalId = setInterval(() => {
    console.log(`Tick ${counter++}`);

    if (counter > 5) {
        clearInterval(intervalId); // Always clean up when done!
        console.log("Countdown finished!");
    }
}, 1000);
```

**Crucial rule**: Always hold onto your `intervalId` and call `clearInterval()`. If you lose the ID, that timer will run in the background until the tab is closed, quietly eating CPU cycles! :v

---

## The Big Myth: Timers Are NOT Guaranteed Exact

Here's something that surprises many developers: `setTimeout(fn, 1000)` does **not** guarantee your function executes at exactly 1000.00 milliseconds.

Why? 

Because JavaScript is single-threaded. Your timer only registers a callback into the **Event Loop task queue**. 

If the main thread is busy doing heavy calculations or rendering a complex canvas when 1000ms strikes, your timer callback has to politely wait its turn in line.

So think of the millisecond parameter as the **minimum delay**, not an exact atomic countdown.

---

## Recursive `setTimeout` vs `setInterval`

If you are fetching data periodically over the network, `setInterval` has a nasty habit of piling up requests if a server response takes longer than your interval time.

A much safer pattern is **recursive setTimeout**:

```javascript
function pollServer() {
    fetch("/api/status")
        .then(res => res.json())
        .then(data => {
            console.log("Server status:", data);
            // Only schedule the NEXT poll once the current one finishes!
            setTimeout(pollServer, 5000);
        });
}
```

This guarantees at least 5 seconds of breathing room between responses.

---

Keep those timer handles saved, cancel your intervals, and your apps will run butter-smooth.

Got any wild bugs caused by runaway intervals? Share your horror stories below! Hehe...

Until next time, keep coding! :)
