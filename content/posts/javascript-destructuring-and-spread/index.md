---
title: "Destructuring & the Spread Operator"
author: "Dhymas Julyan Riyanto"
date: 2026-07-13T10:00:00Z
draft: true
tags: ["javascript", "es6", "clean-code", "syntax"]
categories: ["Javascript"]
---

Let's talk about syntactic sugar that genuinely makes your day better.

Before ES6, extracting properties from objects felt like typing the same word over and over again until your fingers hurt:

```javascript
const title = article.title;
const author = article.author;
const date = article.date;
```

Today, we have **Destructuring** and the **Spread operator (`...`)**. Once you start using them, going back feels almost impossible. :v

---

## 1. Object Destructuring

Instead of manually pulling keys one by one, unpack them directly:

```javascript
const book = {
    title: "Clean Code",
    pages: 464,
    rating: 4.8
};

// Extract title and rating in one clean sweep
const { title, rating } = book;

console.log(title);  // "Clean Code"
console.log(rating); // 4.8
```

You can even assign default values or rename variables on the fly:

```javascript
// Renaming 'pages' to 'totalPages' and setting a default fallback for 'isAvailable'
const { pages: totalPages, isAvailable = true } = book;
console.log(totalPages);  // 464
console.log(isAvailable); // true
```

---

## 2. Array Destructuring

Arrays work similarly, but they match by **order** rather than key names:

```javascript
const coordinates = [102.5, 4.3];

// Unpack X and Y directly
const [lng, lat] = coordinates;
console.log(`Longitude: ${lng}, Latitude: ${lat}`);
```

---

## 3. The Spread Operator (`...`)

Those three little dots are magical. They unpack the contents of an iterable into another container.

### Cloning and Merging Arrays
```javascript
const frontend = ["HTML", "CSS", "JS"];
const backend = ["NodeJS", "PostgreSQL"];

// Combine without mutating original arrays
const fullStack = [...frontend, ...backend, "Docker"];
console.log(fullStack);
```

### Merging & Overriding Objects
```javascript
const defaultSettings = { theme: "light", notifications: true, volume: 80 };
const userCustom = { theme: "dark" };

// Merges together; conflicting keys get overridden by the later object!
const finalConfig = { ...defaultSettings, ...userCustom };
console.log(finalConfig.theme); // "dark"
```

---

## 4. Rest Parameters: Gathering Arguments

When used inside function parameter lists, `...` acts as a "rest" operator, gathering leftover arguments into a clean array:

```javascript
function logTeam(lead, ...members) {
    console.log("Team Lead:", lead);
    console.log("Team Members:", members); // Real array!
}

logTeam("Dhymas", "Alex", "Budi", "Sarah");
```

---

These patterns reduce boilerplate dramatically and make function signatures infinitely more expressive.

Do you use spread operators for shallow cloning, or do you prefer `structuredClone` for deep copies? Let's chat in the comments!

Catch you in the next note! :)
