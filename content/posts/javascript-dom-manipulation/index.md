---
title: "DOM Manipulation & Creating Elements"
author: "Dhymas Julyan Riyanto"
date: 2026-04-29T10:15:00Z
draft: true
tags: ["javascript", "dom", "frontend", "learn"]
categories: ["Javascript"]
---

Back with another late-night desk note from _Author_... :')

So far, we've grabbed existing HTML elements and attached event listeners to them. But what happens when you need to create brand-new items on the fly? Like appending a new task to a todo list or rendering cards from a database?

That's where dynamic DOM manipulation comes in.

---

## 1. Creating Elements Out of Nowhere: `createElement`

The browser gives us `document.createElement()`. You pass the tag name as a string, and JavaScript conjures a fresh node into memory:

```javascript
// Creates a <div> node in browser memory (not attached to page yet!)
const newCard = document.createElement("div");
newCard.innerText = "Brand new card content!";
```

Think of this like building a Lego piece on your desk. It exists, but it isn't part of the Lego castle on your floor until you actually stick it on.

---

## 2. Attaching to the Page: `append()` and `appendChild()`

To make our newly crafted element visible to users, we must plug it into an existing parent element:

```javascript
const container = document.querySelector("#cards-container");

// Stick it at the end of the container
container.appendChild(newCard);
```

Modern JavaScript also offers `.append()`, which is super forgiving because you can pass multiple elements or even raw text strings in one call:

```javascript
container.append(newCard, "Just a trailing note!");
```

---

## 3. Styling Dynamically: `classList`

Please, avoid manually concatenating raw strings with `element.className = ...`. It gets messy really fast. 

Instead, reach for `classList`:

```javascript
newCard.classList.add("card-item", "active");
newCard.classList.remove("hidden");

// Toggle on click: adds if missing, removes if present
newCard.classList.toggle("selected");
```

Clean, readable, and leaves zero syntax headaches behind.

---

## 4. Throwing Elements in the Trash: `remove()`

Need to delete an element? In older tutorials, you might see awkward parent-child dances like `node.parentNode.removeChild(node)`. 

Forget that boilerplate. Modern browsers support the direct `.remove()` method:

```javascript
// Select and vanish!
const staleAlert = document.querySelector(".temp-alert");
if (staleAlert) {
    staleAlert.remove();
}
```

---

## Putting It Together: A Quick Dynamic List

Here's how these pieces connect in real life:

```javascript
function addNewItem(taskText) {
    const list = document.querySelector("#todo-list");

    const li = document.createElement("li");
    li.classList.add("todo-item");
    li.innerText = taskText;

    const delBtn = document.createElement("button");
    delBtn.innerText = "Delete";
    delBtn.addEventListener("click", () => li.remove());

    li.appendChild(delBtn);
    list.appendChild(li);
}
```

Run that function whenever a user hits enter, and boom — dynamic UI without touching a framework. Hehe...

---

That's the gist of creating and tossing DOM nodes. Once you get comfortable with this flow, building interactive dashboards feels pretty natural.

Drop your thoughts or favorite DOM tricks in the comments below!

Until the next log... stay curious! :)
