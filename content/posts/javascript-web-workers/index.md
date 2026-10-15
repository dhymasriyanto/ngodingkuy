---
title: "Multi-Threading with Web Workers"
author: "Dhymas Julyan Riyanto"
date: 2026-10-09T11:00:00Z
draft: true
tags: ["javascript", "web-workers", "threading", "performance"]
categories: ["Javascript"]
---

We've repeated it several times throughout these notes: JavaScript is single-threaded. 

Normally, that's fine. But what happens if you need to process a 50MB CSV file, apply image blur filters, or run heavy cryptographic hashing in the browser? 

If you run that loop on the main thread, the entire browser tab completely freezes. Buttons stop clicking, typing halts, and the dreaded *"Page Unresponsive"* popup appears. :')

The solution? Offload heavy calculations onto genuine background threads using **Web Workers**.

---

## How Web Workers Work

A Web Worker is an isolated script that executes in a background thread completely separate from the main user interface. 

The main UI thread stays 100% responsive and smooth at 60fps, while the worker crunches numbers on a separate CPU core in the background!

**Important rule**: Web Workers do **not** have access to the DOM or the `window` object. They communicate with the main thread strictly through message passing (`postMessage`).

---

## 1. Creating the Worker Script (`worker.js`)

In a dedicated file, listen for messages, do the heavy computation, and post the results back:

```javascript
// worker.js
self.onmessage = function(event) {
    const { number } = event.data;
    console.log("[Worker]: Received task to compute factorial for:", number);

    // Simulate heavy calculation
    let result = 1;
    for (let i = 1; i <= number; i++) {
        result *= i;
    }

    // Send the finished answer back to main thread
    self.postMessage({ result });
};
```

---

## 2. Calling from Your Main Script (`main.js`)

In your frontend application:

```javascript
// 1. Spawn the background worker thread
const myWorker = new Worker("worker.js");

// 2. Send data to the worker
const startBtn = document.querySelector("#calc-btn");
startBtn.addEventListener("click", () => {
    console.log("[Main]: Delegating heavy calculation to background...");
    myWorker.postMessage({ number: 50000 });
});

// 3. Receive the computed result
myWorker.onmessage = function(event) {
    console.log("[Main]: Worker finished! Answer:", event.data.result);
};

// 4. Terminate when no longer needed
// myWorker.terminate();
```

While that massive computation runs, users can still click buttons, scroll smoothly, and interact with the page without experiencing a single dropped frame!

---

## When Should You Use Workers?

- **Image & Audio Processing**: Resizing, filtering, or analyzing audio spectrograms.
- **Data Crunching**: Sorting or parsing massive JSON datasets and spreadsheets.
- **Crypto & Compression**: ZIP file generation or client-side encryption.
- **Canvas Rendering**: You can even transfer canvas rendering to a worker using `OffscreenCanvas`!

---

That brings us all the way up to our latest tech archive! From the simplest DOM concepts to full background multi-threading, modern JavaScript has evolved into a powerhouse ecosystem.

What's your favorite modern JavaScript capability? Drop your thoughts below!

Thanks for reading through these notes with me, and see you on the next journey! :D
