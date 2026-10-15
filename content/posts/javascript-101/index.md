---
title: "Javascript in Action"
author: "Dhymas Julyan Riyanto"
date: 2026-04-14T09:11:28Z
draft: false
tags: ["javascript", "learn", "dom", "bom"]
categories: ["Javascript"]
---

Ever wondered what actually happens when JavaScript runs in a browser? 

I used to think JavaScript just magically changed things on the screen, but it turns out... the browser gives us two distinct bridges to control everything: **BOM** and **DOM**.

Just dumping this down as a study archive before I forget how they work. Feel free to follow along if you're exploring the basics too! :)

Let's break them down one by one, nice and simple.

---

## BOM: Controlling the Browser Shell

BOM stands for **Browser Object Model**. 

Basically, this is the tool that lets JavaScript give instructions to the *browser itself* — not the HTML content, but the actual window frame, tabs, screen size, and URL bar.

The king of BOM is the global `window` object. 

For instance, we can pop up a quick alert dialog right in the user's face:

```javascript
// Pop-up dialog box
window.alert("Hello from BOM!");

// Check the user's current screen width
console.log(window.innerWidth);

// Check or grab the current page URL
console.log(window.location.href);
```

And since `window` is the default global object in any browser environment, you don't even have to type `window.` every single time. Calling `alert()` or `location.href` directly works just fine. Handy, right? :v

---

## DOM: Playing with the Actual Webpage

Now, what about the actual page content? That's where **DOM** comes into play.

DOM stands for **Document Object Model**. 

Instead of controlling the browser window, DOM lets us touch and manipulate the actual HTML document rendered inside that window. We access it through `document` (which technically lives inside `window.document`).

When your browser loads an HTML file, it reads every tag and turns it into a tree of objects. Through `document`, JavaScript can find elements, change text, swap styles, or even create brand new elements out of thin air.

Here's a quick taste:

```javascript
// 1. Grab an element by its ID
const heading = document.getElementById("main-title");

// 2. Change the text dynamically on the fly
heading.innerText = "JavaScript is running!";

// 3. Tweak the styles directly
heading.style.color = "seagreen";
```

Pretty neat, right? The page changes instantly without needing a full reload.

---

## So... What's the Real Difference?

To keep it super simple in your head:

- **BOM** (`window`) = The outer frame. The browser window, history, screen dimensions, and location bar.
- **DOM** (`document`) = The painting inside the frame. The HTML tags, text, buttons, images, and styling.

Once you grasp how BOM and DOM split the work, browser scripting starts making a whole lot more sense. 

Next up, we'll probably look into making elements actually react when someone clicks them. 

Until then... happy tinkering! :D
