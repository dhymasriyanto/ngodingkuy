---
title: "Talking to External APIs with Fetch"
author: "Dhymas Julyan Riyanto"
date: 2026-06-24T13:30:00Z
draft: true
tags: ["javascript", "fetch", "api", "http"]
categories: ["Javascript"]
---

Remember the ancient days of `XMLHttpRequest` with its twenty lines of event setup just to load a single JSON file? Yeah... let's never go back there. :v

Modern browsers give us the native **Fetch API**. It's built right into the browser, works natively with Promises, and makes communicating with backend REST endpoints smooth and pleasant.

Here's my quick reference guide on using it effectively.

---

## 1. The Basic GET Request

By default, calling `fetch(url)` sends an HTTP GET request:

```javascript
async function getRandomQuote() {
    try {
        const res = await fetch("https://api.example.com/quotes/random");
        
        // Step 1: Check HTTP status
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        // Step 2: Parse the JSON body stream
        const quote = await res.json();
        console.log(`"${quote.text}" - ${quote.author}`);
    } catch (err) {
        console.error("Could not retrieve quote:", err);
    }
}
```

---

## The Crucial Gotcha: `res.ok`

Notice that `if (!res.ok)` check above? **Never skip it.**

Here's why: `fetch()` will **not** reject its Promise on HTTP error status codes like `404 Not Found` or `500 Internal Server Error`. 

As far as the browser is concerned, if the server replied with any response at all, the network request succeeded! 

A Promise rejection only happens if there's an actual network dropout, DNS failure, or CORS block. 

So always check `res.ok` (which evaluates to true for status codes 200–299).

---

## 2. Sending Data: POST Request

When creating new records, pass a configuration object with method, headers, and body:

```javascript
async function createPost(title, bodyText) {
    const payload = {
        title: title,
        body: bodyText,
        userId: 101
    };

    const res = await fetch("https://api.example.com/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    const createdRecord = await res.json();
    console.log("Post created successfully! New ID:", createdRecord.id);
}
```

Notice we stringified the payload with `JSON.stringify()` and notified the server via `"Content-Type": "application/json"`.

---

## Quick Cheat Sheet

- **GET**: Retrieve data (no body required).
- **POST**: Send new data (`method: "POST"`, body stringified).
- **PUT / PATCH**: Update existing records.
- **DELETE**: Remove records (`method: "DELETE"`).

---

Fetch is completely native, meaning you rarely need heavy third-party libraries like Axios for typical front-end tasks anymore. 

What's your preferred approach for handling API calls in vanilla projects? 

Drop your thoughts below, and I'll catch you in the next one! :)
