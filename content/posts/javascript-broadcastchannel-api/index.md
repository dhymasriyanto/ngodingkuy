---
title: "Syncing Tabs with BroadcastChannel API"
author: "Dhymas Julyan Riyanto"
date: 2026-10-15T10:00:00Z
draft: true
tags: ["javascript", "broadcastchannel", "web-api", "multi-tab", "state-sync"]
categories: ["Javascript"]
---

Ever had five tabs of the same website open at once? 

You log out in one tab, switch over to another tab... and surprise! The user profile is still staring at you until you hit refresh. Or you change to dark mode in tab 1, but tab 2 stays blindingly white. :')

Back in the day, we relied on server polling, complex WebSocket hubs, or clever hacks listening to `window.addEventListener('storage', ...)`. 

Enter the **BroadcastChannel API** — a native, zero-dependency browser API designed specifically for real-time, cross-tab and cross-window communication under the same origin.

---

## What is BroadcastChannel?

Think of a `BroadcastChannel` like a private walkie-talkie channel for your website. 

Any browser context under the exact same origin (same protocol, host, and port) — whether it's another tab, an iframe, a popup window, or even a Web Worker — can tune in to the same channel name. When one tab broadcasts a message, **every other listening tab receives it instantly** through browser memory.

No server roundtrips. No database writes. Just pure, instant in-memory pub/sub.

---

## 1. Creating and Connecting to a Channel

Connecting takes just a single line of JavaScript. Give your channel a unique name:

```javascript
// Open or connect to the "auth_channel"
const authChannel = new BroadcastChannel("auth_channel");
```

If the channel already exists in another tab, this tab joins it. If it doesn't, the browser creates it automatically.

---

## 2. Sending a Message

Broadcasting data is as straightforward as `postMessage()`. You can send strings, numbers, arrays, or deep JavaScript objects:

```javascript
// User clicks "Log Out" in Tab A
document.querySelector("#logout-btn").addEventListener("click", () => {
    // Perform local logout logic...
    sessionStorage.clear();

    // Notify all other open tabs!
    authChannel.postMessage({
        action: "LOGOUT",
        timestamp: Date.now(),
        reason: "User initiated logout"
    });

    window.location.href = "/login";
});
```

*Note: The tab that calls `postMessage()` will **not** receive its own broadcast. Only sibling contexts receive it!*

---

## 3. Listening for Incoming Broadcasts

In every other open tab (Tab B, Tab C, etc.), attach an `onmessage` listener:

```javascript
// Tab B is idling in the background
authChannel.onmessage = (event) => {
    const { action, reason } = event.data;

    if (action === "LOGOUT") {
        console.warn(`[AuthSync]: Received logout broadcast (${reason}). Redirecting...`);
        alert("You have logged out from another tab!");
        window.location.href = "/login";
    }
};
```

The moment Tab A triggers logout, Tab B immediately detects the event and synchronizes its interface without any manual page reload.

---

## Real-World Use Cases

Where does BroadcastChannel shine the most?

1. **Instant Session & Auth Synchronization**: Log out or session expiry in one tab immediately updates all sister tabs.
2. **Global Theme & Preferences**: Toggling dark mode or language switcher propagates seamlessly across all open documents.
3. **Multi-Tab Shopping Carts**: Adding an item to your cart in tab 1 immediately reflects in the header badge of tab 2.
4. **Coordinating Audio / Media Playback**: Automatically pause an active video or music player if the user starts playing media in another tab.

---

## 4. Closing the Channel

When a component unmounts or before a tab unloads, it's good practice to disconnect:

```javascript
// Free up channel resources
authChannel.close();
```

---

## Summary

The BroadcastChannel API is one of those browser gems that solves a very specific, annoying problem with absolute elegance. No third-party state sync libraries, no polling hacks — just clean, native pub/sub between browser contexts.

Next time you build an app where users tend to multitask across several tabs, give `BroadcastChannel` a spin!

What kind of multi-tab features have you wanted to build? Let me know in the comments below! :)
