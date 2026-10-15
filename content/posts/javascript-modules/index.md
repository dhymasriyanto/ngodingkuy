---
title: "Modular JavaScript with ES Modules"
author: "Dhymas Julyan Riyanto"
date: 2026-07-22T16:20:00Z
draft: true
tags: ["javascript", "modules", "architecture", "es6"]
categories: ["Javascript"]
---

Remember when a complex JavaScript project was just one massive 4,000-line `script.js` file, or ten `<script>` tags dumped in your HTML hoping the global variables wouldn't clash? :')

Those days are thankfully behind us. 

With **ES Modules (ESM)**, native modularity is supported directly by both modern browsers and runtime engines. You can split your logic into dedicated files, export only what's necessary, and keep global scope spotless.

---

## 1. Exporting Code: Named vs Default

There are two primary ways to share code from a file:

### Named Exports (Multiple per file)
Best for utility libraries where you export specific helper functions:

```javascript
// mathUtils.js
export function add(a, b) {
    return a + b;
}

export const PI = 3.14159;
```

### Default Export (One per file)
Best for a file whose main purpose is providing a single class, component, or config:

```javascript
// Logger.js
export default class Logger {
    log(msg) {
        console.log(`[APP LOG]: ${msg}`);
    }
}
```

---

## 2. Importing Code

When importing, named exports require curly brackets `{ }` with matching names, while default exports can be imported directly with any name you choose:

```javascript
// main.js
import Logger from "./Logger.js";
import { add, PI } from "./mathUtils.js";

const logger = new Logger();
logger.log(`Result: ${add(10, 5)}`);
logger.log(`PI value: ${PI}`);
```

You can also alias names if you have naming conflicts:

```javascript
import { add as sumNumbers } from "./mathUtils.js";
```

---

## 3. Using Modules in HTML

To use native ES modules in the browser, simply add `type="module"` to your script tag:

```html
<script type="module" src="./main.js"></script>
```

When you add `type="module"`:
- The script automatically executes in **strict mode** (`"use strict"`).
- Top-level variables do **not** leak into global `window` scope.
- Scripts are deferred by default, waiting until the HTML document is parsed.

---

## Why Modular Architecture Matters

1. **Maintainability**: When a bug occurs in authentication, you look inside `auth.js`, not scrolling through a monolith.
2. **Reusability**: Utility modules can be shared across multiple pages or projects without copy-pasting.
3. **Encapsulation**: Internal helper variables stay private inside their module file unless explicitly exported.

---

That wraps up our 10-part dive into practical modern JavaScript! From DOM basics and event listeners all the way to modular architecture and async flows, you now have a solid toolkit to build real-world web apps with confidence.

Which topic was your favorite, or what would you like me to archive next? The comments section is always open!

Thanks for reading along, and see you on the next journey! :')
