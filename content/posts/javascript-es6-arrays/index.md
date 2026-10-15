---
title: "Essential Modern Array Methods"
author: "Dhymas Julyan Riyanto"
date: 2026-07-03T15:10:00Z
draft: true
tags: ["javascript", "arrays", "es6", "functional"]
categories: ["Javascript"]
---

Back in my early programming days, whenever I needed to filter a list or transform items, I'd immediately write an index loop:

```javascript
for (let i = 0; i < items.length; i++) { ... }
```

It works, sure. But it's verbose, full of mutable state, and easy to introduce accidental off-by-one bugs. :')

Modern JavaScript treats arrays as first-class citizens with built-in functional transformation methods. 

Here are the big four you will use almost every single day.

---

## 1. Transform Every Item: `.map()`

Need to convert an array of objects into an array of names, or calculate tax on prices? Use `.map()`. 

It produces a **brand-new array** with transformed values without mutating the original:

```javascript
const prices = [100, 250, 400];
const pricesWithTax = prices.map(p => p * 1.1);

console.log(pricesWithTax); // [110, 275, 440]
```

---

## 2. Filter Down: `.filter()`

Want to keep only elements that pass a certain test? Pass a predicate function that returns `true` or `false`:

```javascript
const students = [
    { name: "Dhymas", score: 88 },
    { name: "John", score: 55 },
    { name: "Sarah", score: 92 }
];

const passedStudents = students.filter(s => s.score >= 75);
// Result: Only Dhymas and Sarah!
```

---

## 3. Find Just One Item: `.find()`

If you only need the **first** match and don't care about the rest, don't use `.filter()`. Use `.find()`. 

It stops iterating immediately once it finds a match:

```javascript
const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" }
];

const bob = users.find(u => u.id === 2);
console.log(bob.name); // "Bob"
```

If no element matches, it cleanly returns `undefined`.

---

## 4. Boil Down to One Value: `.reduce()`

The Swiss Army knife of arrays. You take a whole array and condense it into a single accumulated value (sum, tally, grouped object):

```javascript
const cartItems = [
    { item: "Coffee", price: 25 },
    { item: "Book", price: 40 },
    { item: "Stickers", price: 5 }
];

const totalBill = cartItems.reduce((acc, curr) => acc + curr.price, 0);
console.log("Total:", totalBill); // 70
```

The second argument (`0` in this case) is the initial value of your accumulator.

---

## Bonus: Method Chaining

Because these methods return new arrays, you can pipeline them together like an assembly line:

```javascript
const activeUserNames = users
    .filter(u => u.isActive)
    .map(u => u.name.toUpperCase());
```

Expressive, declarative, and easy to read aloud in plain English.

---

Which array method do you find yourself writing the most? For me, `.map()` and `.filter()` are practically second nature by now.

Until next time, keep your code clean and happy hacking! :D
