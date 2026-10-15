---
title: "Beyond LocalStorage: Storing Data with IndexedDB"
author: "Dhymas Julyan Riyanto"
date: 2026-09-23T13:40:00Z
draft: true
tags: ["javascript", "indexeddb", "database", "offline"]
categories: ["Javascript"]
---

In a previous note, we covered `localStorage`. It's great for saving a theme preference or a tiny auth token.

But what happens when you're building an offline-first app, a music player caching audio blobs, or a markdown editor storing thousands of full documents? 

`localStorage` caps out at ~5MB, only supports plain strings, and blocks the main UI thread during reads. :v

When you need serious, structured client-side storage, you step up to **IndexedDB**.

---

## What is IndexedDB?

IndexedDB is a full-fledged, asynchronous, NoSQL transactional database living right inside your browser.

Key superpowers:
- **Massive Storage Quotas**: Can easily store hundreds of megabytes or even gigabytes (dependent on user disk space).
- **Stores Any Object**: Native support for JS Objects, Arrays, Blobs, Files, and Dates. No `JSON.stringify()` required!
- **Non-blocking**: All read and write operations run asynchronously via transactions.
- **Indexed Search**: You can index fields (like author, date, category) to query millions of records in milliseconds.

---

## Opening a Database

IndexedDB uses an event-driven transaction model:

```javascript
// Open database 'NotesApp' with version 1
const request = indexedDB.open("NotesApp", 1);

// Fires when creating or upgrading the schema
request.onupgradeneeded = (event) => {
    const db = event.target.result;
    
    // Create an object store (like a MongoDB collection / SQL table)
    if (!db.objectStoreNames.contains("notes")) {
        const store = db.createObjectStore("notes", { keyPath: "id", autoIncrement: true });
        // Create an index for searching by tag
        store.createIndex("by_tag", "tag", { unique: false });
    }
};

request.onsuccess = (event) => {
    const db = event.target.result;
    console.log("Database initialized successfully!");
    // Ready to transact!
};

request.onerror = (event) => {
    console.error("Database error:", event.target.error);
};
```

---

## Adding and Reading Data via Transactions

Every single read or write in IndexedDB must happen inside a **transaction**. If an operation fails, the transaction rolls back safely.

```javascript
function addNote(db, noteData) {
    const transaction = db.transaction(["notes"], "readwrite");
    const store = transaction.objectStore("notes");

    const request = store.add(noteData);

    request.onsuccess = () => {
        console.log("Note saved! Generated ID:", request.result);
    };

    transaction.onerror = (e) => {
        console.error("Transaction failed:", e.target.error);
    };
}

// Example payload: raw object stored directly!
// addNote(db, { title: "Draft Post", content: "Hello world!", tag: "dev" });
```

---

## Quick Tip for Daily Work

The raw IndexedDB API is event-callback heavy from the 2011 era. 

In production projects, almost everyone uses lightweight Promise wrappers like [idb](https://github.com/jakearchibald/idb) by Jake Archibald. It gives you the exact same IndexedDB power, but with modern `await db.get('notes', id)` syntax!

---

If you're building Progressive Web Apps (PWAs) or rich local tools, IndexedDB is your best friend.

Have you ever tried building an offline-first app in the browser? Share your experience in the comments!

Until the next log... stay persistent! :)
