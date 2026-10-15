---
title: "Saving Client Data with LocalStorage"
author: "Dhymas Julyan Riyanto"
date: 2026-05-17T09:45:00Z
draft: true
tags: ["javascript", "storage", "web-api", "learn"]
categories: ["Javascript"]
---

Ever refreshed a webpage only to groan because your dark-mode toggle or form inputs completely reset back to default? Yeah, we've all been there. :')

Unless you send data to an external backend database, browser memory wipes clean the moment a user hits refresh or closes the tab. 

Luckily, modern browsers hand us a dead-simple persistent key-value vault: **LocalStorage**.

---

## The Storage Family: Local vs Session

Browsers actually offer two flavors:

1. **`localStorage`**: Data stays forever until the user clears their browser cache or your code wipes it out. Survives browser restarts.
2. **`sessionStorage`**: Data lives only for the current tab session. Close the tab, and poof — it's gone.

For user preferences (like theme, sidebar state, or cached drafts), `localStorage` is our go-to friend.

---

## The 4 Core Methods

The API is refreshingly compact:

```javascript
// 1. Save data
localStorage.setItem("userTheme", "dark");

// 2. Read data
const currentTheme = localStorage.getItem("userTheme");
console.log(currentTheme); // "dark"

// 3. Remove a specific key
localStorage.removeItem("userTheme");

// 4. Wipe everything clean for this domain
localStorage.clear();
```

---

## The Catch: Strings Only!

Here's the trap that bites almost every beginner: `localStorage` **only** stores plain strings. 

If you try saving an object or array directly:

```javascript
const user = { name: "Dhymas", role: "Dev" };
localStorage.setItem("profile", user);

console.log(localStorage.getItem("profile")); 
// Output: "[object Object]" -> completely unusable! :v
```

To store complex structures, always serialize with `JSON.stringify()` on save, and parse back with `JSON.parse()` on load:

```javascript
// Storing properly
const preferences = { darkTheme: true, fontSize: 16 };
localStorage.setItem("user_prefs", JSON.stringify(preferences));

// Reading properly
const savedData = localStorage.getItem("user_prefs");
if (savedData) {
    const parsed = JSON.parse(savedData);
    console.log("Dark theme enabled?", parsed.darkTheme);
}
```

---

## Important Boundaries

- Storage is typically capped at around **5MB to 10MB** per origin.
- It's **synchronous**, so reading or writing huge chunks of data can stutter your UI thread.
- **Never store sensitive secrets**: Don't put JWT tokens with admin privileges, passwords, or credit card info here. Any rogue script (XSS) running on your domain can read `localStorage`.

---

Keep it light, keep it stringified, and it works like a charm.

Do you prefer storing theme toggles in cookies or LocalStorage? Let me know your thoughts down below!

Cheers, see you in the next entry! :)
