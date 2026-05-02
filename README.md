# Seafood SKU Lookup

A lightweight Node.js API that takes a fish name or alias and returns the correct SKU. Built to integrate with Siri via Apple Shortcuts for quick lookups on the floor.

**Apple Shortcut:** [link coming soon]

> **Note:** This project will eventually be merged into [store-assistant](https://github.com/whitallee/store-assistant).

---

## API

```
GET /api/sku/:fishName
```

Accepts a fish name or any known alias (case-insensitive).

**Example:**
```
GET /api/sku/ahi

{
  "fishName": "ahi",
  "sku": "012345",
  "found": true
}
```

---

## Running Locally

```bash
npm install
node server.js
# → http://localhost:3000
```

---

## Setup

Fish names and aliases are stored in `data.json`. Add new entries there to expand the lookup database.
