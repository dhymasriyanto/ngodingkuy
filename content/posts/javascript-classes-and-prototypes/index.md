---
title: "Classes & Prototypes in JavaScript"
author: "Dhymas Julyan Riyanto"
date: 2026-08-18T09:30:00Z
draft: true
tags: ["javascript", "oop", "classes", "prototypes"]
categories: ["Javascript"]
---

Back with another archive note! Today we're digging into Object-Oriented Programming (OOP) in JavaScript. :')

If you come from C++ or Java, JavaScript classes look immediately familiar. But under the hood, JavaScript doesn't have real "traditional" classes at all. 

Everything runs on a chain of prototypes! 

Let's unpack how it works and how the modern `class` syntax makes our lives ten times easier.

---

## The Secret Engine: Prototype Chain

In JavaScript, objects have a hidden link to another object called their **prototype**.

When you ask an object for a property:
1. Does the object have it directly? If yes, return it.
2. If not, look up into its prototype.
3. Still not found? Look into *that* prototype's prototype!
4. It keeps climbing until it hits `null`.

```javascript
const animal = {
    eat() {
        console.log("Nom nom...");
    }
};

const rabbit = Object.create(animal);
rabbit.jump = function() {
    console.log("Hop!");
};

rabbit.jump(); // Own method -> "Hop!"
rabbit.eat();  // Climbs prototype chain -> "Nom nom..."
```

---

## Modern ES6 Classes: Syntactic Sugar That Actually Helps

Writing raw prototype constructor functions used to look cumbersome and verbose. 

In ES6, JavaScript introduced the `class` keyword. It still uses prototypes under the hood, but the syntax is clean and organized:

```javascript
class Device {
    constructor(brand, model) {
        this.brand = brand;
        this.model = model;
    }

    turnOn() {
        console.log(`${this.brand} ${this.model} is now running.`);
    }
}

// Inheritance with extends & super
class Laptop extends Device {
    constructor(brand, model, ram) {
        super(brand, model); // Call parent constructor!
        this.ram = ram;
    }

    runCode() {
        console.log(`Compiling project on ${this.ram}GB RAM...`);
    }
}

const mac = new Laptop("Apple", "MacBook Air", 16);
mac.turnOn();  // Inherited from Device
mac.runCode(); // Defined on Laptop
```

---

## Private Fields: Truly Encapsulated Data

For years, developers prefixed private variables with an underscore `_privateVar` as a gentleman's agreement not to touch it. 

Modern JavaScript finally has official private fields using the `#` symbol:

```javascript
class BankVault {
    #securityCode = 9921; // Truly private!

    unlock(code) {
        if (code === this.#securityCode) {
            console.log("Access granted!");
        } else {
            console.log("Access denied! :v");
        }
    }
}

const vault = new BankVault();
vault.unlock(9921); // Works!
// console.log(vault.#securityCode); -> SyntaxError! Cannot read outside!
```

---

Whether you prefer pure functional programming or structured OOP, knowing how classes and prototypes operate under the surface is essential when inspecting third-party libraries.

Do you use classes heavily in your daily JS code or do you lean towards pure functions? Let's discuss in the comments!

See you on the next page! :)
