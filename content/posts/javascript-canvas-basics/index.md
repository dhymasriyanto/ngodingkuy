---
title: "Drawing in the Browser with HTML5 Canvas"
author: "Dhymas Julyan Riyanto"
date: 2026-10-02T16:00:00Z
draft: true
tags: ["javascript", "canvas", "graphics", "creative"]
categories: ["Javascript"]
---

Most of our web development work revolves around HTML tags: boxes, lists, buttons, and paragraphs. 

Every now and then, though, you want to build something purely visual: a chart generator, an interactive particle background, or even a mini 2D browser game. :D

That's where the **HTML5 `<canvas>` API** comes alive. 

Instead of manipulating DOM tree elements, canvas gives you an immediate-mode pixel sandbox where you paint shapes and colors using pure JavaScript code.

---

## The Setup: Getting the 2D Context

First, define your canvas in HTML:
```html
<canvas id="stage" width="600" height="400" style="border: 1px solid #333;"></canvas>
```

In JavaScript, grab the canvas and request its 2D rendering context:

```javascript
const canvas = document.querySelector("#stage");
const ctx = canvas.getContext("2d");
```

Think of `canvas` as the physical sheet of paper, and `ctx` (context) as the paintbrush in your hand.

---

## 1. Drawing Rectangles and Colors

Canvas provides direct methods for filled and outlined rectangles:

```javascript
// Set fill color
ctx.fillStyle = "#2d5016"; // ngodingkuy green
// fillRect(x, y, width, height)
ctx.fillRect(20, 20, 150, 100);

// Set outline color and width
ctx.strokeStyle = "#f7df1e"; // JS yellow
ctx.lineWidth = 4;
ctx.strokeRect(200, 20, 150, 100);
```

---

## 2. Drawing Custom Shapes with Paths

For circles, triangles, or freehand lines, we draw with **paths**:

```javascript
// Start a new shape path
ctx.beginPath();
// arc(centerX, centerY, radius, startAngle, endAngle)
ctx.arc(100, 250, 50, 0, Math.PI * 2); // Full circle
ctx.fillStyle = "#f7df1e";
ctx.fill();
ctx.stroke();
```

---

## 3. The Animation Loop: `requestAnimationFrame`

To bring your canvas to life with movement, you run a loop that clears the screen and redraws shapes at different coordinates on every frame:

```javascript
let posX = 0;

function animate() {
    // 1. Wipe previous frame clean
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2. Draw our moving particle
    ctx.fillStyle = "seagreen";
    ctx.beginPath();
    ctx.arc(posX, 200, 20, 0, Math.PI * 2);
    ctx.fill();

    // 3. Update coordinates
    posX = (posX + 3) % canvas.width;

    // 4. Request the browser to render the next frame smoothly!
    requestAnimationFrame(animate);
}

// Kick off animation
animate();
```

`requestAnimationFrame` syncs directly with the user's monitor refresh rate (typically 60Hz or 120Hz), pausing automatically when the user switches tabs to save CPU and battery.

---

Writing raw canvas code teaches you so much about coordinates, rendering pipelines, and frame timing.

Have you ever tried making a 2D game or custom chart with canvas? Tell me what you built in the comments!

Until next time, keep creating! :)
